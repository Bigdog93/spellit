package com.urs.spellit.game;

import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {

    final private GameService service;
    @GetMapping("/card")
    public ResponseEntity<List<CardEntity>> getAllCards() {
        return ResponseEntity.ok(service.getAllCards());
    }
    @GetMapping("/character")
    public ResponseEntity<List<GameCharacterEntity>> getAllCharacter() {
        return ResponseEntity.ok(service.getAllCharacter());
    }
}
