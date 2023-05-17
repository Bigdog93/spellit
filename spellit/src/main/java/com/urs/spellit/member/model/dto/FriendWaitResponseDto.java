package com.urs.spellit.member.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class FriendWaitResponseDto {
    private Long askMemberId;
    private Long receiveMemberId;

    public static FriendWaitResponseDto toResponse(Long askMemberId,Long receiveMemberId)
    {
        return FriendWaitResponseDto.builder()
                .askMemberId(askMemberId)
                .receiveMemberId(receiveMemberId)
                .build();
    }

}
