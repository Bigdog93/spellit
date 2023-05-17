package com.urs.spellit.member.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.urs.spellit.common.model.BaseTimeEntity;
import com.urs.spellit.game.entity.DeckEntity;
import com.urs.spellit.game.entity.GameCharacterEntity;
import com.urs.spellit.member.model.dto.MemberRecordRequestDto;
import com.urs.spellit.security.auth.entity.Authority;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    @Column(nullable = false,length = 10, unique = true)
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
    @Column(nullable = false)
    @ColumnDefault("0")
    private int loseCount;
    @Column(nullable = false)
    @ColumnDefault("0")
    private int drawCount;
    @Column
    private String profileMsg;

    @ManyToOne
    @JoinColumn(name = "character_id")
    private GameCharacterEntity gameCharacterEntity;


    @OneToMany(mappedBy = "member")
    @JsonIgnoreProperties({"member"})
    private List<DeckEntity> deck = new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<FriendWaitEntity> friendWaitEntities=new ArrayList<>();

    @OneToMany(mappedBy="member")
    private List<Friend> friends=new ArrayList<>();

    @Column
    @ColumnDefault("false")
    private Boolean isOnline;

    @Column
    @ColumnDefault("false")
    private Boolean isPlaying;

    @Column
    @ColumnDefault("false")
    private Boolean isDeleted;

    @Column
    @ColumnDefault("false")
    private String startSpell;

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
    public void changeRecord(MemberRecordRequestDto memberRecordRequestDto)
    {
        int expMax=1000;
        String gameResult=memberRecordRequestDto.getPlayResult();
        int plusExp=0;

        if(gameResult.equals("win"))
        {   this.winCount++;plusExp+=700;}
        else if(gameResult.equals("draw"))
        {   this.drawCount++;plusExp+=500;}
        else if(gameResult.equals("lose"))
        {   this.loseCount++;plusExp+=300;}

        if((this.exp+= plusExp)>expMax)
        {
            this.level+=1;
            this.exp=this.exp-expMax;
        }

        this.playCount++;
    }
    public void setUserDeck(List<DeckEntity> deckList) {this.deck=deckList;}
    public void changeFriendWaitList(List<FriendWaitEntity> friendWaitEntities){this.friendWaitEntities=friendWaitEntities;}

    public void changePassword(PasswordEncoder passwordEncoder, String changPassword){this.password = passwordEncoder.encode(changPassword);}
}
