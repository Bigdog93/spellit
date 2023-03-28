package com.urs.spellit.member;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
    private Logger log = LoggerFactory.getLogger(MemberController.class);

    private final MemberService memberService;

    @GetMapping("/info") //내 정보 요청
    public ResponseEntity<MemberResponseDto> findMemberInfoById()
    {
        return ResponseEntity.ok(memberService.findMemberInfoById(SecurityUtil.getCurrentMemberId()));
    }

    @GetMapping("/info/{userid}") //타 사용자 정보 요청
    public ResponseEntity<MemberResponseDto> findAnotherMemberInfoById(@PathVariable("userid") Long userId)
    {
        return ResponseEntity.ok(memberService.findMemberInfoById(SecurityUtil.getAnotherMemberId(userId)));
    }

    @GetMapping("/deck") //사용자 덱 정보 요청
    public ResponseEntity<List<CardEntity>> getUserDeck()
    {
        return ResponseEntity.ok(memberService.getUserDeck(SecurityUtil.getCurrentMemberId()));
    }

    @PostMapping("/deck") //사용자 덱 설정
    public ResponseEntity<List<CardEntity>> setUserDeck(@RequestBody List<CardEntity> cardEntities)
    {
        return ResponseEntity.ok(memberService.setUserDeck(cardEntities));
    }

    @PutMapping("/character") //캐릭터 선택
    public ResponseEntity<GameCharacterEntity> setMyCharacter(@RequestBody GameCharacterEntity gameCharacterEntity)
    {
        return ResponseEntity.ok(memberService.setMyCharacter(gameCharacterEntity));
    }

    @PutMapping("/record") //전적 갱신
    public ResponseEntity<MemberRecordResponseDto> updateRecord(@RequestBody MemberRecordRequestDto memberRecordRequestDto)
    {
        return ResponseEntity.ok(memberService.updateRecord(memberRecordRequestDto));
    }

    @PostMapping("/friend") //친구 추가 요청
    public ResponseEntity<FriendWaitResponseDto> addFriendWait(@RequestBody FriendWaitRequestDto friendWaitRequestDto)
    {
        return ResponseEntity.ok(memberService.addFriendWait(friendWaitRequestDto));
    }

}
