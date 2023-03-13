package com.urs.spellit.member;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
    private Logger log = LoggerFactory.getLogger(MemberService.class);

    private final MemberRepository memberRepository;

}
