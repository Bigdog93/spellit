package com.urs.spellit.member.model.dto;

import com.urs.spellit.member.model.entity.Friend;
import lombok.Builder;
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

    public static List<FriendResponseDto> responseRelation(Friend addFriend, Friend addMe)
    {
        List<FriendResponseDto> list=new ArrayList<>();
        list.add(FriendResponseDto.builder()
                .myId(addFriend.getMyId())
                .friendId(addFriend.getFriendId())
                .build());
        list.add(FriendResponseDto.builder()
                .myId(addMe.getMyId())
                .friendId(addMe.getFriendId())
                .build());
        return list;
    }

    public static List<FriendResponseDto> responseList(List<Friend> friends)
    {
        List<FriendResponseDto> list=new ArrayList<>();
        for(Friend friend : friends)
        {
            list.add(FriendResponseDto.builder()
                    .myId(friend.getMyId())
                    .friendId(friend.getFriendId())
                    .build());
        }
        return list;
    }
}
