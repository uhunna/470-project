CREATE DATABASE  IF NOT EXISTS `habitforge` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `habitforge`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: habitforge
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` text,
  `created_by` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `created_by_idx` (`created_by`),
  CONSTRAINT `created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (1,'30 Days of Fitness','Commit to 30 days of consistent workouts.',1),(2,'123r','1223rd',1),(3,'test challenge','test challenge',1),(4,'Test Challenge','This is a test challenge.',13),(5,'My First Challenge','This is a test challenge.',13),(6,'bb','bbb',13);
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_checklist`
--

DROP TABLE IF EXISTS `daily_checklist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_checklist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `habit_id` int NOT NULL,
  `date` date NOT NULL,
  `is_completed` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `habit_id_idx` (`habit_id`),
  CONSTRAINT `habit_id` FOREIGN KEY (`habit_id`) REFERENCES `habits` (`hid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_checklist`
--

LOCK TABLES `daily_checklist` WRITE;
/*!40000 ALTER TABLE `daily_checklist` DISABLE KEYS */;
INSERT INTO `daily_checklist` VALUES (2,8,'2024-12-31',1);
/*!40000 ALTER TABLE `daily_checklist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `id` int NOT NULL AUTO_INCREMENT,
  `requester_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `requester_id` (`requester_id`),
  KEY `receiver_id` (`receiver_id`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`requester_id`) REFERENCES `user` (`id`),
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (1,1,2,'pending','2024-12-22 23:57:18'),(2,5,2,'pending','2024-12-22 23:57:37'),(3,5,3,'pending','2024-12-23 00:40:11'),(4,10,5,'pending','2024-12-28 09:26:07'),(5,5,9,'pending','2024-12-28 10:11:24');
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goals`
--

DROP TABLE IF EXISTS `goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `streak` int NOT NULL,
  `habit_id` int NOT NULL,
  PRIMARY KEY (`id`,`habit_id`),
  KEY `hid_idx` (`habit_id`),
  CONSTRAINT `hid` FOREIGN KEY (`habit_id`) REFERENCES `habits` (`hid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goals`
--

LOCK TABLES `goals` WRITE;
/*!40000 ALTER TABLE `goals` DISABLE KEYS */;
/*!40000 ALTER TABLE `goals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habits`
--

DROP TABLE IF EXISTS `habits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habits` (
  `hid` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `habit_name` varchar(45) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` date NOT NULL,
  `category` varchar(45) NOT NULL DEFAULT 'Miscellaneous',
  PRIMARY KEY (`hid`),
  UNIQUE KEY `hid_UNIQUE` (`hid`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habits`
--

LOCK TABLES `habits` WRITE;
/*!40000 ALTER TABLE `habits` DISABLE KEYS */;
INSERT INTO `habits` VALUES (4,12,'read','20 mins','2025-01-01','Productivity'),(8,1,'exercise','30 mins every day','2024-12-24','Health'),(9,1,'Exercise','Morning workout routine','2024-12-31','Health'),(10,1,'Exercise','Morning workout routine','2024-12-31','Health'),(11,13,'run','exist','2025-01-03','exercise'),(12,13,'run','jkj','2025-01-03','exercise'),(13,13,'run','wwwww','2025-01-03','ww2'),(14,13,'run','bbb','2025-01-03','nnn'),(15,13,'run','ki','2025-01-03','lp'),(16,13,'run','bb','2025-01-03','nn'),(17,13,'runut','kkkkkkkkkk','2025-01-03','nn'),(19,13,'running','Everyday for atleast 30 minutes','2025-01-03','Health');
/*!40000 ALTER TABLE `habits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaderboard`
--

DROP TABLE IF EXISTS `leaderboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaderboard` (
  `lid` int NOT NULL AUTO_INCREMENT,
  `lchallenge_id` int NOT NULL,
  `luser_id` int NOT NULL,
  PRIMARY KEY (`lid`),
  UNIQUE KEY `lid_UNIQUE` (`lid`),
  KEY `lchallenge_id_idx` (`lchallenge_id`),
  KEY `luser_id_idx` (`luser_id`),
  CONSTRAINT `lchallenge_id` FOREIGN KEY (`lchallenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `luser_id` FOREIGN KEY (`luser_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaderboard`
--

LOCK TABLES `leaderboard` WRITE;
/*!40000 ALTER TABLE `leaderboard` DISABLE KEYS */;
/*!40000 ALTER TABLE `leaderboard` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john_doe','john','johndoe@example.com','john01'),(2,'nacy123','Nancy','nancy@gmail.com','nancy2'),(3,'nancy234','nancy','nanc12y@gmail.com','nancy3'),(4,'somiya15','Somiya','somiya@abc','$2a$10$mIPPqAGrd4eiEqXMrMFCae3GvM0mp25kZBVlYsnw8adka//0Yp65.'),(5,'test','test','test@gmail.com','$2a$10$hPOu6.iCdVItGBZZMXIr3.uaegl9UqBTo0UAyr/Qnx7.8gUbJ/ULS'),(6,'test2','test2','test2@gmail.com','$2a$10$W2e4j2x/THycN/SEJ7GgLeOQGdYwR9q/Um2rm8bfMnwUv8HQerMR6'),(7,'prosoon06','Prachi Prosoon','prosoon@gmail.com','$2a$10$zWqyV7B528ei0AwkKK2HvePU9igyojNuhwukY5k7h2OMD9UW66Dxy'),(8,'test3','test3','ptest3@abs','$2a$10$PZ5xByHzZosORQL2QwhzQOrJqxppDEYSdhBQctJPSgNk0PHREXlEm'),(9,'test4','test4','test4@abc','$2a$10$NlBq/DBSm.eBrrv8/k0T9eHe88ny1NrOeuycni8q.d1ocMRLQWEvu'),(10,'test5','test5','test5@gnail.com','$2a$10$t49k7KJvlP66UEm6vtSVse2VzUeXpfLIggAw3KiJr/UFKtPRkkVQC'),(11,'uhunna','hunna','hunna@gmail.com','$2a$10$fpB96utcgeh.U1vkfpktJuHvGGwvuVx1WswXOWNwFO4rx.wmxVMRm'),(12,'jojo','jojo00','jojo@gmail.com','$2a$10$YKiSN.z8xgwyvo2f2EJBE.4wLoOvZ9x7lqAm1Gh4rYY5.It4cFh6O'),(13,'uiui','uiui','uiui@gmail.com','$2a$10$/08pG9lwlmmDNBp3NrMAvuHthiifvH7XE0/JDMNJdOPtoqUi6hKMu');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_challenges`
--

DROP TABLE IF EXISTS `user_challenges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_challenges` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cha_user_id` int NOT NULL,
  `challenge_id` int NOT NULL,
  `progress` int DEFAULT NULL,
  `point` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `cha_user_id_idx` (`cha_user_id`),
  KEY `challenge_id_idx` (`challenge_id`),
  CONSTRAINT `cha_user_id` FOREIGN KEY (`cha_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `challenge_id` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_challenges`
--

LOCK TABLES `user_challenges` WRITE;
/*!40000 ALTER TABLE `user_challenges` DISABLE KEYS */;
INSERT INTO `user_challenges` VALUES (1,13,1,NULL,0),(2,13,2,NULL,0),(3,13,1,NULL,0),(4,13,1,NULL,0),(5,13,1,NULL,0);
/*!40000 ALTER TABLE `user_challenges` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-08 16:37:04
