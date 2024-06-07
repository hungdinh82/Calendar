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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,1688181141478,1688226018260,'alo','2024-04-23 04:11:46'),(2,1688181141478,1688226018260,'Nội dung bình luận','2024-04-23 04:33:16'),(3,1688181141478,1688226018260,'Hello','2024-04-23 04:40:35'),(4,1688181141478,1688226018260,'Lam ki di','2024-04-23 04:55:10'),(5,1688181141478,1688226018260,'Nội dung bình luận 2','2024-04-29 14:04:39'),(6,1688181141478,1688226018260,'Nội dung bình luận 2','2024-04-29 15:20:42'),(7,1688181141478,1688227044869,'aaaa','2024-05-18 17:22:50'),(8,1688181141478,1688227044869,'bbb','2024-05-18 17:26:36'),(9,1688181141478,1688227044866,'eeee','2024-05-18 17:28:10'),(10,1688224594942,1688227044901,'ddddd','2024-05-18 17:28:31'),(14,1688181141478,NULL,'hhh','2024-05-18 19:44:31'),(15,1688181141478,NULL,'sddds','2024-05-18 19:48:45'),(16,1688181141478,1688224797315,'alo','2024-05-21 10:45:01'),(17,1688181141478,1688227044907,'hung a','2024-05-21 10:45:34'),(18,1688224594942,1688227044907,'u Hung day','2024-05-21 10:45:54'),(19,1688181141478,1688227044907,'i','2024-05-21 10:47:13');
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
) ENGINE=InnoDB AUTO_INCREMENT=1688227044920 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1688224797315,'Ôn thi JLPT N2','calendar1','2023-05-01 15:18:27','2023-06-30 15:48:27','target','<ul><li>Nghe hiểu: 40/60</li><li>Đọc hiểu: 40/60</li><li>Từ vựng: 50/60</li></ul>','Ready',1688181141478,NULL),(1688224990109,'Làm bài 2 dokkai','calendar1','2023-05-10 00:21:12','2023-05-10 01:51:12','todo','<ol><li>Đạt mục tiêu 40/60</li><br></ol>','Ready',1688181141478,1688224797315),(1688225062681,'Làm bài 3 choukai','calendar1','2023-05-10 02:23:14','2023-05-10 03:53:14','todo','<ul><li>Đạt 30/40</li><br></ul>','In Progress',1688224594942,1688224797315),(1688225141821,'Làm đề thi thử N2','calendar1','2023-05-10 13:24:29','2023-05-10 14:54:29','todo','<ul><li>Đạt 120/180</li><br></ul>','Done',1688181141478,1688224797315),(1688225588184,'BTL ITSS','calendar1','2023-07-01 15:29:33','2023-07-20 16:59:33','target','<p><span style=\"color: rgb(255, 0, 0);\">Nhóm bài tập lớn ITSS:&nbsp;</span></p><ol><li>Đề bài:&nbsp;</li>Bạn được giao thiết kế và xây dựng ứng dụng quản lý chấm công nhân viên cho các doanh nghiệp sản xuất. Có hai loại nhân viên: công nhân (Worker) và nhân viên văn phòng (Officer). Nhân viên có thông tin cơ bản là họ tên, mã nhân viên, tên bộ phận làm việc (department). Tất cả công nhân thuộc nhánh bộ phận“Nhà máy sản xuất”. Nhân viên văn phòng thuộc các nhánh khác. Những thông tin này được lấy từ API hệ thống quản lý nhân sự.<li>Mục tiêu:&nbsp;</li></ol><ul><li>Hoàn thành sản phẩm đúng hạn 20/7</li><br></ul>','Ready',1688181141478,NULL),(1688226018260,'Đặc tả usecase','calendar1','2023-07-01 15:00:19','2023-07-01 16:09:19','todo','<p><br></p>',NULL,1688181141478,1688225588184),(1688226249088,'Vẽ sơ đồ trình tự','calendar1','2023-07-07 13:43:23','2023-07-07 16:13:23','todo','',NULL,1688181141478,1688225588184),(1688226696262,'BTL UI UX','calendar1','2023-07-01 15:49:08','2023-09-01 16:19:08','target','<p>Nhóm bài tập lớn UX UI:</p><ol><li>Mục tiêu: đạt 9/10</li></ol>','Ready',1688181141478,NULL),(1688226743960,'Tạo tài liệu đặc tả yêu cầu','calendar1','2023-07-10 12:51:41','2023-07-10 16:21:41','todo','','Done',1688181141478,1688226696262),(1688226792253,'Thu thập yêu cầu người dùng','calendar1','2023-07-04 03:52:31','2023-07-04 13:22:31','todo','','Ready',1688181141478,1688226696262),(1688226867487,'Tạo wireframe','calendar1','2023-07-07 16:05:52','2023-07-08 00:35:52','todo','','Ready',1688181141478,1688226696262),(1688226915186,'Thiết kế giao diện','calendar1','2023-07-10 16:10:01','2023-07-15 17:40:01','todo','','Ready',1688181141478,1688226696262),(1688226997645,'Thiết kế UI với đúng guideline','calendar1','2023-07-08 16:15:34','2023-07-10 16:45:34','todo','','Ready',1688181141478,1688226696262),(1688227044795,'Review UI','calendar1','2023-07-16 16:20:19','2023-07-20 16:50:19','todo','','Ready',1688181141478,1688226696262),(1688227044866,'Hung moi Nguyet vao team','calendar1','2024-05-11 13:27:32','2024-05-11 13:57:32','todo','<p>Hung moi Nguyet vao team</p>','Ready',1688224594942,NULL),(1688227044867,'Quang tao Helper Nguyet','calendar1','2024-05-11 13:36:51','2024-05-11 14:06:51','todo','<p>Quang tao Helper Nguyet</p>','Ready',1688181116086,NULL),(1688227044868,'Quang gui Nguyet ','calendar1','2024-05-11 13:58:03','2024-05-11 14:28:03','todo','<p>Quang gui Nguyet </p>','Ready',1688181116086,NULL),(1688227044869,'Quang gui Nguyet 2','calendar1','2024-05-11 13:58:38','2024-05-11 14:28:38','todo','<p>Quang gui Nguyet 2</p>','Ready',1688181116086,NULL),(1688227044870,'Nguyet gui Quang 3','calendar1','2024-05-11 14:24:32','2024-05-11 14:54:32','todo','<p>Nguyet gui Quang 3</p>','Ready',1688181141478,NULL),(1688227044871,'Nguyet gui Quang 4','calendar1','2024-05-11 14:25:02','2024-05-11 14:55:02','todo','<p>Nguyet gui Quang 4</p>','Ready',1688181141478,NULL),(1688227044872,'Linh gui Quang socket','calendar1','2024-05-11 14:33:06','2024-05-11 15:03:06','todo','<p>Linh gui Quang socket</p>','Ready',1688224560728,NULL),(1688227044873,'Quang gui Linh 2','calendar1','2024-05-11 14:35:36','2024-05-11 15:05:36','todo','<p>Quang gui Linh 2</p>','Ready',1688181116086,NULL),(1688227044874,'Quang gui Linh 3','calendar1','2024-05-11 14:36:06','2024-05-11 15:06:06','todo','<p>Quang gui Linh 3</p>','Ready',1688181116086,NULL),(1688227044875,'Quang gui Linh 4','calendar1','2024-05-11 14:41:53','2024-05-11 15:11:53','todo','<p>Quang gui Linh 4</p>','Ready',1688181116086,NULL),(1688227044876,'Nguyet tao helper Quang Hieu','calendar1','2024-05-11 16:03:16','2024-05-11 16:33:16','todo','<p>Nguyet tao helper Quang Hieu</p>','Ready',1688181141478,NULL),(1688227044879,'Nguyet add Linh va Hung','calendar1','2024-05-11 18:41:57','2024-05-11 19:11:57','todo','<p>Nguyet add Linh va Hung</p>','Ready',1688181141478,NULL),(1688227044901,'helper Hung','calendar1','2024-05-14 00:29:24','2024-05-14 00:59:24','todo','<p>helper Hung</p>','Ready',1688181141478,NULL),(1688227044905,'todo co Hung2','calendar1','2024-05-14 01:54:36','2024-05-14 02:24:36','todo','<p>todo co Hung2</p>','In Progress',1688181141478,1688227044904),(1688227044907,'add Hung test Noti2','calendar1','2024-05-19 00:36:17','2024-05-19 01:06:17','target','<p>add Hung test Noti2</p>','Ready',1688181141478,1688227044906),(1688227044909,'asd','calendar1','2024-05-19 00:42:08','2024-05-19 01:12:08','todo','<p>asds</p>','Ready',1688181116086,1688227044908),(1688227044910,'addd','calendar1','2024-05-21 17:45:11','2024-05-21 18:15:11','todo','<p><br></p>','Ready',1688181141478,1688227044907),(1688227044911,'addd2','calendar1','2024-05-25 16:34:31','2024-05-25 17:04:31','todo','','Ready',1688181141478,1688227044907),(1688227044912,'aaa','calendar1','2024-05-25 16:38:25','2024-05-25 17:08:25','todo','<p>aaa</p>','Done',1688181141478,1688227044907),(1688227044913,'bbbb','calendar1','2024-05-25 16:43:17','2024-05-25 17:13:17','todo','','Ready',1688181141478,1688227044907),(1688227044914,'aaaaaa','calendar1','2024-05-25 17:30:49','2024-05-25 18:00:49','todo','','Ready',1688224594942,NULL),(1688227044915,'bbbbb','calendar1','2024-05-25 17:30:59','2024-05-25 18:00:59','todo','','Ready',1688224594942,NULL),(1688227044916,'Target co Nguyet le','calendar1','2024-06-02 17:50:00','2024-06-02 18:20:00','target','<p>Target co Nguyet le</p>','Ready',1688224594942,NULL),(1688227044917,'Target co Nguyet le 2','calendar1','2024-06-02 17:50:42','2024-06-02 18:20:42','todo','<p>Target co Nguyet le 2</p>','Ready',1688224594942,NULL),(1688227044918,'Target co Nguyet le 3','calendar1','2024-06-02 17:51:13','2024-06-02 18:21:13','todo','<p>&nbsp;Target co Nguyet le 3</p>','Ready',1688224594942,NULL),(1688227044919,'Nguyet moi Hung 2','calendar1','2024-06-02 17:52:56','2024-06-02 18:22:56','todo','<p>Nguyet moi Hung 2</p>','Ready',1688181141478,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Helpers`
--

LOCK TABLES `Helpers` WRITE;
/*!40000 ALTER TABLE `Helpers` DISABLE KEYS */;
INSERT INTO `Helpers` VALUES (39,1688181141478,1688227044866),(40,1688181141478,1688227044868),(41,1688181141478,1688227044869),(42,1688181116086,1688227044871),(43,1688181116086,1688227044876),(44,1688181167199,1688227044876),(51,1688181116086,1688227044872),(59,1688224594942,1688227044901),(63,1688181141478,1688227044867),(65,1688224594942,1688227044907),(67,1688224594942,1688227044911),(68,1688224594942,1688227044912),(69,1688224594942,1688227044913),(70,1688181141478,1688227044915),(71,1688181141478,1688227044916);
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
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Importants`
--

LOCK TABLES `Importants` WRITE;
/*!40000 ALTER TABLE `Importants` DISABLE KEYS */;
INSERT INTO `Importants` VALUES (43,1688227044866,1688224594942,0),(44,1688227044867,1688181116086,0),(45,1688227044868,1688181116086,0),(46,1688227044869,1688181116086,0),(47,1688227044870,1688181141478,0),(48,1688227044871,1688181141478,0),(49,1688227044872,1688224560728,0),(50,1688227044873,1688181116086,0),(51,1688227044874,1688181116086,0),(52,1688227044875,1688181116086,0),(53,1688227044876,1688181141478,0),(56,1688227044879,1688181141478,0),(78,1688227044901,1688181141478,0),(82,1688227044905,1688181141478,0),(84,1688227044907,1688181141478,1),(86,1688227044909,1688181116086,0),(87,1688227044910,1688181141478,0),(88,1688227044911,1688181141478,0),(89,1688227044912,1688181141478,0),(90,1688227044913,1688181141478,0),(91,1688227044914,1688224594942,0),(92,1688227044915,1688224594942,0),(93,1688227044916,1688224594942,0),(94,1688227044917,1688224594942,0),(95,1688227044918,1688224594942,0),(96,1688227044919,1688181141478,0),(97,1688224797315,1688181141478,1),(98,1688227044916,1688181141478,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=1688226075855 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifies`
--

LOCK TABLES `Notifies` WRITE;
/*!40000 ALTER TABLE `Notifies` DISABLE KEYS */;
INSERT INTO `Notifies` VALUES (1688225588186,'hung@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,1),(1688225588189,'hieu@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,0),(1688225588190,'quang@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,1),(1688225588191,'nguyet@gmail.com','nguyet@gmail.com','assigned you join target',1,1688225588184,0),(1688226018262,'hung@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226018263,'linh@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226075763,'hieu@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226075762,1),(1688226075765,'updated_receiver@example.com','updated_sender@example.com','This is an updated notification',1,456,1),(1688226075774,'nguyet@gmail.com','hieu@gmail.com','assigned you join target zaa',1,1688227044832,1),(1688226075775,'linh@gmail.com','nguyet@gmail.com','assigned you join target test helper linh',0,1688227044833,0),(1688226075776,'linh@gmail.com','nguyet@gmail.com','assigned you join target test linh',0,1688227044834,0),(1688226075777,'linh@gmail.com','nguyet@gmail.com','assigned you join target test',0,1688227044838,0),(1688226075778,'linh@gmail.com','nguyet@gmail.com','assigned you join target test helper linh',1,1688227044844,1),(1688226075779,'nguyet@gmail.com','nguyet@gmail.com','assigned you join target test helper nguyet',1,1688227044845,1),(1688226075780,'nguyet@gmail.com','hieu@gmail.com','assigned you join target hieu gui nguyet',0,1688227044846,0),(1688226075781,'nguyet@gmail.com','hieu@gmail.com','assigned you join target hieu gui nguyet2',0,1688227044847,0),(1688226075782,'linh@gmail.com','nguyet@gmail.com','assigned you join target test noti',0,1688227044848,0),(1688226075783,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyettesthung',0,1688227044849,0),(1688226075784,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyettestHung2',0,1688227044850,0),(1688226075785,'hung@gmail.com','nguyet@gmail.com','assigned you join target socket',0,1688227044851,0),(1688226075786,'hung@gmail.com','nguyet@gmail.com','assigned you join target socket2',0,1688227044852,0),(1688226075787,'nguyet@gmail.com','quang@gmail.com','assigned you join target quang test nguyet',0,1688227044853,0),(1688226075788,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang',0,1688227044854,0),(1688226075789,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nnguyet test Quang2',0,1688227044855,0),(1688226075790,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang 3',1,1688227044856,1),(1688226075791,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang 4',0,1688227044857,0),(1688226075792,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyet test realtime noti Hung',0,1688227044858,0),(1688226075793,'nguyet@gmail.com','hung@gmail.com','assigned you join target hung test Nguyet',0,1688227044859,0),(1688226075794,'nguyet@gmail.com','hung@gmail.com','assigned you join target hung test Nguyet2',0,1688227044860,0),(1688226075795,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet Hung',0,1688227044861,0),(1688226075796,'hung@gmail.com','nguyet@gmail.com','assigned you join target NguyetHung2',0,1688227044862,0),(1688226075797,'hung@gmail.com','nguyet@gmail.com','assigned you join target NguyetHung3',0,1688227044863,0),(1688226075798,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet gui Hung',0,1688227044864,0),(1688226075799,'linh@gmail.com','nguyet@gmail.com','assigned you join target Target Nguyet tao (Linh Helper)',0,1688227044865,0),(1688226075800,'nguyet@gmail.com','hung@gmail.com','assigned you join target Hung moi Nguyet vao team',1,1688227044866,1),(1688226075801,'nguyet@gmail.com','quang@gmail.com','assigned you join target Quang tao Helper Nguyet',1,1688227044867,1),(1688226075802,'nguyet@gmail.com','quang@gmail.com','assigned you join target Quang gui Nguyet ',1,1688227044868,1),(1688226075803,'nguyet@gmail.com','quang@gmail.com','assigned you join target Quang gui Nguyet 2',1,1688227044869,1),(1688226075804,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet gui Quang 3',1,1688227044870,0),(1688226075805,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet gui Quang 4',1,1688227044871,1),(1688226075806,'quang@gmail.com','linh@gmail.com','assigned you join target Linh gui Quang socket',1,1688227044872,1),(1688226075807,'linh@gmail.com','quang@gmail.com','assigned you join target Quang gui Linh 2',0,1688227044873,0),(1688226075808,'linh@gmail.com','quang@gmail.com','assigned you join target Quang gui Linh 3',0,1688227044874,0),(1688226075809,'linh@gmail.com','quang@gmail.com','assigned you join target Quang gui Linh 4',1,1688227044875,0),(1688226075810,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet tao helper Quang Hieu',1,1688227044876,1),(1688226075811,'hieu@gmail.com','nguyet@gmail.com','assigned you join target Nguyet tao helper Quang Hieu',1,1688227044876,1),(1688226075812,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet add Quang',1,1688227044877,1),(1688226075815,'linh@gmail.com','nguyet@gmail.com','assigned you join target Nguyet add Linh va Hung',0,1688227044879,0),(1688226075816,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet add Linh va Hung',1,1688227044879,0),(1688226075839,'hung@gmail.com','nguyet@gmail.com','assigned you join target helper Hung',1,1688227044901,1),(1688226075843,'hung@gmail.com','nguyet@gmail.com','assigned you join target todo co Hung2',1,1688227044905,1),(1688226075845,'hung@gmail.com','nguyet@gmail.com','assigned you join target add Hung test Noti2',1,1688227044907,1),(1688226075847,'hung@gmail.com','nguyet@gmail.com','assigned you join target addd2',1,1688227044911,1),(1688226075848,'hung@gmail.com','nguyet@gmail.com','assigned you join target aaa',1,1688227044912,1),(1688226075849,'hung@gmail.com','nguyet@gmail.com','assigned you join target bbbb',1,1688227044913,1),(1688226075850,'nguyet@gmail.com','hung@gmail.com','assigned you join target bbbbb',1,1688227044915,1),(1688226075851,'nguyet@gmail.com','hung@gmail.com','assigned you join target Target co Nguyet le',1,1688227044916,1),(1688226075852,'nguyet@gmail.com','hung@gmail.com','assigned you join target Target co Nguyet le 2',1,1688227044917,0),(1688226075853,'nguyet@gmail.com','hung@gmail.com','assigned you join target Target co Nguyet le 3',1,1688227044918,0),(1688226075854,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet moi Hung 2',1,1688227044919,0);
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

-- Dump completed on 2024-06-05 14:18:49
