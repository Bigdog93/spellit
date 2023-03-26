package com.urs.spellit.game.entity;

import com.urs.spellit.member.model.entity.Member;
import lombok.*;

import javax.persistence.*;

@Entity(name="deck")
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
public class DeckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deck_id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name="member_id")
    @NonNull
    private Member member;

    @ManyToOne
    @NonNull
    @JoinColumn(name = "card_id")
    private CardEntity card;

}
