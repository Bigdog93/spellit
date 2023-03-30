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

    @ManyToOne
    @JoinColumn(name="member_id")
    @JsonIgnoreProperties({"friends"})
    @NonNull
    private Member member;

    public static Friend toBuild(Long friendId,String friendEmail, Member member)
    {
        return Friend.builder()
                .friendId(friendId)
                .friendEmail(friendEmail)
                .member(member)
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
