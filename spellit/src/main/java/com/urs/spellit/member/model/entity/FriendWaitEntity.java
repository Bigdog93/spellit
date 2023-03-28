package com.urs.spellit.member.model.entity;

import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.member.FriendWaitRepository;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="friend_wait")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class FriendWaitEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;
    @Column
    private String friendEmail;

    @ManyToOne
    @JoinColumn(name="member_id")
    @NonNull
    private Member member;

}
