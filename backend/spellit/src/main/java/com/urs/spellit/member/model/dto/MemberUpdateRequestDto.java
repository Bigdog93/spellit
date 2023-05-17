package com.urs.spellit.member.model.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MemberUpdateRequestDto {
    private String nickname;
    private String profileMsg;
}
