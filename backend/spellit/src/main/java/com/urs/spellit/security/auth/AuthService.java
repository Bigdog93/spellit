package com.urs.spellit.security.auth;

import com.urs.spellit.common.util.SecurityUtil;
import com.urs.spellit.game.CardRepository;
import com.urs.spellit.game.DeckRepository;
import com.urs.spellit.game.GameService;
import com.urs.spellit.game.entity.CardEntity;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.member.MemberRepository;
import com.urs.spellit.member.MemberService;
import com.urs.spellit.member.model.dto.*;
import com.urs.spellit.member.model.entity.Member;
import com.urs.spellit.security.jwt.TokenProvider;
import com.urs.spellit.security.token.RefreshTokenRepository;
import com.urs.spellit.security.token.dto.TokenDto;
import com.urs.spellit.security.token.dto.TokenRequestDto;
import com.urs.spellit.security.token.entity.RefreshToken;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final GameService gameService;
    private final CardRepository cardRepository;
    private final DeckRepository deckRepository;

    @Transactional
    public MemberResponseDto signup(MemberRequestDto memberRequestDto) {

        Member member = memberRequestDto.toMember(passwordEncoder);
        member.setLevel(1);
        member.setProfileMsg("상태메시지를 설정해주세요.");
        member.setGameCharacterEntity(gameService.getCharacter(1L));

        List<CardEntity> defaultCards=new ArrayList<>();
        defaultCards.add(cardRepository.findByCode("wind1"));
        defaultCards.add(cardRepository.findByCode("water1"));
        defaultCards.add(cardRepository.findByCode("fire1"));
        defaultCards.add(cardRepository.findByCode("earth1"));
        defaultCards.add(cardRepository.findByCode("light1"));
        member.setUserDeck(DeckEntity.toDeck(deckRepository,member,defaultCards));

        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public Boolean checkEmailDuplicate(MemberRequestDto memberRequestDto)
    {
        return !memberRepository.existsByEmail(memberRequestDto.getEmail());
    }

    @Transactional
    public Boolean checkNickNameDuplicate(MemberRequestDto memberRequestDto)
    {
        return !memberRepository.existsByNickname(memberRequestDto.getNickname());
    }

    @Transactional
    public int withdrawal(MemberRequestDto memberRequestDto) {
        if (!memberRepository.existsByEmail(memberRequestDto.getEmail())) {
            throw new RuntimeException("가입하지 않은 유저입니다");
        }
        Optional<Member> member = memberRepository.findByEmail(memberRequestDto.getEmail());
        try {
            member.get().changeNickname("null");
            member.get().changeIsDeleted(true);
            return 200;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("회원탈퇴 실패");
        }
    }

    @Transactional
    public TokenDto login(MemberRequestDto memberRequestDto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public int logout(MemberRequestDto memberRequestDto)
    {
        if(!memberRepository.existsByEmail(memberRequestDto.getEmail()))
        {
            throw new RuntimeException("로그인하지 않은 유저입니다");
        }
        Optional<Member> member = memberRepository.findByEmail(memberRequestDto.getEmail());
        Optional<RefreshToken> refreshToken=refreshTokenRepository.findByKey(Long.toString(member.get().getId()));
        try{
            refreshTokenRepository.delete(refreshToken.get());
            return 200;
        }
        catch (Exception e)
        {
            e.printStackTrace();
            throw new RuntimeException("로그아웃 실패");
        }
    }

    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    // 비밀번호 변경
    public int changPassword(UserPasswordUpdateRequestDto changePwd){
        Optional<Member> memberOpt=memberRepository.findById(SecurityUtil.getCurrentMemberId());
        if(memberOpt.isEmpty()) return 2;
        Member member = memberOpt.get();
        if(!passwordEncoder.matches(changePwd.getOriginPassword(), member.getPassword())) {
            return 3;
        }
        member.changePassword(passwordEncoder, changePwd.getPassword());
        memberRepository.save(member);
        return 1;
    }


}
