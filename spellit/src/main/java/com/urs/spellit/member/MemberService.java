package com.urs.spellit.member;

import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.GameService;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.member.model.dto.MemberResponseDto;
import com.urs.spellit.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private Logger log = LoggerFactory.getLogger(MemberService.class);

    private final GameService gameService;
    private final MemberRepository memberRepository;
    private final DeckRepository deckRepository;
    public MemberResponseDto findMemberInfoById(Long memberId)
    {
        Optional<Member> optional = memberRepository.findById(memberId);
        if(optional.isEmpty()) {
            throw new RuntimeException("로그인 유저 정보가 없습니다.");
        }
        MemberResponseDto member = MemberResponseDto.of(optional.get());
        member.setDeck(gameService.getUserDeck(memberId));
        return member;
    }
    public MemberResponseDto findMemberInfoByEmail(String email)
    {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(()->new RuntimeException("유저 정보가 없습니다."));
    }

    //public CharacterResponseDto setMyCharacter(int characterId) {
    //}

    public List<DeckEntity> getUserDeck(Long memberId) {
        List<DeckEntity> deck = deckRepository.findAllByMemberId(memberId);
        if(deck.isEmpty()) {
            throw new RuntimeException("덱 정보가 없습니다.");
        }
        return deck;
    }
}
