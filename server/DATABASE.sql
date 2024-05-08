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
INSERT INTO `Accounts` VALUES (123,'example@example.com','password123','example_user','http://example.com/avatar.jpg'),(1688181116086,'quang@gmail.com','123456','quang','/static/media/quang.ef9fa4a0778968a5548c.jpg'),(1688181141478,'nguyet@gmail.com','123456','nguyet','/static/media/nguyet.b8f537e70209afcf1f9e.jpg'),(1688181167199,'hieu@gmail.com','123456','hieu','/static/media/hieu.04ddde8f6f214145ea6a.jpg'),(1688224560728,'linh@gmail.com','123456','linh','/static/media/linh.8d8bcf716640137b0414.png'),(1688224594942,'hung@gmail.com','123456','hung','/static/media/img6.812d5cd63108669d2102.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=1688227044865 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1688224797315,'Ôn thi JLPT N2','calendar1','2023-05-01 15:18:27','2023-06-30 15:48:27','target','<ul><li>Nghe hiểu: 40/60</li><li>Đọc hiểu: 40/60</li><li>Từ vựng: 50/60</li></ul>','Ready',1688181141478,NULL),(1688224990109,'Làm bài 2 dokkai','calendar1','2023-05-10 00:21:12','2023-05-10 01:51:12','todo','<ol><li>Đạt mục tiêu 40/60</li><br></ol>','Done',1688181141478,1688224797315),(1688225062681,'Làm bài 3 choukai','calendar1','2023-05-10 02:23:14','2023-05-10 03:53:14','todo','<ul><li>Đạt 30/40</li><br></ul>','Done',1688224594942,1688224797315),(1688225141821,'Làm đề thi thử N2','calendar1','2023-05-10 13:24:29','2023-05-10 14:54:29','todo','<ul><li>Đạt 120/180</li><br></ul>','In Progress',1688181141478,1688224797315),(1688225588184,'BTL ITSS','calendar1','2023-07-01 15:29:33','2023-07-20 16:59:33','target','<p><span style=\"color: rgb(255, 0, 0);\">Nhóm bài tập lớn ITSS:&nbsp;</span></p><ol><li>Đề bài:&nbsp;</li>Bạn được giao thiết kế và xây dựng ứng dụng quản lý chấm công nhân viên cho các doanh nghiệp sản xuất. Có hai loại nhân viên: công nhân (Worker) và nhân viên văn phòng (Officer). Nhân viên có thông tin cơ bản là họ tên, mã nhân viên, tên bộ phận làm việc (department). Tất cả công nhân thuộc nhánh bộ phận“Nhà máy sản xuất”. Nhân viên văn phòng thuộc các nhánh khác. Những thông tin này được lấy từ API hệ thống quản lý nhân sự.<li>Mục tiêu:&nbsp;</li></ol><ul><li>Hoàn thành sản phẩm đúng hạn 20/7</li><br></ul>','Ready',1688181141478,NULL),(1688226018260,'Đặc tả usecase','calendar1','2023-07-01 15:00:19','2023-07-01 16:09:19','todo','<p><br></p>','Ready',1688181141478,1688225588184),(1688226249088,'Vẽ sơ đồ trình tự','calendar1','2023-07-07 13:43:23','2023-07-07 16:13:23','todo','','Ready',1688181141478,1688225588184),(1688226696262,'BTL UI UX','calendar1','2023-07-01 15:49:08','2023-09-01 16:19:08','target','<p>Nhóm bài tập lớn UX UI:</p><ol><li>Mục tiêu: đạt 9/10</li></ol>','Ready',1688181141478,NULL),(1688226743960,'Tạo tài liệu đặc tả yêu cầu','calendar1','2023-07-10 12:51:41','2023-07-10 16:21:41','todo','','Ready',1688181141478,1688226696262),(1688226792253,'Thu thập yêu cầu người dùng','calendar1','2023-07-04 03:52:31','2023-07-04 13:22:31','todo','','Ready',1688181141478,1688226696262),(1688226867487,'Tạo wireframe','calendar1','2023-07-07 16:05:52','2023-07-08 00:35:52','todo','','Ready',1688181141478,1688226696262),(1688226915186,'Thiết kế giao diện','calendar1','2023-07-10 16:10:01','2023-07-15 17:40:01','todo','','Ready',1688181141478,1688226696262),(1688226997645,'Thiết kế UI với đúng guideline','calendar1','2023-07-08 16:15:34','2023-07-10 16:45:34','todo','','Ready',1688181141478,1688226696262),(1688227044795,'Review UI','calendar1','2023-07-16 16:20:19','2023-07-20 16:50:19','todo','','Ready',1688181141478,1688226696262),(1688227044796,'New Event Name','new_calendar_id','2024-05-01 08:00:00','2024-05-02 08:00:00','todo','Updated event description','Updated Status',123456789,987654321),(1688227044797,'Event Test','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688181141478,1688226696262),(1688227044809,'New Event Name','new_calendar_id','2024-05-01 08:00:00','2024-05-02 08:00:00','todo','Updated event description','Updated Status',123456789,987654321),(1688227044815,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224560728,1688226696262),(1688227044816,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224560728,1688226696262),(1688227044817,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224594942,1688226696262),(1688227044818,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224594942,1688226696262),(1688227044820,'Event Testtttttttt','calendar1','2023-05-01 15:18:27','2023-05-01 15:18:28','todo','','Ready',1688224594942,1688226696262),(1688227044821,'Event test important','calendar1','2023-05-01 12:18:27','2023-05-01 15:18:30','todo','','Ready',1688181141478,1688226696262),(1688227044822,'Event test important','calendar1','2023-05-01 12:18:27','2023-05-01 15:18:30','todo','','Ready',1688181141478,1688226696262),(1688227044823,'ddd','calendar1','2024-05-04 16:25:38','2024-05-04 16:55:38','todo','<p>aaa</p>','Ready',1688181141478,NULL),(1688227044824,'test helper','calendar1','2024-05-04 16:51:19','2024-05-04 17:21:19','todo','<p>aaaa</p>','Ready',1688181141478,NULL),(1688227044825,'test helper','calendar1','2024-05-04 16:52:05','2024-05-04 17:22:05','todo','<p>aaaaa</p>','Ready',1688181141478,NULL),(1688227044826,'helperss','calendar1','2024-05-14 00:00:00','2024-05-14 00:30:00','todo','<p>qqqq</p>','Ready',1688181167199,NULL),(1688227044827,'test helper create','calendar1','2024-05-04 17:09:51','2024-05-04 17:39:51','todo','<p>mmmm</p>','Ready',1688181167199,NULL),(1688227044828,'aaaa','calendar1','2024-05-04 17:10:47','2024-05-04 17:40:47','target','<p>cccc</p>','Ready',1688181167199,NULL),(1688227044829,'wwwww','calendar1','2024-05-04 17:13:00','2024-05-04 17:43:00','todo','<p>qqqqq</p>','Ready',1688181167199,1688227044828),(1688227044830,'ddd','calendar1','2024-05-10 00:00:00','2024-05-10 00:30:00','todo','<p>aaafff</p>','Ready',1688181167199,1688227044828),(1688227044831,'dddd','calendar1','2024-05-26 00:00:00','2024-05-26 00:30:00','todo','<p>dddd</p>','Ready',1688181167199,NULL),(1688227044832,'zaa','calendar1','2024-05-19 00:00:00','2024-05-19 00:30:00','todo','<p><br></p>','Ready',1688181167199,NULL),(1688227044833,'test helper linh','calendar1','2024-05-04 23:33:43','2024-05-05 00:03:43','todo','<p>aaaa</p>','Ready',1688181141478,NULL),(1688227044834,'test linh','calendar1','2024-05-04 23:35:20','2024-05-05 00:05:20','todo','<p>aaa</p>','Ready',1688181141478,NULL),(1688227044835,'aaa','calendar1','2024-05-04 23:36:08','2024-05-05 00:06:08','todo','<p>ddd</p>','Ready',1688181141478,NULL),(1688227044836,'aaa','calendar1','2024-05-05 00:04:53','2024-05-05 00:34:53','todo','<p>sss</p>','Ready',1688181141478,NULL),(1688227044837,'ddd','calendar1','2024-05-05 00:06:05','2024-05-05 00:36:05','todo','<p>ddd</p>','Ready',1688181141478,NULL),(1688227044838,'test','calendar1','2024-05-05 00:20:21','2024-05-05 00:50:21','todo','<p>a</p>','Ready',1688181141478,NULL),(1688227044839,'d','calendar1','2024-05-05 00:21:05','2024-05-05 00:51:05','todo','<p>d</p>','Ready',1688181141478,NULL),(1688227044840,'s','calendar1','2024-05-05 00:23:47','2024-05-05 00:53:47','todo','<p>s</p>','Ready',1688181141478,NULL),(1688227044841,'l','calendar1','2024-05-05 00:25:40','2024-05-05 00:55:40','todo','','Ready',1688181141478,NULL),(1688227044842,'dddd','calendar1','2024-05-05 00:26:41','2024-05-05 00:56:41','todo','<p>a</p>','Ready',1688181141478,NULL),(1688227044843,'aaa','calendar1','2024-05-05 00:32:10','2024-05-05 01:02:10','todo','<p>aaa</p>','Ready',1688181141478,NULL),(1688227044844,'test helper linh','calendar1','2024-05-05 00:32:42','2024-05-05 01:02:42','todo','<p>aaaa</p>','Ready',1688181141478,NULL),(1688227044845,'test helper nguyet','calendar1','2024-05-05 20:40:26','2024-05-05 21:10:26','todo','<p>test helper nguyet</p>','Ready',1688181141478,1688226696262),(1688227044846,'hieu gui nguyet','calendar1','2024-05-05 22:07:44','2024-05-05 22:37:44','todo','<p>hieu gui nguyet</p>','Ready',1688181167199,NULL),(1688227044847,'hieu gui nguyet2','calendar1','2024-05-05 22:08:24','2024-05-05 22:38:24','todo','<p>hieu gui nguyet</p>','Ready',1688181167199,NULL),(1688227044848,'test noti','calendar1','2024-05-05 23:36:43','2024-05-06 00:06:43','todo','<p>test noti</p>','Ready',1688181141478,NULL),(1688227044849,'nguyettesthung','calendar1','2024-05-05 23:56:50','2024-05-06 00:26:50','todo','<p>nguyettesthung</p>','Ready',1688181141478,NULL),(1688227044850,'nguyettestHung2','calendar1','2024-05-05 23:57:46','2024-05-06 00:27:46','todo','<p>nguyettestHung2</p>','Ready',1688181141478,NULL),(1688227044851,'socket','calendar1','2024-05-06 00:01:42','2024-05-06 00:31:42','todo','<p>socket</p>','Ready',1688181141478,NULL),(1688227044852,'socket2','calendar1','2024-05-06 00:02:13','2024-05-06 00:32:13','todo','<p>socket2</p>','Ready',1688181141478,NULL),(1688227044853,'quang test nguyet','calendar1','2024-05-06 00:11:09','2024-05-06 00:41:09','todo','<p>quang test nguyet</p>','Ready',1688181116086,NULL),(1688227044854,'nguyet test Quang','calendar1','2024-05-06 00:16:14','2024-05-06 00:46:14','todo','<p>nguyet test Quang</p>','Ready',1688181141478,NULL),(1688227044855,'Nnguyet test Quang2','calendar1','2024-05-06 00:16:45','2024-05-06 00:46:45','todo','<p>nguyet test Quang</p>','Ready',1688181141478,NULL),(1688227044856,'nguyet test Quang 3','calendar1','2024-05-06 00:19:28','2024-05-06 00:49:28','todo','<p>nguyet test Quang 3</p>','Ready',1688181141478,NULL),(1688227044857,'nguyet test Quang 4','calendar1','2024-05-06 00:20:39','2024-05-06 00:50:39','todo','<p>nguyet test Quang 4</p>','Ready',1688181141478,NULL),(1688227044858,'nguyet test realtime noti Hung','calendar1','2024-05-07 17:44:57','2024-05-07 18:14:57','todo','<p>nguyet test realtime noti Hung</p>','Ready',1688181141478,NULL),(1688227044859,'hung test Nguyet','calendar1','2024-05-07 17:45:59','2024-05-07 18:15:59','todo','<p>hung test Nguyet</p>','Ready',1688224594942,NULL),(1688227044860,'hung test Nguyet2','calendar1','2024-05-07 17:46:36','2024-05-07 18:16:36','todo','<p>hung test Nguyet2</p>','Ready',1688224594942,NULL),(1688227044861,'Nguyet Hung','calendar1','2024-05-07 17:47:44','2024-05-07 18:17:44','todo','<p>Nguyet Hung</p>','Ready',1688181141478,NULL),(1688227044862,'NguyetHung2','calendar1','2024-05-07 17:52:01','2024-05-07 18:22:01','todo','<p>NguyetHung2</p>','Ready',1688181141478,NULL),(1688227044863,'NguyetHung3','calendar1','2024-05-07 17:52:27','2024-05-07 18:22:27','todo','<p>NguyetHung3</p>','Ready',1688181141478,NULL),(1688227044864,'Nguyet gui Hung','calendar1','2024-05-07 18:00:35','2024-05-07 18:30:35','todo','<p>Nguyet gui Hung</p>','Ready',1688181141478,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Helpers`
--

LOCK TABLES `Helpers` WRITE;
/*!40000 ALTER TABLE `Helpers` DISABLE KEYS */;
INSERT INTO `Helpers` VALUES (20,1688224560728,1688227044820),(21,1688224594942,1688227044822),(23,1688224560728,1688227044825),(24,1688181141478,1688227044832),(25,1688181141478,1688227044832),(26,1688181141478,1688227044832),(27,1688181141478,1688227044832),(28,1688181141478,1688227044826),(29,1688181141478,1688227044832),(30,1688181141478,1688227044826),(31,1688181141478,1688227044832),(32,1688181141478,1688227044826),(33,1688181141478,1688227044832),(34,1688181141478,1688227044828),(35,1688181141478,1688227044832),(36,1688224560728,1688227044844),(37,1688181141478,1688227044845),(38,1688181116086,1688227044856);
/*!40000 ALTER TABLE `Helpers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Importants`
--

DROP TABLE IF EXISTS `Importants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Importants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `eventId` bigint NOT NULL,
  `userId` bigint NOT NULL,
  `isImportant` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_event_important` (`eventId`),
  KEY `fk_user_important` (`userId`),
  CONSTRAINT `fk_event_important` FOREIGN KEY (`eventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_important` FOREIGN KEY (`userId`) REFERENCES `Accounts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Importants`
--

LOCK TABLES `Importants` WRITE;
/*!40000 ALTER TABLE `Importants` DISABLE KEYS */;
INSERT INTO `Importants` VALUES (1,1688227044822,1688181141478,0),(2,1688227044823,1688181141478,0),(3,1688227044825,1688181141478,0),(4,1688227044826,1688181167199,0),(5,1688227044827,1688181167199,0),(6,1688227044828,1688181167199,0),(7,1688227044829,1688181167199,0),(8,1688227044831,1688181167199,0),(9,1688227044832,1688181167199,0),(10,1688227044833,1688181141478,0),(11,1688227044834,1688181141478,0),(12,1688227044835,1688181141478,0),(13,1688227044836,1688181141478,0),(14,1688227044837,1688181141478,0),(15,1688227044838,1688181141478,0),(16,1688227044839,1688181141478,0),(17,1688227044840,1688181141478,0),(18,1688227044841,1688181141478,0),(19,1688227044842,1688181141478,0),(20,1688227044843,1688181141478,0),(21,1688227044844,1688181141478,0),(22,1688227044845,1688181141478,0),(23,1688227044846,1688181167199,0),(24,1688227044847,1688181167199,0),(25,1688227044848,1688181141478,0),(26,1688227044849,1688181141478,0),(27,1688227044850,1688181141478,0),(28,1688227044851,1688181141478,0),(29,1688227044852,1688181141478,0),(30,1688227044853,1688181116086,0),(31,1688227044854,1688181141478,0),(32,1688227044855,1688181141478,0),(33,1688227044856,1688181141478,0),(34,1688227044857,1688181141478,0),(35,1688227044858,1688181141478,0),(36,1688227044859,1688224594942,0),(37,1688227044860,1688224594942,0),(38,1688227044861,1688181141478,0),(39,1688227044862,1688181141478,0),(40,1688227044863,1688181141478,0),(41,1688227044864,1688181141478,0);
/*!40000 ALTER TABLE `Importants` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=1688226075799 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifies`
--

LOCK TABLES `Notifies` WRITE;
/*!40000 ALTER TABLE `Notifies` DISABLE KEYS */;
INSERT INTO `Notifies` VALUES (1688225588186,'hung@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,1),(1688225588189,'hieu@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,0),(1688225588190,'quang@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,1),(1688225588191,'nguyet@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,0),(1688226018262,'hung@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226018263,'linh@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226075763,'hieu@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226075762,1),(1688226075765,'updated_receiver@example.com','updated_sender@example.com','This is an updated notification',1,456,1),(1688226075766,'hieu@gmail.com','1688181141478','You have been invited to join the event test helper',0,1688227044825,0),(1688226075767,'linh@gmail.com','1688181141478','You have been invited to join the event test helper',0,1688227044825,0),(1688226075768,'hung@gmail.com','1688181167199','assigned you join target helperss',0,1688227044826,0),(1688226075769,'nguyet@gmail.com','1688181167199','assigned you join target helperss',1,1688227044826,0),(1688226075770,'linh@gmail.com','1688181167199','assigned you join target helperss',0,1688227044826,0),(1688226075771,'nguyet@gmail.com','[object Object]','assigned you join target aaaa',1,1688227044828,1),(1688226075772,'linh@gmail.com','[object Object]','assigned you join target wwwww',0,1688227044829,0),(1688226075773,'hung@gmail.com',NULL,'assigned you join target dddd',0,1688227044831,0),(1688226075774,'nguyet@gmail.com','hieu@gmail.com','assigned you join target zaa',1,1688227044832,1),(1688226075775,'linh@gmail.com','nguyet@gmail.com','assigned you join target test helper linh',0,1688227044833,0),(1688226075776,'linh@gmail.com','nguyet@gmail.com','assigned you join target test linh',0,1688227044834,0),(1688226075777,'linh@gmail.com','nguyet@gmail.com','assigned you join target test',0,1688227044838,0),(1688226075778,'linh@gmail.com','nguyet@gmail.com','assigned you join target test helper linh',1,1688227044844,1),(1688226075779,'nguyet@gmail.com','nguyet@gmail.com','assigned you join target test helper nguyet',1,1688227044845,1),(1688226075780,'nguyet@gmail.com','hieu@gmail.com','assigned you join target hieu gui nguyet',0,1688227044846,0),(1688226075781,'nguyet@gmail.com','hieu@gmail.com','assigned you join target hieu gui nguyet2',0,1688227044847,0),(1688226075782,'linh@gmail.com','nguyet@gmail.com','assigned you join target test noti',0,1688227044848,0),(1688226075783,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyettesthung',0,1688227044849,0),(1688226075784,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyettestHung2',0,1688227044850,0),(1688226075785,'hung@gmail.com','nguyet@gmail.com','assigned you join target socket',0,1688227044851,0),(1688226075786,'hung@gmail.com','nguyet@gmail.com','assigned you join target socket2',0,1688227044852,0),(1688226075787,'nguyet@gmail.com','quang@gmail.com','assigned you join target quang test nguyet',0,1688227044853,0),(1688226075788,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang',0,1688227044854,0),(1688226075789,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nnguyet test Quang2',0,1688227044855,0),(1688226075790,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang 3',1,1688227044856,1),(1688226075791,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang 4',0,1688227044857,0),(1688226075792,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyet test realtime noti Hung',0,1688227044858,0),(1688226075793,'nguyet@gmail.com','hung@gmail.com','assigned you join target hung test Nguyet',0,1688227044859,0),(1688226075794,'nguyet@gmail.com','hung@gmail.com','assigned you join target hung test Nguyet2',0,1688227044860,0),(1688226075795,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet Hung',0,1688227044861,0),(1688226075796,'hung@gmail.com','nguyet@gmail.com','assigned you join target NguyetHung2',0,1688227044862,0),(1688226075797,'hung@gmail.com','nguyet@gmail.com','assigned you join target NguyetHung3',0,1688227044863,0),(1688226075798,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet gui Hung',0,1688227044864,0);
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

-- Dump completed on 2024-05-08 15:56:16
