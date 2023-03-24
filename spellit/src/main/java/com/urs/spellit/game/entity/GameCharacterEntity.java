package com.urs.spellit.game.entity;

import lombok.*;

import javax.persistence.*;

@Entity(name = "game_character")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Getter
@Setter
public class GameCharacterEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id", nullable = false)
    @NonNull
    private Long id;

    @Column(nullable = false)
    @NonNull
    private String characterName;
    @Column
    @NonNull
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

    public Long getId() {
        return id;
    }
}
