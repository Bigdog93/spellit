package com.urs.spellit.member;

import com.urs.spellit.member.model.entity.FriendWaitEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendWaitRepository extends JpaRepository<FriendWaitEntity,Long> {
    List<FriendWaitEntity> findAllByFriendEmail(String friendEmail);
}
