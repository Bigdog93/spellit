package com.urs.spellit.member;

import com.urs.spellit.member.model.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend,Long> {

}
