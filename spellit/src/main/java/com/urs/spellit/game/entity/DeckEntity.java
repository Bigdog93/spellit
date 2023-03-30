package com.urs.spellit.game.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.member.model.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="deck")
@Data
@AllArgsConstructor
@NoArgsConstructor
@RequiredArgsConstructor
@Builder
public class DeckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deck_id", nullable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name="member_id")
    @JsonIgnoreProperties({"deck"})
    @NonNull
    private Member member;

    @ManyToOne
    @NonNull
    @JoinColumn(name = "card_id")
    private CardEntity card;

    public static List<DeckEntity> toDeck(DeckRepository deckRepository, Member member, List<CardEntity> cards)
    {
        List<DeckEntity> deckList=new ArrayList<>();
        for(CardEntity card : cards)
        {
            deckList.add(DeckEntity.builder()
                    .member(member)
                    .card(card)
                    .build());
        }
        for(DeckEntity deck : deckList)
        {
            deckRepository.save(deck);
        }
        return deckList;
    }
}
