package com.urs.spellit.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {
	private WebSocketSession session;
	private int level;
	private String nickname;
	private boolean isReady;
	private boolean isHost;
}
