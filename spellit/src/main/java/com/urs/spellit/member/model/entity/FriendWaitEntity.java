package com.urs.spellit.member.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity(name="friend_wait")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@ToString
public class FriendWaitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column
    private Long friendId;
    @Column
    private String friendEmail;

    @ManyToOne
    @JoinColumn(name="member_id")
    @NonNull
    private Member member;

    public static FriendWaitEntity toBuild(Long myId, String myEmail, Member friend)
    {
        return FriendWaitEntity.builder()
                .friendId(myId)
                .friendEmail(myEmail)
                .member(friend)
                .build();

    }
    public static FriendWaitEntity checkExistsInWaitList(List<FriendWaitEntity> friendWaitList, Long memberId)
    {
        for(FriendWaitEntity WaitFriend : friendWaitList)
        {
            if(WaitFriend.getFriendId()==memberId)
            {
                return WaitFriend;
            }
        }
        return null;
    }
}
