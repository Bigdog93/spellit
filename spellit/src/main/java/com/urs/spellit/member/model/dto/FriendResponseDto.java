package com.urs.spellit.member.model.dto;

import com.urs.spellit.member.model.entity.Friend;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
public class FriendResponseDto {
    private Long myId;
    private Long friendId;

    public static List<FriendResponseDto> toResponse(Friend addFriend, Friend addMe)
    {
        List<FriendResponseDto> list=new ArrayList<>();
        list.add(FriendResponseDto.builder()
                .myId(addFriend.getMember().getId())
                .friendId(addFriend.getFriendId())
                .build());
        list.add(FriendResponseDto.builder()
                .myId(addMe.getMember().getId())
                .friendId(addMe.getFriendId())
                .build());
        return list;
    }

}
