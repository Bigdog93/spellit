package com.urs.spellit.game.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity(name = "card")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicInsert
@DynamicUpdate
public class CardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String spell;
    @Column(nullable = false)
    private int cost;
    @Column(nullable = false)
    private int damage;
    @Column(nullable = false)
    private String magicImg;
    @Column(nullable = false)
    private int attribute;

}
