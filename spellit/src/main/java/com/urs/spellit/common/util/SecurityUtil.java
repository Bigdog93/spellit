package com.urs.spellit.common.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
@RequiredArgsConstructor
public class SecurityUtil {
    public static void checkAuthentication(Authentication authentication)
    {

        if (authentication == null || authentication.getName() == null ) {
            throw  new RuntimeException("Security Context 에 인증 정보가 없습니다.");
        }
        if(authentication.getName().equals("anonymousUser"))
        {
            throw  new RuntimeException("로그인하지 않은 익명 유저입니다. id,pw 또는 access token을 확인해주세요.");
        }

    }

    // SecurityContext 에 유저 정보가 저장되는 시점
    // Request 가 들어올 때 JwtFilter 의 doFilter 에서 저장
    public static Long getCurrentMemberId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        checkAuthentication(authentication);
        return Long.parseLong(authentication.getName());
    }

    public static String getAnotherMemberEmail(String email)
    {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        checkAuthentication(authentication);
        return email;
    }
    public static Long getCharacterId(Long characterId)
    {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        checkAuthentication(authentication);

        return characterId;
    }

}