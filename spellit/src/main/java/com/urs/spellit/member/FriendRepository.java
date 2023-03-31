package com.urs.spellit.member;

import com.urs.spellit.member.model.entity.Friend;
import com.urs.spellit.member.model.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface FriendRepository extends JpaRepository<Friend,Long> {
    Set<Friend> findByMember_Id(Long id);
    List<Friend> findAllByMemberId(Long memberId);

    List<Friend> findAllByFriendId(Long currentMemberId);
}
