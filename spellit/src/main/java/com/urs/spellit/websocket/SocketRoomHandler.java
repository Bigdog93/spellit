package com.urs.spellit.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.urs.spellit.websocket.dto.*;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.HashMap;

@Component
public class SocketRoomHandler extends TextWebSocketHandler {

	ArrayList<WebSocketSession> allSession = new ArrayList<>();
	HashMap<Integer, String> room_host = new HashMap<>();
	HashMap<Integer, ArrayList<PlayerDto>> room_map = new HashMap<>();
	ObjectMapper mapper = new ObjectMapper();
	
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
		String nickname = inputDto.getNickname();
		int level = inputDto.getLevel();
		String chatMsg = inputDto.getMsg();
		int room = inputDto.getRoom();
//		 각 이벤트에 따라 if문을 실행해 줘요
		if (event.equals("make")) {
			System.out.println("방을 만들어요");
			// 있는방인지 확인해요
			if (room_map.get(room) != null) {
				ErrorMsgDto emd = new ErrorMsgDto("error", "이미 있는 방이에요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
				return;//
			}
			// 룸 호스트를 설정해요//
			room_host.put(room, nickname);
			room_map.put(room, new ArrayList<PlayerDto>());
			// 룸에 플레이어를 넣어요
			PlayerDto playerDto = new PlayerDto(session, level, nickname, false, true);
			room_map.get(room).add(playerDto);

			// 전체 사람들에게 방 목록을 전송할게요
			AllRoomMsgDto dto = new AllRoomMsgDto("all_room", new ArrayList<RoomInfo>());
			for (Integer j : room_map.keySet()) {
				dto.getRoomInfo().add(new RoomInfo(j, room_map.get(j).size()));
			}
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			for (WebSocketSession w : allSession) {
				w.sendMessage(msg);
			}

			// 나에게 내정보(내가 현재있는 방번호와, 그방의 사람들)을 보여줘요
			MsgDto dto2 = new MsgDto("me", room, new ArrayList<isHostDto>());
			for (PlayerDto p : room_map.get(room)) {
				dto2.getPlayers().add(new isHostDto(p.getLevel(), p.getNickname(), p.isReady(), p.isHost()));
			}
			TextMessage msg2 = new TextMessage(mapper.writeValueAsString(dto2));
			session.sendMessage(msg2);

		} else if (event.equals("enter")) {
			System.out.println("방에 들어가요");
			// 방이 있는지 확인부터 해요
			if (room_map.get(room) == null) {
				ErrorMsgDto emd = new ErrorMsgDto("error", "없는 방이에요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
				return;
			}
			// 이번에 들어온 닉네임과 호스트 닉네임과 같은지 확인해
			System.out.println(nickname + " == " + room_host.get(room));
			boolean is_host = nickname.equals(room_host.get(room));
			PlayerDto playerDto = new PlayerDto(session, level, nickname, false, is_host);
			// 룸에 플레이어를 넣어요
			room_map.get(room).add(playerDto);
			// 전체 사람들에게 방 목록을 전송할게요
			AllRoomMsgDto dto = new AllRoomMsgDto("all_room", new ArrayList<RoomInfo>());
			for (Integer j : room_map.keySet()) {
				dto.getRoomInfo().add(new RoomInfo(j, room_map.get(j).size()));
			}
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			for (WebSocketSession w : allSession) {
				w.sendMessage(msg);
			}

			// 방에 있는 사람들에게 내정보(내가 현재있는 방번호와, 그방의 사람들)을 보여줘요
			MsgDto dto2 = new MsgDto("me", room, new ArrayList<isHostDto>());
			for (PlayerDto p : room_map.get(room)) {
				dto2.getPlayers().add(new isHostDto(p.getLevel(), p.getNickname(), p.isReady(), p.isHost()));
			}
			TextMessage msg2 = new TextMessage(mapper.writeValueAsString(dto2));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg2);
			}
		} else if (event.equals("leave")) {
			System.out.println("방을 떠나요");
			// 방이 있는지 확인부터 해요
			if (room_map.get(room) == null) {
				ErrorMsgDto emd = new ErrorMsgDto("error", "없는 방이에요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
				return;//
			}
			for (PlayerDto p : room_map.get(room)) {
				if (!p.getNickname().equals(nickname))
					continue;
				room_map.get(room).remove(p);
				break;
			}
			// 전체 사람들에게 방 목록을 전송할게요
			AllRoomMsgDto dto = new AllRoomMsgDto("all_room", new ArrayList<RoomInfo>());
			for (Integer j : room_map.keySet()) {
				dto.getRoomInfo().add(new RoomInfo(j, room_map.get(j).size()));
			}
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			for (WebSocketSession w : allSession) {
				w.sendMessage(msg);
			}
			// 방에 있는 사람들에게 내정보(내가 현재있는 방번호와, 그방의 사람들)을 보여줘요//
			MsgDto dto2 = new MsgDto("me", room, new ArrayList<isHostDto>());
//			for (PlayerDto p : room_map.get(room)) {
			dto2.getPlayers().add(new isHostDto(1, nickname, false, false));
//			}
			TextMessage msg2 = new TextMessage(mapper.writeValueAsString(dto2));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg2);
			}
			// 나에게 내가 방을 떠났단 정보를 보내요
			HashMap<String, String> dto3 = new HashMap<>();
			dto3.put("type", "leave");
			TextMessage msg3 = new TextMessage(mapper.writeValueAsString(dto3));
			session.sendMessage(msg3);
		} else if (event.equals("clear")) {
			System.out.println("방을 없애요");
			// 방이 있는지 확인부터 해요
			if (room_map.get(room) == null) {
				ErrorMsgDto emd = new ErrorMsgDto("error", "없는 방이에요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
				return;//
			}
			// 방장인지 확인을 해요
			boolean is_host = nickname.equals(room_host.get(room));
			if (is_host) {
				System.out.println("방장이 맞네요. 방을 없앨게요");
				// 우리방 사람들에게 내가 방을 떠났단 정보를 보내요
				HashMap<String, String> dto3 = new HashMap<>();
				dto3.put("type", "leave");
				TextMessage msg3 = new TextMessage(mapper.writeValueAsString(dto3));
				for (PlayerDto p : room_map.get(room)) {
					p.getSession().sendMessage(msg3);
				} //
				room_host.remove(room);
				room_map.remove(room);
				// 전체 사람들에게 방 목록을 전송할게요
				AllRoomMsgDto dto = new AllRoomMsgDto("all_room", new ArrayList<RoomInfo>());
				for (Integer j : room_map.keySet()) {
					dto.getRoomInfo().add(new RoomInfo(j, room_map.get(j).size()));
				}
				TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
				for (WebSocketSession w : allSession) {
					w.sendMessage(msg);
				}
			} else {
//				System.out.println("방장이 아니라서 방을 없앨 수 없어요");
				ErrorMsgDto emd = new ErrorMsgDto("error", "방장이 아니라서 방을 없앨수 없어요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
			}
		} else if (event.equals("ready")) {
			System.out.println("방에서 레디를 해요");
			// 방이 없는경우
			if (room_map.get(room) == null) {
				ErrorMsgDto emd = new ErrorMsgDto("error", "없는 방이에요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
				return;
			}
			boolean flag = false;
			for (PlayerDto p : room_map.get(room)) {
				if (!p.getNickname().equals(nickname))
					continue;
				if (p.isHost() == true) {
					ErrorMsgDto emd = new ErrorMsgDto("error", "방장이라 레디를 할 수 없어요");
					TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
					session.sendMessage(tm);
					return;
				}
				flag = true;
				p.setReady(!p.isReady());
				break;
			}
			// 내가 요청된 방에 없는 경우
			if (flag == false) {
				ErrorMsgDto emd = new ErrorMsgDto("error", "내가 그 방에 없어요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
				return;
			}
			MsgDto dto2 = new MsgDto("me", room, new ArrayList<isHostDto>());
			for (PlayerDto p : room_map.get(room)) {
				dto2.getPlayers().add(new isHostDto(p.getLevel(), p.getNickname(), p.isReady(), p.isHost()));
			}
			TextMessage msg2 = new TextMessage(mapper.writeValueAsString(dto2));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg2);
			}
		} else if (event.equals("chat")) {
			System.out.println("채팅을 보내요");
			HashMap<String, String> chat_data = new HashMap<>();
			chat_data.put("type", "chat");
			chat_data.put("nickname", nickname);
			chat_data.put("message", chatMsg);
			TextMessage msg4 = new TextMessage(mapper.writeValueAsString(chat_data));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg4);
			}
		} else if (event.equals("getAllRoom")) {
			AllRoomMsgDto dto = new AllRoomMsgDto("rooms", new ArrayList<RoomInfo>());
			for (Integer j : room_map.keySet()) {
				dto.getRoomInfo().add(new RoomInfo(j, room_map.get(j).size()));
			}
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			session.sendMessage(msg);
		} else if (event.equals("getAllUserInRoom")) {
			if (room_map.get(room) == null) {
				ErrorMsgDto emd = new ErrorMsgDto("error", "그 방은 서버에 없어요");
				TextMessage tm = new TextMessage(mapper.writeValueAsString(emd));
				session.sendMessage(tm);
				return;
			}
			MsgDto dto2 = new MsgDto("already", room, new ArrayList<isHostDto>());
			for (PlayerDto p : room_map.get(room)) {
				dto2.getPlayers().add(new isHostDto(p.getLevel(), p.getNickname(), p.isReady(), p.isHost()));
			}
			TextMessage msg2 = new TextMessage(mapper.writeValueAsString(dto2));
			session.sendMessage(msg2);
		} else if (event.equals("startGame")) {
			HashMap<String, Object> dto5 = new HashMap<>();
			dto5.put("type", "startGame");
			dto5.put("info", inputDto.getStartData());
			TextMessage msg5 = new TextMessage(mapper.writeValueAsString(dto5));
			System.out.println(inputDto.getStartData());
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg5);
			}
		}else if (event.equals("reset")) {
			room_host = new HashMap<>();
			room_map = new HashMap<>();
		}else if(event.equals("playerLocation")) {
			System.out.println("playerLocation 이벤트 리슨");
			HashMap<String, Object> dto5 = new HashMap<>();
			dto5.put("type", "othersLocation");
			dto5.put("info", inputDto.getStartData());
			TextMessage msg5 = new TextMessage(mapper.writeValueAsString(dto5));
			for(PlayerDto p : room_map.get(room)) {
				System.out.println(p.getNickname());
				p.getSession().sendMessage(msg5);
			}
		}else if (event.equals("sendlocation")) {
			System.out.println("왔어요" + inputDto.getStartData());
			HashMap<String, Object> dto = new HashMap<>();
			dto.put("type", "receivelocation");
			dto.put("info", inputDto.getStartData());
			dto.put("nickname", nickname);
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			System.out.println(room + "   " + room_map.get(room));
			System.out.println(room_map);
			for (PlayerDto p : room_map.get(room)) {
				System.out.println(p.getNickname());
				p.getSession().sendMessage(msg);
			}
		}else if(event.equals("catchRunner")) {
			HashMap<String, Object> dto = new HashMap<>();
			dto.put("type", "caughtRunner");
			dto.put("info", inputDto.getStartData());
			dto.put("nickname", nickname);
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg);
			}
		}else if(event.equals("ripPaper")) {
			HashMap<String, Object> dto = new HashMap<>();
			dto.put("type", "rippedPaper");
			dto.put("info", inputDto.getStartData());
			dto.put("nickname", nickname);
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg);
			}
		}else if(event.equals("useItem")) {
			HashMap<String, Object> dto = new HashMap<>();
			dto.put("type", "item4");
			dto.put("nickname", nickname);
			dto.put("info", inputDto.getStartData());
			switch (level) {
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					break;
				case 5:
					break;
				case 6:
					break;
				case 7:
					break;
				case 8:
					break;
			}
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg);
			}
		} else if (event.equals("keepconnect")) {
			HashMap<String, Object> dto = new HashMap<>();
			dto.put("type", "keepconnect");
			dto.put("info", "keep Connect");
			TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
			session.sendMessage(msg);
		} else if(event.equals("playerOut")) {
			TextMessage msg = makeTextMsg("playerOut", inputDto, nickname);
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg);
			}
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
		System.out.println("누군가 소켓이 끊어짐");
		int room = 0;
		Loop1: for (Integer i : room_map.keySet()) {
			for (PlayerDto p : room_map.get(i)) {
				if (p.getSession().equals(session)) {
					room = i;
					room_map.get(i).remove(p);
					break Loop1;
				}
			}
		}//
		for (WebSocketSession w : allSession) {
			if (w.equals(session)) {
				allSession.remove(w);
				break;
			}
		}
		AllRoomMsgDto dto = new AllRoomMsgDto("all_room", new ArrayList<RoomInfo>());
		for (Integer j : room_map.keySet()) {
			dto.getRoomInfo().add(new RoomInfo(j, room_map.get(j).size()));
		}
		TextMessage msg = new TextMessage(mapper.writeValueAsString(dto));
		for (WebSocketSession w : allSession) {
			w.sendMessage(msg);
		}
		if (room != 0) {
			MsgDto dto2 = new MsgDto("me", room, new ArrayList<isHostDto>());
			for (PlayerDto p : room_map.get(room)) {
				dto2.getPlayers().add(new isHostDto(p.getLevel(), p.getNickname(), p.isReady(), p.isHost()));
			}
			TextMessage msg2 = new TextMessage(mapper.writeValueAsString(dto2));
			for (PlayerDto p : room_map.get(room)) {
				p.getSession().sendMessage(msg2);
			}
		}
	}

	public TextMessage makeTextMsg(String event, InputDto inputDto, String nickname) throws JsonProcessingException {
		HashMap<String, Object> dto = new HashMap<>();
		dto.put("type", event);
		dto.put("info", inputDto.getStartData());
		dto.put("nickname", nickname);
		return new TextMessage(mapper.writeValueAsString(dto));
	}
}
