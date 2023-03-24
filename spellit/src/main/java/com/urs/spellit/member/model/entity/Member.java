package com.urs.spellit.member.model.entity;

import com.urs.spellit.security.auth.entity.Authority;
import com.urs.spellit.common.model.BaseTimeEntity;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name="member")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert
@DynamicUpdate
public class Member extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", nullable = false)
    private Long id;

    @Column(nullable = false, length = 40, unique = true)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false,length = 7, unique = true)
    private String nickname;
    @Column(nullable = false)
    @ColumnDefault("1")
    private int level;
    @Column(nullable = false)
    @ColumnDefault("0")
    private int exp;
    @Column(nullable = false)
    @ColumnDefault("0")
    private int playCount;
    @Column(nullable = false)
    @ColumnDefault("0")
    private int winCount;
    @Column
    private String profileMsg;

    @ManyToOne
    @JoinColumn(name = "character_id")
    private GameCharacterEntity gameCharacterEntity;

    @OneToMany(mappedBy = "member")
    private List<DeckEntity> deck = new ArrayList<>();


    @Column
    @ColumnDefault("false")
    private Boolean isDeleted;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    public void changeIsDeleted(boolean isDeleted)
    {
        this.isDeleted=isDeleted;
    }
    public void changeNickname(String nickname)
    {
        this.nickname=nickname;
    }

    public void changeGameCharacter(GameCharacterEntity gameCharacter)
    {
        this.gameCharacterEntity=gameCharacter;
    }

}
