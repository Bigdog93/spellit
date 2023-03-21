package com.urs.spellit.game;

import com.urs.spellit.game.entity.GameCharacterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameCharacterRepository extends JpaRepository<GameCharacterEntity, Long> {
}
