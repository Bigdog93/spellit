package com.urs.spellit.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class MemberRecordRequestDto {
    private int plusExp;
    private boolean isWon;
}
