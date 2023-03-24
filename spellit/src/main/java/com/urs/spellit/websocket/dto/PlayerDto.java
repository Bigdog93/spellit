package com.urs.spellit.websocket.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.entity.Member;
import lombok.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PlayerDto {
	@JsonIgnore
	private WebSocketSession session;
	private long memberId;
	private int hp;
	private String nickname;
	private int play_count;
	private int win_count;
	private int cost;
	// 추후 추가 예정
	private GameCharacterEntity gameCharacterEntity;
	private List<CardEntity> deck;
	private List<CardEntity> selectedCards;
	private int isFirst;
	private int idx;
	private boolean defence;
	private Object myObj;

	public static PlayerDto makePlayerDto(WebSocketSession session, Member member) {
		return PlayerDto.builder()
				.session(session)
				.memberId(member.getId())
				.nickname(member.getNickname())
				.play_count(member.getPlayCount())
				.win_count(member.getWinCount())
				.gameCharacterEntity(member.getGameCharacterEntity())
//				.deck(member.getDeck())
				.build();
	}
}
