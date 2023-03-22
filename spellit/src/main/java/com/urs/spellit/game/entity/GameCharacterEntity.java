package com.urs.spellit.game.entity;

import lombok.Data;

import javax.persistence.*;

@Entity(name = "game_character")
@Data
public class GameCharacterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String characterName;
    @Column
    private String englishName;
    @Column
    private String stand;
    @Column
    private String hurt;
    @Column
    private String attack;
    @Column
    private String winner;
    @Column
    private String combo;

}
