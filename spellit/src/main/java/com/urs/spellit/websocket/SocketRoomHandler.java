package com.urs.spellit.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.urs.spellit.member.MemberService;
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

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Queue;

@Component
@RequiredArgsConstructor
public class SocketRoomHandler extends TextWebSocketHandler {

	private Logger logger = LoggerFactory.getLogger(SocketRoomHandler.class);
	private final MemberService memberService;
	ArrayList<WebSocketSession> allSession = new ArrayList<>();
	Queue<PlayerDto> readyQueue = new ArrayDeque<>();
	HashMap<Integer, String> room_host = new HashMap<>();
	private final RoomManager roomManager;
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
		int roomId = inputDto.getRoomId();
		int memberId = inputDto.getMemberId();
		Object data = inputDto.getData();
//		 각 이벤트에 따라 if문을 실행해 줘요
		if(event.equals("matchStart")) {

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

	public TextMessage makeTextMsg(String event, InputDto inputDto, String nickname) throws JsonProcessingException {
		HashMap<String, Object> dto = new HashMap<>();
		dto.put("type", event);
		dto.put("info", inputDto.getData());
		dto.put("nickname", nickname);
		return new TextMessage(mapper.writeValueAsString(dto));
	}
}
