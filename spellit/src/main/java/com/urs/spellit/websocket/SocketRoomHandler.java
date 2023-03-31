package com.urs.spellit.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.GameService;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.member.MemberRepository;
import com.urs.spellit.member.MemberService;
import com.urs.spellit.member.model.dto.MemberRequestDto;
import com.urs.spellit.member.model.dto.MemberResponseDto;
import com.urs.spellit.member.model.entity.Member;
import com.urs.spellit.websocket.dto.*;
import com.urs.spellit.websocket.utils.MyParser;
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
	private final GameService gameService;
	ArrayList<WebSocketSession> allSession = new ArrayList<>();
	Queue<PlayerDto> readyQueue = new ArrayDeque<>();
	HashMap<Integer, String> room_host = new HashMap<>();
	HashMap<Long, WebSocketSession> allPlayers = new HashMap<>();
	private final RoomManager roomManager;
	private final ObjectMapper mapper = new ObjectMapper();
	final private MyParser myParser;

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("누군과 소켓과 연결됨");
		allSession.add(session);
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		// 온 메시지를 inputDto로 매핑해줘요
		logger.info("메시지 도착");
		JsonObject input = JsonParser.parseString((String) message.getPayload()).getAsJsonObject();
		String event = myParser.getString("event", input);
		long roomId = myParser.getLong("roomId", input);
		long memberId = myParser.getLong("memberId", input);
		String nickname = myParser.getString("nickname", input);
		JsonElement data = input.get("data");
		Object dataObj = myParser.getBackData(data);
		logger.info("*************************data 값이다!! : " + data);
		Map<String, Object> infoMap = new HashMap<>();
		if(event.equals("test")) {
			List<CardEntity> cardList = new ArrayList<>();
			cardList.add(CardEntity.builder().id(0l).title("영원의 동토").cost(4).spell("이야호").damage(150).build());
			cardList.add(CardEntity.builder().id(1l).title("화염탄").cost(10).spell("후랴빳빠라").damage(95800).build());
			infoMap.put("test는 어떻게 되었나??", cardList);
			infoMap.put("되돌려주마", myParser.getBackData(data));
			session.sendMessage(makeTextMsg("test", infoMap));
			return;
		}
//		 각 이벤트에 따라 if문을 실행해 줘요
		if(event.equals("login")) {
			List<Long> friendsId = memberService.playerOnline(memberId);
			allPlayers.put(memberId, session);
			infoMap.put("friendId", memberId);
			infoMap.put("friendNickname", nickname);
			if(friendsId != null) {
				for(Long id : friendsId) {
					if(allPlayers.get(id) != null) {
						allPlayers.get(id).sendMessage(makeTextMsg("friendLogin", infoMap));
					}
				}
			}
		}else if(event.equals("matchStart")) {
			/* 빠른 매치 눌렀을 때*/
			PlayerDto player = getPlayerByMemberId(session, memberId);
			logger.info("player : " + player.getNickname());
			/*--- 대기열 사람 없으면 대기열 큐에 집어넣음 ---*/
			if (readyQueue.isEmpty()) {
				player.setIdx(0);
				readyQueue.add(player);
				// "entQueue" 문자열을 type 에 담아 재송신
				TextMessage textMessage = makeTextMsg("entQueue", player);
				session.sendMessage(textMessage);
			} else {
				/*--- 대기열에 사람 있으면 뽑아서 매칭 시켜줌 ---*/
				PlayerDto otherPlayer = readyQueue.poll();
				player.setIdx(1);
				RoomInfo room = roomManager.makeRoom(player, otherPlayer); // 방 만들어주기
				room.setPlayersPriority(); // 선공 후공 정해주기, 선공, 후공 순서대로 List 재정렬
				infoMap.put("roomInfo", room); // 방 정보 담아서
				room.sendMessage(makeTextMsg("connected", infoMap)); // 전송
			}
		}else if(event.equals("friendRequest")) {
			long otherId = myParser.getLong("otherId", data);
			System.out.println("otherId 추출 : " + otherId);
			try {
				MemberResponseDto memberRes = memberService.findMemberInfoById((memberId));
				infoMap.put("friend", memberRes);
			}catch (Exception e) {
				System.out.println("memberService 도중 error 발생");
				e.printStackTrace();
			}
			infoMap.put("memberId", memberId);
			allPlayers.get(otherId).sendMessage(makeTextMsg("friendRequest", infoMap));
		}else if(event.equals("friendResponse")) {
			infoMap.put("memberId", memberId);
			infoMap.put("nickname", nickname);
			long otherId = myParser.getLong("otherId", data);
			try {
				MemberResponseDto memberRes = memberService.findMemberInfoById((memberId));
				infoMap.put("friend", memberRes);
			}catch (Exception e) {
				e.printStackTrace();
			}
			allPlayers.get(otherId).sendMessage(makeTextMsg("friendResponse", infoMap));
		}
		else {
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
					List<CardEntity> cardList = myParser.getList("cards", data, CardEntity.class);
					me.setSelectedCards(cardList);
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
					}else {
						other.getSession().sendMessage(makeTextMsg("otherReady", infoMap));
					}
					break;
				case "spell": // 주문 외우면 외운 주문 상대에게
					infoMap.put("damage", myParser.getBackData(data));
					other.getSession().sendMessage(makeTextMsg("otherSpell", infoMap));
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
					me.setMyObj(dataObj);
					if(isReady(isReady, room, 4)) {
						players.get(0).getSession().sendMessage(makeTextMsg("toSettle", players.get(1).getMyObj()));
						players.get(1).getSession().sendMessage(makeTextMsg("toSettle", players.get(0).getMyObj()));
					}
					break;
				case "gameOver": // 게임 끝
					isReady[me.getIdx()] =true;
					me.setHp(data.getAsJsonObject().get("hp").getAsInt());
					if(isReady(isReady, room, 5)) {
						if(players.get(0).getHp() <= 0 && players.get(1).getHp() <= 0) {
							infoMap.put("result", "draw");
							room.sendMessage(makeTextMsg("gameOver", infoMap));
						}else if(players.get(0).getHp() > 0 && players.get(1).getHp() <= 0) {
							infoMap.put("result", "win");
							players.get(0).getSession().sendMessage(makeTextMsg("gameOver", infoMap));
							infoMap.put("result", "loose");
							players.get(1).getSession().sendMessage(makeTextMsg("gameOver", infoMap));
						}else if(players.get(0).getHp() <= 0 && players.get(1).getHp() > 0) {
							infoMap.put("result", "loose");
							players.get(0).getSession().sendMessage(makeTextMsg("gameOver", infoMap));
							infoMap.put("result", "win");
							players.get(1).getSession().sendMessage(makeTextMsg("gameOver", infoMap));
						}else {
							room.setTurn(1);
							infoMap.put("cost", room.getRandomCost());
							room.nextLevel();
							room.sendMessage(makeTextMsg("toReady", infoMap));
						}
					}
					break;
					/* 게임 로직 끝 */
			}
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		System.out.println("누군가 소켓이 끊어짐");
		// 끊어진 세션 쫓아내고 방폭하고 남은 사람 가져오기
		PlayerDto[] players = roomManager.dropSession(session);
		PlayerDto leavePlayer = new PlayerDto();
		PlayerDto remainPlayer = null;
		if(players == null) {
			for(Long key : allPlayers.keySet()) {
				if(allPlayers.get(key) == session) {
					leavePlayer = new PlayerDto();
					leavePlayer.setMemberId(key);
					leavePlayer.setSession(session);
					Optional<Member> member = memberRepository.findById(key);
					leavePlayer.setNickname(member.get().getNickname());
					break;
				}
			}
		}else {
			leavePlayer = players[0];
			remainPlayer = players[1];
		}
		memberService.playerOffline(leavePlayer.getMemberId());
		if(remainPlayer != null) { // 플레이 중인 사람이었다면
			remainPlayer.getSession().sendMessage(makeTextMsg("otherDrop", null)); // 너 상대 나갔다고 알려줘요
		}
		// 연결되어있는 모든 세션 중에서 제거 해요
		for (WebSocketSession w : allSession) {
			if (w.equals(session)) {
				allSession.remove(w);
				break;
			}
		}
		Long memberId = leavePlayer.getMemberId();
		allPlayers.remove(memberId);
		List<Long> friendsId = memberService.playerOffline(memberId);
		allPlayers.put(memberId, session);
		HashMap<String, Object> infoMap = new HashMap<>();
		infoMap.put("friendId", memberId);
		infoMap.put("friendNickname", leavePlayer.getNickname());
		if(friendsId == null) return;
		for(Long id : friendsId) {
			if(allPlayers.get(id) != null) {
				allPlayers.get(id).sendMessage(makeTextMsg("friendLogout", infoMap));
			}
		}


	}

	/* 멤버 id(PK) 값으로 DB 에서 불러와 websocket 이랑 버무려서 PlayerDto 로 만들기*/
	public PlayerDto getPlayerByMemberId(WebSocketSession session, long memberId) {
		logger.info("player.memberId : " + memberId);
		Optional<Member> memberOption = memberRepository.findById(memberId);
		if(memberOption.isEmpty()) {
			return null;
		}
		Member member = memberOption.get();
		PlayerDto player = PlayerDto.makePlayerDto(session, member);
		player.setDeck(memberService.getUserDeck(memberId));
		return player;
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
