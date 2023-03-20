package com.urs.spellit.websocket.dto;

import lombok.*;
import org.springframework.web.socket.WebSocketSession;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayerDto {
	private WebSocketSession session;
	private String nickname;
	private int play_count;
	private int win_count;

	// 추후 추가 예정
//	private GameCharacter gameCharacter;
//	private List<Card> deck;
}
