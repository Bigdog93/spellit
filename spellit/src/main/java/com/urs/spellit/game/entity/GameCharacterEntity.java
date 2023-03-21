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

    @Column(nullable = false)
    private String characterImg;

}
