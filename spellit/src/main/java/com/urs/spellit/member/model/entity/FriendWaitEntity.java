package com.urs.spellit.member.model.entity;

import lombok.*;

import javax.persistence.*;

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

    public static FriendWaitEntity toBuild(Long friendId, String friendEmail, Member member)
    {
        return FriendWaitEntity.builder()
                .friendId(friendId)
                .friendEmail(friendEmail)
                .member(member)
                .build();

    }
}
