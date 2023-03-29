package com.urs.spellit.member.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
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

}
