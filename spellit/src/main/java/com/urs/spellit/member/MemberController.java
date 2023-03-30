package com.urs.spellit.member;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.*;
import com.urs.spellit.member.model.entity.Friend;
import com.urs.spellit.member.model.entity.FriendWaitEntity;
import com.urs.spellit.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
    private Logger log = LoggerFactory.getLogger(MemberController.class);

    private final MemberService memberService;
    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;
    private final FriendWaitRepository friendWaitRepository;

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

    @PutMapping("/info")
    public ResponseEntity<Object> updateMemberInfoById(@RequestBody MemberUpdateRequestDto murDto) {
        int res = memberService.updateMemberInfoById(murDto);
        if(res == 0) {
            return ResponseEntity.badRequest().build();
        }else if(res == 2) {
            return ResponseEntity.internalServerError().build();
        }
        return ResponseEntity.ok().build();
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

    @PostMapping("/friend/ask") //친구 신청
    public ResponseEntity<String> addFriendWait(@RequestBody FriendWaitRequestDto friendWaitRequestDto)
    {
        if(friendWaitRequestDto.getFriendId() == null || friendWaitRequestDto.getFriendId() == 0) {
            Optional<Member> memberOpt = memberRepository.findByEmail(friendWaitRequestDto.getFriendEmail());
            if(memberOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("친구가 없습니다.");
            }
            friendWaitRequestDto.setFriendId(memberOpt.get().getId());
        }
        memberService.addFriendWait(friendWaitRequestDto);
        return ResponseEntity.ok("success");
    }

    @PostMapping("/friend/accept") //친구 수락
    public ResponseEntity<List<FriendResponseDto>> addFriend(@RequestBody FriendRequestDto friendRequestDto)
    {
        return ResponseEntity.ok(memberService.addFriend(friendRequestDto));
    }

    @GetMapping("/friend/list") //내 친구 목록
    public ResponseEntity<List<Member>> getFriendList()
    {
        List<Friend> friendIdList = friendRepository.findAllByFriendId(SecurityUtil.getCurrentMemberId());
        List<Member> friendList = new ArrayList<>();
        for(Friend f : friendIdList) {
            friendList.add(f.getMember());
        }
        return ResponseEntity.ok(friendList);
    }
    @GetMapping("/friend/wait")
    public ResponseEntity<List<Member>> getFriendWaitList() {
        List<FriendWaitEntity> friendIdList = friendWaitRepository.findAllByFriendId(SecurityUtil.getCurrentMemberId());
        List<Member> friendList = new ArrayList<>();
        for(FriendWaitEntity f : friendIdList) {
            friendList.add(f.getMember());
        }
        return ResponseEntity.ok(friendList);
    }


    @DeleteMapping("/friend/delete/{userId}") //친구삭제
    public ResponseEntity<Boolean> deleteFriend(@PathVariable("userId") Long friendId )
    {
        return ResponseEntity.ok(memberService.deleteFriend(friendId));
    }



    // 로그인2(목소리)
//    @PostMapping("/voicelogin")
//    public ResponseEntity<Member> voiceLoginCheck(@RequestBody MemberVoiceLoginCheckDto loginCheckDto){
//        return ResponseEntity.ok()
//
//    }
}
