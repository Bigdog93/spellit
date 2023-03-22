package com.urs.spellit.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonParser;
import com.urs.spellit.game.CardRepository;
import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.member.MemberRepository;
import com.urs.spellit.member.MemberService;
import com.urs.spellit.member.model.entity.Member;
import com.urs.spellit.websocket.dto.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.*;

@Component
@RequiredArgsConstructor
public class SocketRoomHandler extends TextWebSocketHandler {

	private Logger logger = LoggerFactory.getLogger(SocketRoomHandler.class);
	private final MemberService memberService;
	private final MemberRepository memberRepository;
	private final DeckRepository deckRepository;
	ArrayList<WebSocketSession> allSession = new ArrayList<>();
	Queue<PlayerDto> readyQueue = new ArrayDeque<>();
	HashMap<Integer, String> room_host = new HashMap<>();
	private final RoomManager roomManager;
	ObjectMapper mapper = new ObjectMapper();
	JsonParser jsonParser = new JsonParser();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("누군과 소켓과 연결됨");
		allSession.add(session);
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		// 온 메시지를 inputDto로 매핑해줘요
		InputDto inputDto = mapper.readValue((String) message.getPayload(), InputDto.class);
		String event = inputDto.getEvent();
		long roomId = inputDto.getRoomId();
		long memberId = inputDto.getMemberId();
		String data = inputDto.getData();
//		 각 이벤트에 따라 if문을 실행해 줘요
		/* 빠른 매치 눌렀을 때*/
		if(event.equals("matchStart")) {
			PlayerDto player = getPlayerByMemberId(session, memberId);
			List<DeckEntity> deckEntities = deckRepository.findAllByMemberId(memberId);
			List<CardEntity> deck = new ArrayList<>();
			for(DeckEntity d : deckEntities) {
				deck.add(d.getCard());
			}
			player.setDeck(deck);
			/*--- 대기열 사람 없으면 대기열 큐에 집어넣음 ---*/
			if (readyQueue.isEmpty()) {
				player.setIdx(0);
				readyQueue.add(player);
				Map<String, Object> infoMap = new HashMap<>();
				// "entQueue" 문자열을 type 에 담아 재송신
				TextMessage textMessage = makeTextMsg("entQueue", player);
				session.sendMessage(textMessage);
			} else {
				/*--- 대기열에 사람 있으면 뽑아서 매칭 시켜줌 ---*/
				PlayerDto otherPlayer = readyQueue.poll();
				player.setIdx(1);
				RoomInfo room = roomManager.makeRoom(player, otherPlayer); // 방 만들어주기
				room.setPlayersPriority(); // 선공 후공 정해주기, 선공, 후공 순서대로 List 재정렬
				Map<String, Object> infoMap = new HashMap<>();
				infoMap.put("roomInfo", room); // 방 정보 담아서
				room.sendMessage(makeTextMsg("connected", infoMap)); // 전송
			}
		}else {
			/*=============== 매칭 된 이후(게임 시작) ================*/
			RoomInfo room = roomManager.getRoomInfo(roomId); // 방정보 가져오기
			List<PlayerDto> players = room.getPlayerList(); // 플레이어 정보 가져오기
			boolean[] isReady = room.getIsReady(); // 준비 여부 가져오기
			// 나랑 상대 구분
			PlayerDto me = null;
			PlayerDto other = null;
			for(int i = 0; i < 2; i++) {
				if(players.get(i).getMemberId() == memberId) {
					me = players.get(i);
				}else {
					other = players.get(i);
				}
			}
			Map<String, Object> infoMap = new HashMap<>();
			if(me == null || other == null) {
				infoMap.put("msg", "플레이어가 없습니다.");
				room.sendMessage(makeTextMsg("error", infoMap));
				return;
			}
			/*===== 게임 시작 후 로직 =====*/
			switch (event) {
				case "loading": // 로딩 중
					isReady[me.getIdx()] = true;
					if(isReady(isReady, room, 0)) {
						room.sendMessage(makeTextMsg("loaded", infoMap));
					}
					break;
				case "readyTurn": // 준비 턴으로
					isReady[me.getIdx()] = true;
					if(isReady(isReady, room, 1)) {
						infoMap.put("cost", room.getRandomCost());
						room.nextLevel();
						room.sendMessage(makeTextMsg("toReady", infoMap));
					}
					break;
				case "attackTurn": // 공격 턴으로(준비 턴에서 세팅한 카드들 넘겨줌)
					isReady[me.getIdx()] = true;
					PlayerDto player = mapper.readValue(data, PlayerDto.class);
					me.setSelectedCards(player.getSelectedCards());
					if(isReady(isReady, room, 2)) {
						List<SelectedCardsDto> response = new ArrayList<>();
						List<CardEntity> firstCards = players.get(0).getSelectedCards();
						List<CardEntity> secondCards = players.get(1).getSelectedCards();
						for(CardEntity c : firstCards) {
							response.add(new SelectedCardsDto(c, true));
						}
						for(CardEntity c : secondCards) {
							response.add(new SelectedCardsDto(c, false));
						}
						infoMap.put("attackCards", response);
						players.get(0).getSession().sendMessage(makeTextMsg("toAttack", infoMap));
						for(int i = 0; i < response.size(); i++) {
							if(i < firstCards.size()) {
								response.get(i).setIsMine(false);
							}else {
								response.get(i).setIsMine(true);
							}
						}
						players.get(1).getSession().sendMessage(makeTextMsg("toAttack", infoMap));
					}
					break;
				case "spell": // 주문 외우면 외운 주문 상대에게
					other.getSession().sendMessage(makeTextMsg("otherSpell", data));
					break;
				case "combo": // 100% 달성 시 상대에게 콤보 발동을 알림
					other.getSession().sendMessage(makeTextMsg("combo", infoMap));
					break;
				case "defenseTurn": // 디스펠 차례
					isReady[me.getIdx()] = true;
					if(isReady(isReady, room, 3)) {

						room.sendMessage(makeTextMsg("toDefense", infoMap));
					}
					break;
				case "settleTurn": // 정산 차례
					isReady[me.getIdx()] = true;
					me.setDefence(mapper.readValue(data, Boolean.class));
					if(isReady(isReady, room, 4)) {
						room.sendMessage(makeTextMsg("toSettle", data));
					}
					break;
				case "gameOver": // 게임 끝
					isReady[me.getIdx()] =true;
					if(isReady(isReady, room, 5)) {
						room.sendMessage(makeTextMsg("gameOver", infoMap));
					}
					break;
			}
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		System.out.println("누군가 소켓이 끊어짐");
		int room = 0;
//		Loop1: for (Integer i : room_map.keySet()) {
//			for (PlayerDto p : room_map.get(i)) {
//				if (p.getSession().equals(session)) {
//					room = i;
//					room_map.get(i).remove(p);
//					break Loop1;
//				}
//			}
//		}//
		for (WebSocketSession w : allSession) {
			if (w.equals(session)) {
				allSession.remove(w);
				break;
			}
		}
		AllRoomMsgDto dto = new AllRoomMsgDto("all_room", new ArrayList<RoomInfo>());

//		for (Integer j : room_map.keySet()) {
//			dto.getRoomInfo().add(new RoomInfo(j, room_map.get(j).size()));
//		}

		TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
		for (WebSocketSession w : allSession) {
			w.sendMessage(msg);
		}

//		if (room != 0) {
//			MsgDto dto2 = new MsgDto("me", room, new ArrayList<isHostDto>());
//			for (PlayerDto p : room_map.get(room)) {
//				dto2.getPlayers().add(new isHostDto(p.getLevel(), p.getNickname(), p.isReady(), p.isHost()));
//			}
//			TextMessage msg2 = new TextMessage(mapper.writeValueAsString(dto2));
//			for (PlayerDto p : room_map.get(room)) {
//				p.getSession().sendMessage(msg2);
//			}
//		}

	}

	/* 멤버 id(PK) 값으로 DB 에서 불러와 websocket 이랑 버무려서 PlayerDto 로 만들기*/
	public PlayerDto getPlayerByMemberId(WebSocketSession session, long memberId) {
		Optional<Member> memberOption = memberRepository.findById(memberId);
		if(!memberOption.isEmpty()) {
			return null;
		}
		Member member = memberOption.get();
		return PlayerDto.makePlayerDto(session, member);
	}
	public boolean isReady(boolean[] isReady, RoomInfo room, int nextTurn) {
		if(isReady[0] && isReady[1]) {
			room.setTurn(nextTurn);
			Arrays.fill(isReady, false);
			return true;
		}
		return false;
	}
	public TextMessage makeTextMsg(String type, Object obj) throws JsonProcessingException {
		HashMap<String, Object> dto = new HashMap<>();
		dto.put("type", type);
		dto.put("info", obj);
		return new TextMessage(mapper.writeValueAsString(dto));
	}
	public TextMessage makeTextMsg(String type, Map infoMap) throws JsonProcessingException {
		HashMap<String, Object> dto = new HashMap<>();
		dto.put("type", type);
		dto.put("info", infoMap);
		return new TextMessage(mapper.writeValueAsString(dto));
	}
}
