-- MySQL dump 10.13  Distrib 8.0.36, for macos14 (arm64)
--
-- Host: 127.0.0.1    Database: main
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `Accounts`
--

DROP TABLE IF EXISTS `Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Accounts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1688224594943 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Accounts`
--

LOCK TABLES `Accounts` WRITE;
/*!40000 ALTER TABLE `Accounts` DISABLE KEYS */;
INSERT INTO `Accounts` VALUES (123,'example@example.com','password123','example_user','http://example.com/avatar.jpg'),(1688181116086,'quang@gmail.com','123456','quang','/static/media/quang.ef9fa4a0778968a5548c.jpg'),(1688181141478,'nguyet@gmail.com','123456','nguyet','/static/media/nguyet.b8f537e70209afcf1f9e.jpg'),(1688181167199,'hieu@gmail.com','123456','hieu','/static/media/hieu.04ddde8f6f214145ea6a.jpg'),(1688224560728,'linh@gmail.com','123456','linh','/static/media/linh.8d8bcf716640137b0414.png'),(1688224594942,'hung@gmail.com','123456','Đinh Văn Hùng','/static/media/img6.812d5cd63108669d2102.png');
/*!40000 ALTER TABLE `Accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint DEFAULT NULL,
  `eventId` bigint DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Accounts` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,1688181141478,1688226018260,'alo','2024-04-23 04:11:46'),(2,1688181141478,1688226018260,'Nội dung bình luận','2024-04-23 04:33:16'),(3,1688181141478,1688226018260,'Hello','2024-04-23 04:40:35'),(4,1688181141478,1688226018260,'Lam ki di','2024-04-23 04:55:10'),(5,1688181141478,1688226018260,'Nội dung bình luận 2','2024-04-29 14:04:39'),(6,1688181141478,1688226018260,'Nội dung bình luận 2','2024-04-29 15:20:42');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Events`
--

DROP TABLE IF EXISTS `Events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `eventName` varchar(255) DEFAULT NULL,
  `calendarId` varchar(255) DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `eventType` varchar(255) DEFAULT NULL,
  `description` text,
  `status` varchar(255) DEFAULT NULL,
  `creatorId` bigint DEFAULT NULL,
  `target` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1688227044821 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1688224797315,'Ôn thi JLPT N2','calendar1','2023-05-01 15:18:27','2023-06-30 15:48:27','target','<ul><li>Nghe hiểu: 40/60</li><li>Đọc hiểu: 40/60</li><li>Từ vựng: 50/60</li></ul>','Ready',1688181141478,NULL),(1688224990109,'Làm bài 2 dokkai','calendar1','2023-05-10 00:21:12','2023-05-10 01:51:12','todo','<ol><li>Đạt mục tiêu 40/60</li><br></ol>','Done',1688181141478,1688224797315),(1688225062681,'Làm bài 3 choukai','calendar1','2023-05-10 02:23:14','2023-05-10 03:53:14','todo','<ul><li>Đạt 30/40</li><br></ul>','Done',1688224594942,1688224797315),(1688225141821,'Làm đề thi thử N2','calendar1','2023-05-10 13:24:29','2023-05-10 14:54:29','todo','<ul><li>Đạt 120/180</li><br></ul>','In Progress',1688181141478,1688224797315),(1688225588184,'BTL ITSS','calendar1','2023-07-01 15:29:33','2023-07-20 16:59:33','target','<p><span style=\"color: rgb(255, 0, 0);\">Nhóm bài tập lớn ITSS:&nbsp;</span></p><ol><li>Đề bài:&nbsp;</li>Bạn được giao thiết kế và xây dựng ứng dụng quản lý chấm công nhân viên cho các doanh nghiệp sản xuất. Có hai loại nhân viên: công nhân (Worker) và nhân viên văn phòng (Officer). Nhân viên có thông tin cơ bản là họ tên, mã nhân viên, tên bộ phận làm việc (department). Tất cả công nhân thuộc nhánh bộ phận“Nhà máy sản xuất”. Nhân viên văn phòng thuộc các nhánh khác. Những thông tin này được lấy từ API hệ thống quản lý nhân sự.<li>Mục tiêu:&nbsp;</li></ol><ul><li>Hoàn thành sản phẩm đúng hạn 20/7</li><br></ul>','Ready',1688181141478,NULL),(1688226018260,'Đặc tả usecase','calendar1','2023-07-01 15:00:19','2023-07-01 16:09:19','todo','<p><br></p>','Ready',1688181141478,1688225588184),(1688226249088,'Vẽ sơ đồ trình tự','calendar1','2023-07-07 13:43:23','2023-07-07 16:13:23','todo','','Ready',1688181141478,1688225588184),(1688226696262,'BTL UI UX','calendar1','2023-07-01 15:49:08','2023-09-01 16:19:08','target','<p>Nhóm bài tập lớn UX UI:</p><ol><li>Mục tiêu: đạt 9/10</li></ol>','Ready',1688181141478,NULL),(1688226743960,'Tạo tài liệu đặc tả yêu cầu','calendar1','2023-07-10 12:51:41','2023-07-10 16:21:41','todo','','Ready',1688181141478,1688226696262),(1688226792253,'Thu thập yêu cầu người dùng','calendar1','2023-07-04 03:52:31','2023-07-04 13:22:31','todo','','Ready',1688181141478,1688226696262),(1688226867487,'Tạo wireframe','calendar1','2023-07-07 16:05:52','2023-07-08 00:35:52','todo','','Ready',1688181141478,1688226696262),(1688226915186,'Thiết kế giao diện','calendar1','2023-07-10 16:10:01','2023-07-15 17:40:01','todo','','Ready',1688181141478,1688226696262),(1688226997645,'Thiết kế UI với đúng guideline','calendar1','2023-07-08 16:15:34','2023-07-10 16:45:34','todo','','Ready',1688181141478,1688226696262),(1688227044795,'Review UI','calendar1','2023-07-16 16:20:19','2023-07-20 16:50:19','todo','','Ready',1688181141478,1688226696262),(1688227044796,'New Event Name','new_calendar_id','2024-05-01 08:00:00','2024-05-02 08:00:00','todo','Updated event description','Updated Status',123456789,987654321),(1688227044797,'Event Test','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688181141478,1688226696262),(1688227044809,'New Event Name','new_calendar_id','2024-05-01 08:00:00','2024-05-02 08:00:00','todo','Updated event description','Updated Status',123456789,987654321),(1688227044815,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224560728,1688226696262),(1688227044816,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224560728,1688226696262),(1688227044817,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224594942,1688226696262),(1688227044818,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224594942,1688226696262),(1688227044820,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224594942,1688226696262);
/*!40000 ALTER TABLE `Events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Helpers`
--

DROP TABLE IF EXISTS `Helpers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Helpers` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `userId` bigint NOT NULL,
  `eventId` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user` (`userId`),
  KEY `fk_event` (`eventId`),
  CONSTRAINT `fk_event` FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `Accounts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Helpers`
--

LOCK TABLES `Helpers` WRITE;
/*!40000 ALTER TABLE `Helpers` DISABLE KEYS */;
INSERT INTO `Helpers` VALUES (20,1688224560728,1688227044820);
/*!40000 ALTER TABLE `Helpers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notifies`
--

DROP TABLE IF EXISTS `Notifies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notifies` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `toMail` varchar(255) DEFAULT NULL,
  `fromMail` varchar(255) DEFAULT NULL,
  `text` text,
  `isResolve` tinyint(1) DEFAULT NULL,
  `eventId` bigint DEFAULT NULL,
  `isAccept` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1688226075766 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifies`
--

LOCK TABLES `Notifies` WRITE;
/*!40000 ALTER TABLE `Notifies` DISABLE KEYS */;
INSERT INTO `Notifies` VALUES (1688225588186,'hung@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,1),(1688225588189,'hieu@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,0),(1688225588190,'quang@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,1),(1688225588191,'nguyet@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,0),(1688226018262,'hung@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226018263,'linh@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226075763,'hieu@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226075762,1),(1688226075765,'updated_receiver@example.com','updated_sender@example.com','This is an updated notification',1,456,1);
/*!40000 ALTER TABLE `Notifies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-01 18:20:26
