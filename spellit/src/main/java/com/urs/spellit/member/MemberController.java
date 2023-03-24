package com.urs.spellit.member;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.MemberResponseDto;
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
    public ResponseEntity<List<DeckEntity>> getUserDeck()
    {
        return ResponseEntity.ok(memberService.getUserDeck(SecurityUtil.getCurrentMemberId()));
    }

    @PutMapping("/character") //캐릭터 선택
    public ResponseEntity<GameCharacterEntity> setMyCharacter(@RequestBody Long characterId)
    {
        return ResponseEntity.ok(memberService.setMyCharacter(SecurityUtil.getCharacterId(characterId)));
    }

}
