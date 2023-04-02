package com.urs.spellit.member.model.dto;

import com.urs.spellit.member.model.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
public class MemberRecordResponseDto {
    private int level;
    private int exp;
    private int playCount;
    private int winCount;
    private int drawCount;
    private int looseCount;

    public static MemberRecordResponseDto of(Member member)
    {
        return MemberRecordResponseDto.builder()
                .level(member.getLevel())
                .exp(member.getExp())
                .playCount(member.getPlayCount())
                .winCount(member.getWinCount())
                .drawCount(member.getDrawCount())
                .looseCount(member.getLooseCount())
                .build();
    }
}
