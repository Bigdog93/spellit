-- -- 기본적으로 넣어줄 Data Set, 프로젝트 빌드 시 실행됨

INSERT INTO card
(card_id,code, title, spell, cost, damage, attribute)
VALUES
    (1,"wind1", "뇌전의 창", "모여라 대기의 번개, 천지를 뒤흔드는 굉음의 뇌광, 창이 되어 적을 꿰뚫어라", 8, 200, 0),
    (2,"wind2", "풍화의 검", "칼날의 바람이여, 적을 베어라", 4, 100, 0),
    (3,"wind3", "남양의 폭풍", "불어라 한줄기 바람, 모이고 모여 적들을 쓸어버려라", 5, 125, 0),
    (4,"water1", "영원의 동토", "냉기여 휘몰아쳐라. 불을 삼키고 온기를 먹어치우며 이 땅을 내달려 모든것이 얼어붙을 것이니", 9, 225, 1),
    (5,"water2", "얼음의 송곳", "얼어붙어라 대기의 물이여, 날카로운 화살이 되어 적을 꿰뚫어라", 6, 150, 1),
    (6,"fire1", "화염탄", "타올라라 불꽃, 적을 태우는 탄환이 되어 날아라", 5, 130, 2),
    (7,"fire2", "진홍의 발화", "선혈보다 붉게 타오르는 화염의 꽃, 충천하는 화광을 뿜으며 피어나 잿빛으로 물들여라", 8, 205, 2),
    (8,"fire3", "불꽃 폭풍", "타오르는 불길이여, 나의 손에 흘러라, 거세게 몰아치는 폭풍이 되어 모든 것을 불태워라", 8, 210, 2),
    (9,"earth1", "광야의 탄식", "누구보다 낮은 대지여, 자신을 낮추고 굶주리고 상처입은 자여, 그 분노를 해방하여, 밟고 선 자를 집어 삼켜라", 10, 255, 3),
    (10,"earth2", "대지의 분노", "대지여, 분노의 불길을 내뿜어라, 돌과 흙, 그리고 대지의 힘을 불러와, 모든 것을 파괴하라", 9, 225, 3),
    (11,"light1", "멸마의 성휘", "악을 멸하는 성스러운 빛이여, 마의 존재를 멸하는 성화의 빛으로 적을 강타해라", 8, 205, 4),
    (12,"light2", "광휘의 섬광", "빛의 권능을 내 손에, 태양과 달, 별들의 힘을 모아, 적들에게 심판을 내려라", 7, 180, 4),
    (13,"dark1", "무광의 심연", "어둠보다 어두운 자여, 심연 깊은 곳에서 우리를 올려다보는 자여, 한 점 빛조차 허락하지 않는 어둠을 내보여 그 공포로 영혼까지 떨게 하라", 12, 300, 5),
    (14,"dark2", "탐닉의 심연", "끌어당겨라 ,집어삼켜라, 빛을 질투하는 어둠이여, 게걸스럽게 탐하여 모든것을 빼앗아라", 9, 230, 5)
    AS new_record
ON DUPLICATE KEY
UPDATE
    code=new_record.code,
    title=new_record.title,
    spell=new_record.spell,
    cost=new_record.cost,
    damage=new_record.damage,
    attribute=new_record.attribute;

INSERT INTO game_character
(character_id,character_name, english_name, stand, hurt, attack, winner, combo)
VALUES
    (1,"곽춘배", "CB", "", "", "", "", ""),
    (2,"키리카", "AK", "", "", "", "", ""),
    (3,"루나", "LUNA", "", "", "", "", "")
    AS new_record
ON DUPLICATE KEY
UPDATE
    character_name=new_record.character_name,
    english_name=new_record.english_name,
    stand=new_record.stand,
    hurt=new_record.hurt,
    attack=new_record.attack,
    winner=new_record.winner,
    combo=new_record.combo;

/*INSERT INTO `member`
(member_id,mod_dt,reg_dt,authority,email,exp,is_deleted,is_online,level,nickname,password,play_count,profile_msg,win_count,character_id,draw_count,lose_count,start_spell)
VALUES
    (1,'2023-03-29 04:07:15.873543','2023-03-28 00:50:29.921532','ROLE_USER','aaa@aaa',0,0,0,1,'인의동 대마법사','$2a$10$jztRRiiepvYOpPq6dcf.O.9oqQxNTfw2rP7jw5BDZD7j59dV4KrbG',0,'11연뽑해서 뭐/뭐/뭐/뭐 득했는데 우각하기 귀찮다',0,1,0,0,'0')
    AS new_record
ON DUPLICATE KEY
UPDATE
    mod_dt=new_record.mod_dt,
    reg_dt=new_record.reg_dt,
    authority=new_record.authority,
    email=new_record.email,
    exp=new_record.exp,
    is_deleted=new_record.is_deleted,
    is_online=new_record.is_online,
    level=new_record.level,
    nickname=new_record.nickname,
    password=new_record.password,
    play_count=new_record.play_count,
    profile_msg=new_record.profile_msg,
    win_count=new_record.win_count,
    character_id=new_record.character_id,
    draw_count=new_record.draw_count,
    lose_count=new_record.lose_count,
    start_spell=new_record.start_spell;

INSERT INTO `member`
(member_id,mod_dt,reg_dt,authority,email,exp,is_deleted,is_online,level,nickname,password,play_count,profile_msg,win_count,character_id,draw_count,lose_count,start_spell)
VALUES
    (2,'2023-03-28 06:29:13.101507','2023-03-28 00:51:01.170529','ROLE_USER','bbb@bbb',0,0,0,1,'bbb','$2a$10$aiNY1GqapceXdCHUfOw3YOtLcfsL3t2wCq43Ii1DRx4ubKRZi3Tg2',0,NULL,0,1,0,0,'0')
    AS new_record
ON DUPLICATE KEY
UPDATE
    mod_dt=new_record.mod_dt,
    reg_dt=new_record.reg_dt,
    authority=new_record.authority,
    email=new_record.email,
    exp=new_record.exp,
    is_deleted=new_record.is_deleted,
    is_online=new_record.is_online,
    level=new_record.level,
    nickname=new_record.nickname,
    password=new_record.password,
    play_count=new_record.play_count,
    profile_msg=new_record.profile_msg,
    win_count=new_record.win_count,
    character_id=new_record.character_id,
    draw_count=new_record.draw_count,
    lose_count=new_record.lose_count,
    start_spell=new_record.start_spell;

INSERT INTO `member`
(member_id,mod_dt,reg_dt,authority,email,exp,is_deleted,is_online,level,nickname,password,play_count,profile_msg,win_count,character_id,draw_count,lose_count,start_spell)
VALUES
    (3,'2023-03-28 13:28:39.159794','2023-03-28 13:28:39.159794','ROLE_USER','',0,0,0,1,'','$2a$10$Eu0Zb9TzxiLuSHftZGnIKe4dVytEP./6/Y3AcnpJQqtMrhgJmuHGe',0,NULL,0,1,0,0,'0')
    AS new_record
ON DUPLICATE KEY
UPDATE
    mod_dt=new_record.mod_dt,
    reg_dt=new_record.reg_dt,
    authority=new_record.authority,
    email=new_record.email,
    exp=new_record.exp,
    is_deleted=new_record.is_deleted,
    is_online=new_record.is_online,
    level=new_record.level,
    nickname=new_record.nickname,
    password=new_record.password,
    play_count=new_record.play_count,
    profile_msg=new_record.profile_msg,
    win_count=new_record.win_count,
    character_id=new_record.character_id,
    draw_count=new_record.draw_count,
    lose_count=new_record.lose_count,
    start_spell=new_record.start_spell;

INSERT INTO `member`
(member_id,mod_dt,reg_dt,authority,email,exp,is_deleted,is_online,level,nickname,password,play_count,profile_msg,win_count,character_id,draw_count,lose_count,start_spell)
VALUES
    (4,'2023-03-29 01:07:20.017511','2023-03-29 01:07:20.017511','ROLE_USER','lkc2',0,0,0,1,'absa','$2a$10$tUuQvWmwSa343HnjusQxeurSk8nZinzO3oD9i3MxERY651Ef1n.lG',0,NULL,0,1,0,0,'0')
    AS new_record
ON DUPLICATE KEY
UPDATE
    mod_dt=new_record.mod_dt,
    reg_dt=new_record.reg_dt,
    authority=new_record.authority,
    email=new_record.email,
    exp=new_record.exp,
    is_deleted=new_record.is_deleted,
    is_online=new_record.is_online,
    level=new_record.level,
    nickname=new_record.nickname,
    password=new_record.password,
    play_count=new_record.play_count,
    profile_msg=new_record.profile_msg,
    win_count=new_record.win_count,
    character_id=new_record.character_id,
    draw_count=new_record.draw_count,
    lose_count=new_record.lose_count,
    start_spell=new_record.start_spell;

INSERT INTO `member`
(member_id,mod_dt,reg_dt,authority,email,exp,is_deleted,is_online,level,nickname,password,play_count,profile_msg,win_count,character_id,draw_count,lose_count,start_spell)
VALUES
    (5,'2023-03-29 01:15:13.942261','2023-03-29 01:15:13.942261','ROLE_USER','lkc3',0,0,0,1,'absssa','$2a$10$DFqfDCBBSvoFlRhCPGOi8uJO3OqrW29PTqi3msMIlRBeviYTFWYLe',0,NULL,0,1,0,0,'가자가자')
    AS new_record
ON DUPLICATE KEY
UPDATE
    mod_dt=new_record.mod_dt,
    reg_dt=new_record.reg_dt,
    authority=new_record.authority,
    email=new_record.email,
    exp=new_record.exp,
    is_deleted=new_record.is_deleted,
    is_online=new_record.is_online,
    level=new_record.level,
    nickname=new_record.nickname,
    password=new_record.password,
    play_count=new_record.play_count,
    profile_msg=new_record.profile_msg,
    win_count=new_record.win_count,
    character_id=new_record.character_id,
    draw_count=new_record.draw_count,
    lose_count=new_record.lose_count,
    start_spell=new_record.start_spell;

INSERT INTO `member`
(member_id,mod_dt,reg_dt,authority,email,exp,is_deleted,is_online,level,nickname,password,play_count,profile_msg,win_count,character_id,draw_count,lose_count,start_spell)
VALUES
    (6,'2023-03-29 01:16:50.870543','2023-03-29 01:16:50.870543','ROLE_USER','lkc34',0,0,0,1,'감자튀김','$2a$10$jFLFElL8bbBPxsuRBI1ykedfpO4ek/7tZCJ9nTTPyvIOsJwzU3URm',0,NULL,0,1,0,0,'가자가자')
    AS new_record
ON DUPLICATE KEY
UPDATE
    mod_dt=new_record.mod_dt,
    reg_dt=new_record.reg_dt,
    authority=new_record.authority,
    email=new_record.email,
    exp=new_record.exp,
    is_deleted=new_record.is_deleted,
    is_online=new_record.is_online,
    level=new_record.level,
    nickname=new_record.nickname,
    password=new_record.password,
    play_count=new_record.play_count,
    profile_msg=new_record.profile_msg,
    win_count=new_record.win_count,
    character_id=new_record.character_id,
    draw_count=new_record.draw_count,
    lose_count=new_record.lose_count,
    start_spell=new_record.start_spell;*/

-- INSERT INTO `deck`
-- (deck_id,card_id,member_id)
-- VALUES
--     (1,4,2),
--     (2,5,2),
--     (3,6,2),
--     (4,6,1),
--     (5,1,1),
--     (6,4,1)
--     AS new_record
-- ON DUPLICATE KEY
-- UPDATE
--     card_id=new_record.card_id,
--     member_id=new_record.member_id;

-- INSERT INTO `friend_wait`
-- (id,friend_email,friend_id,member_id)
-- values
--     (1,'aaa@aaa',1,2)
--     AS new_record
-- ON DUPLICATE KEY
-- UPDATE
--     friend_email=new_record.friend_email,
--     friend_id=new_record.friend_id,
--     member_id=new_record.member_id;
--
-- INSERT INTO `friend`
-- (id,friend_email,friend_id,member_id)
-- values
--     (1,'lkc2',4,1),
--     (2,'aaa@aaa',1,4)
--     AS new_record
-- ON DUPLICATE KEY
-- UPDATE
--     friend_email=new_record.friend_email,
--     friend_id=new_record.friend_id,
--     member_id=new_record.member_id;
