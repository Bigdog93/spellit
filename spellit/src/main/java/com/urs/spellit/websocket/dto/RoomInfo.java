package com.urs.spellit.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfo {
	private long roomId;
	/**/
	private int turn;
	private List<PlayerDto> playerList;

	public void sendMessage(TextMessage msg) throws IOException {
		for (PlayerDto p : playerList) {
			p.getSession().sendMessage(msg);
		}
	}
	public void setPlayersPriority() {
		int firstPlayer = (int) (Math.random() * 2);
		if(firstPlayer == 0) {
			playerList.get(0).setIsFirst(1);
		}else {
			playerList.get(1).setIsFirst(1);
		}
	}
}
