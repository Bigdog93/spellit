package com.urs.spellit.member;

import com.urs.spellit.member.model.entity.FriendWaitEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendWaitRepository extends JpaRepository<FriendWaitEntity,Long> {
    List<FriendWaitEntity> findAllByMemberId(Long memberId );
}
