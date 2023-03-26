package com.urs.spellit.game;

import com.urs.spellit.game.entity.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<CardEntity, Long> {
    CardEntity findById(long cardId);

}
