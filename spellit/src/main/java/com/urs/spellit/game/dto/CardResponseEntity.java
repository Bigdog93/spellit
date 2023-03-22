package com.urs.spellit.game.dto;

import com.urs.spellit.game.entity.CardEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CardResponseEntity {
    List<CardEntity> cards;
}
