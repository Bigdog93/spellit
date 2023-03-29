package com.urs.spellit.member.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberVoiceLoginCheckDto {
    private String startSpell;


    public static MemberVoiceLoginCheckDto of(){

    }

}
