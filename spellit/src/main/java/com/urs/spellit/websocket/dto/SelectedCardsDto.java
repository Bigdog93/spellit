package com.urs.spellit.websocket.dto;

import com.urs.spellit.game.entity.CardEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelectedCardsDto {
    private CardEntity card;
    private Boolean isMine;
}
