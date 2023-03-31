package com.urs.spellit.member.model.dto;

import com.urs.spellit.member.model.entity.FriendWaitEntity;
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

    public static FriendWaitResponseDto toResponse(FriendWaitEntity friendWaitEntity)
    {
        return FriendWaitResponseDto.builder()
                .askMemberId(friendWaitEntity.getMember().getId())
                .receiveMemberId(friendWaitEntity.getFriendId())
                .build();
    }

}
