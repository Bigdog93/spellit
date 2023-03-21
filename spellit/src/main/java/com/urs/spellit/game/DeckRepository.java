package com.urs.spellit.game;

import com.urs.spellit.game.entity.DeckEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeckRepository extends JpaRepository<DeckEntity, Long> {
    List<DeckEntity> findAllByMemberId(long memberId);
}
