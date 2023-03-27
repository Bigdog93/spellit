package com.urs.spellit.member.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name="friend_wait")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendWaitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column
    private String friendEmail;
//    @Column
//    private Long memberId;

    @ManyToOne
    @JoinColumn(name="member_id")
    @NonNull
    private Member member;


}
