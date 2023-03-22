package com.urs.spellit.auth;


import com.urs.spellit.member.model.dto.MemberRequestDto;
import com.urs.spellit.member.model.dto.MemberResponseDto;
import com.urs.spellit.token.dto.TokenDto;
import com.urs.spellit.token.dto.TokenRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup") //회원가입
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }
    @PostMapping("/withdrawal") //회원탈퇴
    public ResponseEntity<Integer> withdrawal(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.withdrawal(memberRequestDto));
    }

    @PostMapping("/login") //로그인
    public ResponseEntity<TokenDto> login(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.login(memberRequestDto));
    }

    @PostMapping("/logout") //로그아웃
    public ResponseEntity<Integer> logout(@RequestBody MemberRequestDto memberRequestDto)
    {
        return ResponseEntity.ok(authService.logout(memberRequestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
}
