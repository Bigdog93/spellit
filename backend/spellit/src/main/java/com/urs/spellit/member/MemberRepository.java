package com.urs.spellit.member;

import com.urs.spellit.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Member> findById(Long id);
    Optional<Member> findByNickname(String nickname);

    boolean existsByNickname(String nickname);
}
