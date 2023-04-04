-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: j8d201.p.ssafy.io    Database: spellit
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `mod_dt` datetime(6) DEFAULT NULL,
  `reg_dt` datetime(6) NOT NULL,
  `authority` varchar(255) DEFAULT NULL,
  `draw_count` int NOT NULL DEFAULT '0',
  `email` varchar(40) NOT NULL,
  `exp` int NOT NULL DEFAULT '0',
  `is_deleted` bit(1) DEFAULT b'0',
  `is_online` bit(1) DEFAULT b'0',
  `level` int NOT NULL DEFAULT '1',
  `nickname` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `play_count` int NOT NULL DEFAULT '0',
  `profile_msg` varchar(255) DEFAULT NULL,
  `start_spell` varchar(255) DEFAULT '0',
  `win_count` int NOT NULL DEFAULT '0',
  `character_id` bigint DEFAULT NULL,
  `is_playing` bit(1) DEFAULT b'0',
  `lose_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`member_id`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`),
  UNIQUE KEY `UK_hh9kg6jti4n1eoiertn2k6qsc` (`nickname`),
  KEY `FKk41tg6t5i4ficpdkebvrw7e89` (`character_id`),
  CONSTRAINT `FKk41tg6t5i4ficpdkebvrw7e89` FOREIGN KEY (`character_id`) REFERENCES `game_character` (`character_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2023-04-04 00:01:20.588701','2023-03-28 00:50:29.921532','ROLE_USER',0,'aaa@aaa',0,_binary '\0',_binary '\0',1,'인의동 대마법사','$2a$10$jztRRiiepvYOpPq6dcf.O.9oqQxNTfw2rP7jw5BDZD7j59dV4KrbG',0,'11연뽑해서 뭐/뭐/뭐/뭐 득했는데 우각하기 귀찮다','0',0,3,_binary '\0',0),(2,'2023-04-04 00:00:30.235497','2023-03-28 00:51:01.170529','ROLE_USER',0,'bbb@bbb',0,_binary '\0',_binary '\0',1,'bbb','$2a$10$aiNY1GqapceXdCHUfOw3YOtLcfsL3t2wCq43Ii1DRx4ubKRZi3Tg2',0,NULL,'0',0,2,_binary '\0',0),(3,'2023-03-28 13:28:39.159794','2023-03-28 13:28:39.159794','ROLE_USER',0,'',0,_binary '\0',_binary '\0',1,'','$2a$10$Eu0Zb9TzxiLuSHftZGnIKe4dVytEP./6/Y3AcnpJQqtMrhgJmuHGe',0,NULL,'0',0,1,_binary '\0',0),(4,'2023-03-29 01:07:20.017511','2023-03-29 01:07:20.017511','ROLE_USER',0,'lkc2',0,_binary '\0',_binary '\0',1,'absa','$2a$10$tUuQvWmwSa343HnjusQxeurSk8nZinzO3oD9i3MxERY651Ef1n.lG',0,NULL,'0',0,1,_binary '\0',0),(5,'2023-03-29 01:15:13.942261','2023-03-29 01:15:13.942261','ROLE_USER',0,'lkc3',0,_binary '\0',_binary '\0',1,'absssa','$2a$10$DFqfDCBBSvoFlRhCPGOi8uJO3OqrW29PTqi3msMIlRBeviYTFWYLe',0,NULL,'가자가자',0,1,_binary '\0',0),(6,'2023-03-29 01:16:50.870543','2023-03-29 01:16:50.870543','ROLE_USER',0,'lkc34',0,_binary '\0',_binary '\0',1,'감자튀김','$2a$10$jFLFElL8bbBPxsuRBI1ykedfpO4ek/7tZCJ9nTTPyvIOsJwzU3URm',0,NULL,'가자가자',0,1,_binary '\0',0),(7,'2023-03-30 04:42:08.955909','2023-03-30 04:42:08.955909','ROLE_USER',0,'test@test.com',0,_binary '\0',_binary '\0',0,'한글 테스트','$2a$10$9qIJRZu9iKwbAj3ymQF0Y.1O3KGbYtgkyl5VLwYM2roDw0IBYZwbS',0,NULL,'',0,1,_binary '\0',0),(8,'2023-03-31 00:10:34.235176','2023-03-31 00:10:34.235176','ROLE_USER',0,'ssafy@daum.net',0,_binary '\0',_binary '\0',0,'yy','$2a$10$F3aTyCn0aGrniJd0X/fW4OTijJ0IgyI.fQgO8Aw.ohQPo1U5ardzO',0,NULL,'',0,1,_binary '\0',0),(10,'2023-04-02 18:22:15.875668','2023-03-31 08:01:28.042236','ROLE_USER',0,'find_friend@alone.com',0,_binary '\0',_binary '\0',0,'나랑친구할래','$2a$10$k1Znzvg34BDAEkX5XYU0JOj9hlg9WYAFcQETqSSntPizKhzvFvpa.',0,'새 친구를 찾아보자','',0,2,_binary '\0',0),(11,'2023-04-03 01:43:31.431668','2023-04-02 12:53:54.534033','ROLE_USER',0,'ccc@ccc',0,_binary '\0',_binary '\0',0,'ccc','$2a$10$pA55/SqYxGpk9oYHsScViOag2IvkdpR1UgD00WgRlKKk9/HiIf7EK',0,NULL,'',0,1,_binary '\0',0),(12,'2023-04-02 17:33:17.913945','2023-04-02 15:24:41.683794','ROLE_USER',0,'f@fff.com',0,_binary '\0',_binary '\0',0,'대마법사가 될꺼얌','$2a$10$kRERknrnc62K1SRgD2OxYO4XdvHaepOxEziY5fqxqJvIYqMxME5Be',0,NULL,'',0,3,_binary '\0',0),(13,'2023-04-03 08:21:21.113383','2023-04-03 08:16:05.820185','ROLE_USER',0,'ddd@ddd',0,_binary '\0',_binary '\0',0,'ddd','$2a$10$bDsceTMhjy1tQKt7RkkZw.UHgXJ35U4dCI1zLj1czMDXtODhL/q/2',0,NULL,'',0,1,_binary '\0',0),(14,'2023-04-03 13:22:01.279539','2023-04-03 12:23:17.535167','ROLE_USER',0,'fff@fff',0,_binary '\0',_binary '\0',0,'f는싫다구요','$2a$10$Ogej3mMiZKXNcLv9APE9NuzXXbBEKho4svlEJC2D7sFNOnzu9vxaa',0,NULL,'',0,2,_binary '\0',0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-04  9:15:47
