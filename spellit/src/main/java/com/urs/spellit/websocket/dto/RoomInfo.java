package com.urs.spellit.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomInfo {
	private long roomId;
	private int totalTurn;
	private int cost;
	/*
	0: 로딩, 1: 준비, 2: 공격, 3: 방어, 4: 정산, 5: 게임 끝
	*/
	private int turn;
	private boolean[] isReady = new boolean[2];
	private List<PlayerDto> playerList;
	private boolean gameOver;

	public void sendMessage(TextMessage msg) throws IOException {
		for (PlayerDto p : playerList) {
			if(p.getSession().isOpen())
			p.getSession().sendMessage(msg);
		}
	}
	public void sendEachMessage(TextMessage msg) throws IOException {

	}
	public void setPlayersPriority() {
		int firstPlayer = (int) (Math.random() * 2);
		if(firstPlayer == 0) {
			playerList.get(0).setIsFirst(1);
		}else {
			playerList.get(1).setIsFirst(1);
		}
		playerList.sort((o1, o2) ->  o2.getIsFirst() - o1.getIsFirst());
	}
	public int getRandomCost() {
		int rand = (int) (Math.random() * 4 + cost);
		return rand;
	}
	public void nextLevel() {
		totalTurn++;
		cost += 2;
		for(PlayerDto p : playerList) {
			p.getSelectedCards().clear();
			p.setDefence(false);
		}
	}

}
