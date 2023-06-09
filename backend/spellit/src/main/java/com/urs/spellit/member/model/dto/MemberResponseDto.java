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
    private int loseCount;
    private int drawCount;
    private String profileMsg;
    private GameCharacterEntity gameCharacter;
    private List<CardEntity> deck;
    private Boolean isOnline;
    private Boolean isPlaying;


    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder().id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .level(member.getLevel())
                .exp(member.getExp())
                .playCount(member.getPlayCount())
                .winCount(member.getWinCount())
                .loseCount(member.getLoseCount())
                .drawCount(member.getDrawCount())
                .profileMsg(member.getProfileMsg())
                .gameCharacter(member.getGameCharacterEntity())
                .isOnline(member.getIsOnline())
                .isPlaying(member.getIsPlaying())
                .build();
    }


}
