package com.urs.spellit.security.auth;


import com.urs.spellit.member.model.dto.MemberRequestDto;
import com.urs.spellit.member.model.dto.MemberResponseDto;
import com.urs.spellit.member.model.dto.UserPasswordUpdateRequestDto;
import com.urs.spellit.security.token.dto.TokenDto;
import com.urs.spellit.security.token.dto.TokenRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup") //회원가입
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }
    @PostMapping("/signup/email") //이메일 중복 확인
    public ResponseEntity<Boolean> checkEmailDuplicate(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.checkEmailDuplicate(memberRequestDto));
    }
    @PostMapping("/signup/nickname") //닉네임 중복 확인
    public ResponseEntity<Boolean> checkNickNameDuplicate(@RequestBody MemberRequestDto memberRequestDto) {
        return ResponseEntity.ok(authService.checkNickNameDuplicate(memberRequestDto));
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


    // 비밀번호 변경
    @PutMapping("/changepwd")
    public ResponseEntity<String> changPassword(@RequestBody UserPasswordUpdateRequestDto userPwdDto
    ){
        if(!userPwdDto.getPassword().equals(userPwdDto.getPasswordConfirm()))
            return ResponseEntity.badRequest().body("");
        int res = authService.changPassword(userPwdDto);
        if(res == 1) {
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.badRequest().build();
        }
    }
}
