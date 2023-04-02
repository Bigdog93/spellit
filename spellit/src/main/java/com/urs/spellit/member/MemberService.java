package com.urs.spellit.member;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.CardRepository;
import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.GameService;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.*;
import com.urs.spellit.member.model.entity.Friend;
import com.urs.spellit.member.model.entity.FriendWaitEntity;
import com.urs.spellit.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MemberService {
    private Logger log = LoggerFactory.getLogger(MemberService.class);

    private final GameService gameService;
    private final MemberRepository memberRepository;
    private final DeckRepository deckRepository;
    private final CardRepository cardRepository;
    private final FriendWaitRepository friendWaitRepository;
    private final FriendRepository friendRepository;

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
    /*public MemberResponseDto findMemberInfoByEmail(String email)
    {
        return memberRepository.findByEmail(email)
                .map(MemberResponseDto::of)
                .orElseThrow(()->new RuntimeException("유저 정보가 없습니다."));
    }*/


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
        long memberId = SecurityUtil.getCurrentMemberId();
        Optional<Member> member=memberRepository.findById(memberId);
        long count = deckRepository.countByMember_Id(memberId);
        if(count > 0) deckRepository.deleteAllByMemberId(memberId);
//        List<CardEntity> cards= new ArrayList<>();
//        for(CardEntity cardEntity : cardEntities)
//        {
//            try {
//                long cardId = cardEntity.getId();
//                cards.add(cardRepository.findById(cardId));
//            }
//            catch(Exception e)
//            {
//                throw new RuntimeException("존재하지 않는 카드입니다.");
//            }
//        }
        if(member.isEmpty()) return null; // null check
        member.get().setUserDeck(DeckEntity.toDeck(deckRepository,member.get(),cardEntities));
        memberRepository.save(member.get());
        return this.getUserDeck(member.get().getId());
    }

    //친구 요청을 하는 입장
    public FriendWaitResponseDto addFriendWait(FriendWaitRequestDto friendWaitRequestDto) {
        Member member=memberRepository.findById(SecurityUtil.getCurrentMemberId()).get(); //나
        Long friendId=friendWaitRequestDto.getFriendId(); //친구Id
        Member friend=memberRepository.findById(friendId).get(); //친구

        List<FriendWaitEntity> friendWaitEntities=friendWaitRepository.findAllByMemberId(friendId); //상대의 친구대기 리스트

        if(friendId==member.getId())
            throw new RuntimeException(("나는 세상에서 제일 소중한 친구입니다:) "));

        for(FriendWaitEntity friendWaitEntity : friendWaitEntities)
        {
            if(member.getId()==friendWaitEntity.getFriendId()) //내가 이미 상대의 친구 대기 리스트에 있음
                throw new RuntimeException("이미 친구요청을 보낸 상대입니다.");
        }

        //친구 대기 리스트에 없음//

        FriendWaitEntity friendWaitEntity=FriendWaitEntity.toBuild(friend.getId(), friend.getEmail(), member); //나 대기 객체 생성
        friendWaitEntities.add(friendWaitEntity); //상대의 친구 대기 리스트에 나를 추가
        friend.changeFriendWaitList(friendWaitEntities);
        friendWaitRepository.save(friendWaitEntity); //친구 대기 리스트 저장

        return FriendWaitResponseDto.toResponse(friendWaitEntity); //친구Id, 내 Id 반환
    }

    //친구 수락을 하는 입장 (전제: 나의 친구대기창에 상대가 있음)
    public List<FriendResponseDto> addFriend(FriendRequestDto friendRequestDto)
    {
        Long myId=SecurityUtil.getCurrentMemberId(); // 1
        Long friendId=friendRequestDto.getFriendId(); // 2

        Member me=(memberRepository.findById(myId)).get();
        Member friend=(memberRepository.findById(friendId)).get();

        String myEmail=me.getEmail();
        String friendEmail=friend.getEmail();

        List<Friend> myFriends=me.getFriends();
        List<Friend> Friends=friend.getFriends();

        ///입력값이 나인지 확인///
        if(friendId==myId)
            throw new RuntimeException(("나는 세상에서 제일 소중한 친구입니다:) "));

        ///이미 친구인지 확인///
        for(Friend myFriend : myFriends)
        {
            if(myFriend.getFriendId()==friendId)
                throw new RuntimeException("이미 친구입니다.");
        }

        ///내 친구 대기 리스트에서 상대 삭제///
        List<FriendWaitEntity> myFriendWaitList=friend.getFriendWaitEntities(); //내 친구대기 리스트
        FriendWaitEntity friendWait=FriendWaitEntity.checkExistsInWaitList(myFriendWaitList,myId); //내 친구대기 리스트에 상대가 존재하는지 확인
        if(friendWait!=null) //존재
            friendWaitRepository.delete(friendWait); //내 친구 대기 리스트에서 상대를 삭제
        else //존재X
            throw new RuntimeException("내 친구 대기 리스트에 상대가 존재하지 않습니다.");

        ///상대의 친구대기 리스트에 내가 있으면 나를 삭제///
        List<FriendWaitEntity> friendFriendWaitList=me.getFriendWaitEntities(); //상대의 친구대기 리스트
        FriendWaitEntity meWait=FriendWaitEntity.checkExistsInWaitList(friendFriendWaitList,friendId); //상대의 친구대기 리스트에 내가 존재하는지 확인
        if(meWait!=null) //존재
            friendWaitRepository.delete(meWait); //상대의 친구 대기 리스트에서 나를 삭제

        ///내 친구 리스트에 상대 추가///
        Friend addFriend=Friend.toBuild(friendId,friendEmail,me);
        myFriends.add(addFriend);
        me.setFriends(myFriends);
        friendRepository.save(addFriend);
        
        ///상대의 친구 리스트에 나 추가///
        Friend addMe=Friend.toBuild(myId,myEmail,friend);
        Friends.add(addMe);
        friend.setFriends(Friends);
        friendRepository.save(addMe);

        return FriendResponseDto.responseRelation(addFriend,addMe);
    }

    public List<FriendResponseDto> getFriendList()
    {
        Long myId=SecurityUtil.getCurrentMemberId();
        List<Friend> friends=friendRepository.findAllByMemberId(myId);
        return FriendResponseDto.responseList(friends);
    }

    public Boolean deleteFriend(Long friendId)
    {
        Long myId=SecurityUtil.getCurrentMemberId();
        List<Friend> myFriends=friendRepository.findAllByMemberId(myId);
        List<Friend> friendFriends=friendRepository.findAllByMemberId(friendId);

        if(myId==friendId)
            throw new RuntimeException("나는 세상에서 제일 소중한 친구입니다:) ");

        Friend me=Friend.checkExistsInFriends(friendFriends,myId);
        Friend friend=Friend.checkExistsInFriends(myFriends,friendId);
        if(friend!=null) {
            friendRepository.delete(friend);
        }
        else
            throw new RuntimeException("내 친구목록에 없는 친구입니다.");

        if(me!=null) {
            friendRepository.delete(me);
        }
        else
            throw new RuntimeException("상대 친구목록에 내가 없습니다.");

        return true;
    }
    public List<Long> playerOnline(long memberId) {
        Optional<Member> playerOpt = memberRepository.findById(memberId);
        if(playerOpt.isEmpty()) {
            log.error("온라인으로 표시할 유저가 없습니다. : There is no Member");
            return null;
        }
        Member player = playerOpt.get();
        player.setIsOnline(true);
        memberRepository.save(player);
        List<Friend> friends = friendRepository.findAllByMemberId(memberId);
        List<Long> friendsId = new ArrayList<>();
        for(Friend f : friends) {
            friendsId.add(f.getFriendId());
        }
        return friendsId;
    }

    public List<Long> playerOffline(long memberId) {
        Optional<Member> playerOpt = memberRepository.findById(memberId);
        if(playerOpt.isEmpty()) return null;
        Member player = playerOpt.get();
        player.setIsOnline(false);
        memberRepository.save(player);
        List<Friend> friends = friendRepository.findAllByMemberId(memberId);
        List<Long> friendsId = new ArrayList<>();
        for(Friend f : friends) {
            friendsId.add(f.getFriendId());
        }
        return friendsId;
    }

    public Set<Long> playerPlayStart(long player1Id, long player2Id) {
        Optional<Member> playerOpt1 = memberRepository.findById(player1Id);
        Optional<Member> playerOpt2 = memberRepository.findById(player2Id);
        if(playerOpt1.isEmpty() || playerOpt2.isEmpty()) return null;
        Member player1 = playerOpt1.get();
        Member player2 = playerOpt2.get();
        player1.setIsPlaying(true);
        player2.setIsPlaying(true);
        memberRepository.save(player1);
        memberRepository.save(player2);
        List<Friend> friends1 = friendRepository.findAllByMemberId(player1Id);
        List<Friend> friends2 = friendRepository.findAllByMemberId(player2Id);
        Set<Long> friendsId = new HashSet<>();
        for(Friend f : friends1) {
            friendsId.add(f.getFriendId());
        }
        for(Friend f: friends2) {
            friendsId.add(f.getFriendId());
        }
        return friendsId;
    }
    public List<Long> playerPlayEnd(long memberId) {
        Optional<Member> playerOpt = memberRepository.findById(memberId);
        if(playerOpt.isEmpty()) return null;
        Member player = playerOpt.get();
        player.setIsPlaying(false);
        memberRepository.save(player);
        List<Friend> friends = friendRepository.findAllByMemberId(memberId);
        List<Long> friendsId = new ArrayList<>();
        for(Friend f : friends) {
            friendsId.add(f.getFriendId());
        }
        return friendsId;
    }

    public int updateMemberInfoById(MemberUpdateRequestDto murDto) {
        Optional<Member> memberOpt = memberRepository.findById(SecurityUtil.getCurrentMemberId());
        if(memberOpt.isEmpty()) return 0;
        try {
            Member member = memberOpt.get();
            member.setNickname(murDto.getNickname());
            member.setProfileMsg(murDto.getProfileMsg());
            memberRepository.save(member);
            return 1;
        }catch(Exception e) {
            e.printStackTrace();
            return 2;
        }
    }
}
