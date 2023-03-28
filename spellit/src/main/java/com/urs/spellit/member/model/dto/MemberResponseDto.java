package com.urs.spellit.member.model.dto;

import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.entity.Member;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private Long id;
    private String email;
    private String nickname;
    private int level;
    private int exp;
    private int playCount;
    private int winCount;
    private int looseCount;
    private int drawCount;
    private GameCharacterEntity gameCharacter;
    private List<CardEntity> deck;
    private Boolean isOnline;


    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder().id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .level(member.getLevel())
                .exp(member.getExp())
                .playCount(member.getPlayCount())
                .winCount(member.getWinCount())
                .looseCount(member.getLooseCount())
                .drawCount(member.getDrawCount())
                .gameCharacter(member.getGameCharacterEntity())
                .isOnline(member.getIsOnline())
                .build();
    }


}
