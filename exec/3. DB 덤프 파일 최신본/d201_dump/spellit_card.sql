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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `card_id` bigint NOT NULL AUTO_INCREMENT,
  `attribute` int NOT NULL,
  `code` varchar(255) NOT NULL,
  `cost` int NOT NULL,
  `damage` int NOT NULL,
  `spell` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`card_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,0,'wind1',8,200,'모여라 대기의 번개, 천지를 뒤흔드는 굉음의 뇌광, 창이 되어 적을 꿰뚫어라','뇌전의 창'),(2,0,'wind2',4,100,'칼날의 바람이여, 적을 베어라','풍화의 검'),(3,0,'wind3',5,125,'불어라 한줄기 바람, 모이고 모여 적들을 쓸어버려라','남양의 폭풍'),(4,1,'water1',9,225,'냉기여 휘몰아쳐라. 불을 삼키고 온기를 먹어치우며 이 땅을 내달려 모든것이 얼어붙을 것이니','영원의 동토'),(5,1,'water2',6,150,'얼어붙어라 대기의 물이여, 날카로운 화살이 되어 적을 꿰뚫어라','얼음의 송곳'),(6,2,'fire1',5,130,'타올라라 불꽃, 적을 태우는 탄환이 되어 날아라','화염탄'),(7,2,'fire2',8,205,'선혈보다 붉게 타오르는 화염의 꽃, 충천하는 화광을 뿜으며 피어나 잿빛으로 물들여라','진홍의 발화'),(8,2,'fire3',8,210,'타오르는 불길이여, 나의 손에 흘러라, 거세게 몰아치는 폭풍이 되어 모든 것을 불태워라','불꽃 폭풍'),(9,3,'earth1',10,255,'누구보다 낮은 대지여, 자신을 낮추고 굶주리고 상처입은 자여, 그 분노를 해방하여, 밟고 선 자를 집어 삼켜라','광야의 탄식'),(10,3,'earth2',9,225,'대지여, 분노의 불길을 내뿜어라, 돌과 흙, 그리고 대지의 힘을 불러와, 모든 것을 파괴하라','대지의 분노'),(11,4,'light1',8,205,'악을 멸하는 성스러운 빛이여, 마의 존재를 멸하는 성화의 빛으로 적을 강타해라','멸마의 성휘'),(12,4,'light2',7,180,'빛의 권능을 내 손에, 태양과 달, 별들의 힘을 모아, 적들에게 심판을 내려라','광휘의 섬광'),(13,5,'dark1',12,300,'어둠보다 어두운 자여, 심연 깊은 곳에서 우리를 올려다보는 자여, 한 점 빛조차 허락하지 않는 어둠을 내보여 그 공포로 영혼까지 떨게 하라','무광의 심연'),(14,5,'dark2',9,230,'끌어당겨라 ,집어삼켜라, 빛을 질투하는 어둠이여, 게걸스럽게 탐하여 모든것을 빼앗아라','탐닉의 심연');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-04  9:15:45
