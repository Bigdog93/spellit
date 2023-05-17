package com.urs.spellit.member.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column
    private Long friendId;
    @Column
    private String friendEmail;
    @Column
    private Long myId;

    @ManyToOne
    @JoinColumn(name="member_id")
    @JsonIgnoreProperties({"friends", "friendWaitEntities"})
    @NonNull
    private Member member;

    public static Friend toBuild(Long myId,Member friend)
    {
        return Friend.builder()
                .myId(myId)
                .friendId(friend.getId())
                .member(friend)
                .build();
    }

    public static Friend checkExistsInFriends(List<Friend> friendList, Long memberId)
    {
        for(Friend friend : friendList)
        {
            if(friend.getFriendId()==memberId)
            {
                return friend;
            }
        }
        return null;
    }
}
