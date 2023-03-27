package com.urs.spellit.member;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.CardRepository;
import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.GameService;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.MemberRecordRequestDto;
import com.urs.spellit.member.model.dto.MemberRecordResponseDto;
import com.urs.spellit.member.model.dto.MemberResponseDto;
import com.urs.spellit.member.model.entity.FriendWaitEntity;
import com.urs.spellit.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private Logger log = LoggerFactory.getLogger(MemberService.class);

    private final GameService gameService;
    private final MemberRepository memberRepository;
    private final DeckRepository deckRepository;
    private final CardRepository cardRepository;
    private final FriendWaitRepository friendWaitRepository;

    public MemberResponseDto findMemberInfoById(Long memberId)
    {
        Optional<Member> optional = memberRepository.findById(memberId);
        if(optional.isEmpty()) {
            throw new RuntimeException("로그인 유저 정보가 없습니다.");
        }
        MemberResponseDto member = MemberResponseDto.of(optional.get());
        member.setDeck(this.getUserDeck(memberId));
        return member;
    }
    public MemberResponseDto findMemberInfoByEmail(String email)
    {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(()->new RuntimeException("유저 정보가 없습니다."));
    }

    public List<CardEntity> getUserDeck(Long memberId) {
        List<DeckEntity> deckEntities = deckRepository.findAllByMemberId(memberId);
        List<CardEntity> deck = new ArrayList<>();
        for(DeckEntity d : deckEntities) {
            deck.add(d.getCard());
        }
        return deck;
    }

    public GameCharacterEntity setMyCharacter(GameCharacterEntity gameCharacterEntity) {
        GameCharacterEntity gameCharacter=gameService.getCharacter(gameCharacterEntity.getId()); //캐릭터ID에 대응하는 개체 (ex. 곽춘배)
        Optional<Member> member=memberRepository.findById(SecurityUtil.getCurrentMemberId()); //id로 멤버레포의 멤버 찾음 (ex. 이재완)
        member.get().changeGameCharacter(gameCharacter); //이재완의 gamecharacter = 곽춘배
        memberRepository.save(member.get());
        return gameCharacterEntity; //곽춘배 반환
    }

    public MemberRecordResponseDto updateRecord(MemberRecordRequestDto memberRecordRequestDto)
    {
        Optional<Member> member=memberRepository.findById(SecurityUtil.getCurrentMemberId());
        member.get().changeRecord(memberRecordRequestDto);
        memberRepository.save(member.get());
        return MemberRecordResponseDto.of(member.get());
    }

    public List<CardEntity> setUserDeck(List<CardEntity> cardEntities) {
        Optional<Member> member=memberRepository.findById(SecurityUtil.getCurrentMemberId());
        deckRepository.deleteAllByMemberId(SecurityUtil.getCurrentMemberId());
        List<CardEntity> cards= new ArrayList<>();
        for(CardEntity cardEntity : cardEntities)
        {
            try {
                long cardId = cardEntity.getId();
                cards.add(cardRepository.findById(cardId));
            }
            catch(Exception e)
            {
                throw new RuntimeException("존재하지 않는 카드입니다.");
            }
        }

        member.get().setUserDeck(DeckEntity.toDeck(deckRepository,member.get(),cards));
        memberRepository.save(member.get());
        return this.getUserDeck(member.get().getId());
    }

    public List<FriendWaitEntity> addFriendWait(FriendWaitEntity friendEntity) {
        Optional<Member> member=memberRepository.findByEmail(SecurityUtil.getAnotherMemberEmail(friendEntity.getFriendEmail()));
        List<FriendWaitEntity> friendWaitEntities=friendWaitRepository.findAllByFriendEmail(member.get().getEmail());

        for(FriendWaitEntity friendWaitEntity : friendWaitEntities)
        {
            if(friendEntity.getFriendEmail().equals(friendWaitEntity.getFriendEmail()))
                throw new RuntimeException("이미 친구요청을 보낸 상대입니다.");
        }

        friendWaitEntities.add(friendEntity);
        member.get().changeFriendWaitList(friendWaitEntities);
        friendWaitRepository.save(friendEntity);
        memberRepository.save(member.get());

        return friendWaitEntities;
    }
}
