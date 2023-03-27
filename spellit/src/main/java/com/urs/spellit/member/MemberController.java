package com.urs.spellit.member;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.MemberRecordRequestDto;
import com.urs.spellit.member.model.dto.MemberRecordResponseDto;
import com.urs.spellit.member.model.dto.MemberResponseDto;
import com.urs.spellit.member.model.entity.FriendWaitEntity;
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
    public ResponseEntity<MemberResponseDto> findMemberInfoByEmail(@PathVariable("userid") String email)
    {
        return ResponseEntity.ok(memberService.findMemberInfoByEmail(SecurityUtil.getAnotherMemberEmail(email)));
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
    public ResponseEntity<List<FriendWaitEntity>> addFriendWait(@RequestBody FriendWaitEntity friendWaitEntity)
    {
        return ResponseEntity.ok(memberService.addFriendWait(friendWaitEntity));
    }

}
