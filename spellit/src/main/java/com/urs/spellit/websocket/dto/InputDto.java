package com.urs.spellit.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InputDto {
	private String event;
	private String nickname;
	private int level;
	private int room;
	private String msg;
	private Object startData;
}
