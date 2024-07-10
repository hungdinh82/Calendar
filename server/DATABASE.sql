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
  `isAdmin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1688224594947 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Accounts`
--

LOCK TABLES `Accounts` WRITE;
/*!40000 ALTER TABLE `Accounts` DISABLE KEYS */;
INSERT INTO `Accounts` VALUES (1688181116086,'quang@gmail.com','123456','quang','/static/media/quang.ef9fa4a0778968a5548c.jpg',0),(1688181141478,'nguyet@gmail.com','123456','nguyet','/static/media/nguyet.b8f537e70209afcf1f9e.jpg',0),(1688181167199,'hieu@gmail.com','123456','hieu','/static/media/hieu.04ddde8f6f214145ea6a.jpg',0),(1688224560728,'linh@gmail.com','123456','linh','/static/media/linh.8d8bcf716640137b0414.png',0),(1688224594942,'hung@gmail.com','123456','hung','/static/media/hung.eb15017a59797eb25ad2.png',0),(1688224594943,'admin@gmail.com','admin','admin','/static/media/img6.812d5cd63108669d2102.png',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,1688181141478,1688226018260,'alo','2024-04-23 04:11:46'),(2,1688181141478,1688226018260,'Nội dung bình luận','2024-04-23 04:33:16'),(3,1688181141478,1688226018260,'Hello','2024-04-23 04:40:35'),(4,1688181141478,1688226018260,'Lam ki di','2024-04-23 04:55:10'),(5,1688181141478,1688226018260,'Nội dung bình luận 2','2024-04-29 14:04:39'),(6,1688181141478,1688226018260,'Nội dung bình luận 2','2024-04-29 15:20:42'),(7,1688181141478,1688227044869,'aaaa','2024-05-18 17:22:50'),(8,1688181141478,1688227044869,'bbb','2024-05-18 17:26:36'),(9,1688181141478,1688227044866,'eeee','2024-05-18 17:28:10'),(10,1688224594942,1688227044901,'ddddd','2024-05-18 17:28:31'),(14,1688181141478,NULL,'hhh','2024-05-18 19:44:31'),(15,1688181141478,NULL,'sddds','2024-05-18 19:48:45'),(16,1688181141478,1688224797315,'alo','2024-05-21 10:45:01'),(28,1688224560728,1688225588184,'iiiii','2024-06-09 11:38:58'),(31,1688224560728,1688227044986,'asdfasdf','2024-06-18 13:54:28'),(34,1688224560728,NULL,'aaa','2024-06-20 08:01:07'),(35,1688224560728,NULL,'aaaa','2024-06-20 08:01:16'),(36,1688224560728,NULL,'dddd','2024-06-20 08:21:35'),(37,1688224560728,1688227044949,'dd','2024-06-20 08:23:37'),(38,1688224560728,1688227044981,'dddd','2024-06-20 08:28:41'),(39,1688224560728,1688227044992,'dddd','2024-06-20 08:28:59'),(42,1688224560728,1688227044980,'aaa','2024-06-20 14:19:37'),(43,1688224560728,1688227044980,'dddd','2024-06-20 14:19:47'),(44,1688224560728,1688225588184,'xxxx','2024-06-20 14:23:16'),(46,1688224594942,1688227045011,'Tập trung ôn tập phần Mảng, Đệ Quy','2024-06-29 15:05:27'),(49,1688181141478,1688225588184,'Bạn được giao thiết kế và xây dựng ứng dụng quản lý chấm công nhân viên cho các doanh nghiệp sản xuất. Có hai loại nhân viên: công nhân (Worker) và nhân viên văn phòng (Officer). Nhân viên có thông tin cơ bản là họ tên, mã nhân viên, tên bộ phận làm việc (department). Tất cả công nhân thuộc nhánh bộ phận“Nhà máy sản xuất”. Nhân viên văn phòng thuộc các nhánh khác. Những thông tin này được lấy từ API hệ thống quản lý nhân sự.','2024-07-09 16:03:08'),(51,1688181141478,1688225588184,'a','2024-07-09 16:09:43');
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
) ENGINE=InnoDB AUTO_INCREMENT=1688227045022 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Events`
--

LOCK TABLES `Events` WRITE;
/*!40000 ALTER TABLE `Events` DISABLE KEYS */;
INSERT INTO `Events` VALUES (1688224797315,'Ôn thi JLPT N2','calendar1','2023-05-01 15:18:27','2023-06-30 15:48:27','target','<ul><li>Nghe hiểu: 40/60</li><li>Đọc hiểu: 40/60</li><li>Từ vựng: 50/60</li></ul>','Ready',1688181141478,NULL),(1688224990109,'Làm bài 2 dokkai','calendar1','2023-05-10 00:21:12','2023-05-10 01:51:12','todo','<ol><li>Đạt mục tiêu 40/60</li><br></ol>','In Progress',1688181141478,1688224797315),(1688225062681,'Làm bài 3 choukai','calendar1','2023-05-10 02:23:14','2023-05-10 03:53:14','todo','<ul><li>Đạt 30/40</li><br></ul>','Done',1688224594942,1688224797315),(1688225141821,'Làm đề thi thử N2','calendar1','2023-05-10 13:24:29','2023-05-10 14:54:29','todo','<ul><li>Đạt 120/180</li><br></ul>','Ready',1688181141478,1688224797315),(1688225588184,'BTL ITSS','calendar1','2023-07-01 15:29:33','2023-07-20 16:59:33','target','<p><span style=\"color: rgb(255, 0, 0);\">Nhóm bài tập lớn ITSS:&nbsp;</span></p><ol><li>Đề bài:&nbsp;</li>Bạn được giao thiết kế và xây dựng ứng dụng quản lý chấm công nhân viên cho các doanh nghiệp sản xuất. Có hai loại nhân viên: công nhân (Worker) và nhân viên văn phòng (Officer). Nhân viên có thông tin cơ bản là họ tên, mã nhân viên, tên bộ phận làm việc (department). Tất cả công nhân thuộc nhánh bộ phận“Nhà máy sản xuất”. Nhân viên văn phòng thuộc các nhánh khác. Những thông tin này được lấy từ API hệ thống quản lý nhân sự.<li>Mục tiêu:&nbsp;</li></ol><ul><li>Hoàn thành sản phẩm đúng hạn 20/7</li><br></ul>','Ready',1688181141478,NULL),(1688226018260,'Đặc tả usecase','calendar1','2023-07-01 15:00:19','2023-07-01 16:09:19','todo','<p><br></p>',NULL,1688181141478,1688225588184),(1688226249088,'Vẽ sơ đồ trình tự','calendar1','2023-07-07 13:43:23','2023-07-07 16:13:23','todo','',NULL,1688181141478,1688225588184),(1688226696262,'BTL UI UX','calendar1','2023-07-01 15:49:08','2023-09-01 16:19:08','target','<p>Nhóm bài tập lớn UX UI:</p><ol><li>Mục tiêu: đạt 9/10</li></ol>','Ready',1688181141478,NULL),(1688226743960,'Tạo tài liệu đặc tả yêu cầu','calendar1','2023-07-10 12:51:41','2023-07-10 16:21:41','todo','','In Progress',1688181141478,1688226696262),(1688226867487,'Tạo wireframe','calendar1','2023-07-07 16:05:52','2023-07-08 00:35:52','todo','','In Progress',1688181141478,1688226696262),(1688226915186,'Thiết kế giao diện','calendar1','2023-07-10 16:10:01','2023-07-15 17:40:01','todo','<p>dd</p>','Done',1688181141478,1688226696262),(1688226997645,'Thiết kế UI với đúng guideline','calendar1','2023-07-08 16:15:34','2023-07-10 16:45:34','todo','','Ready',1688181141478,1688226696262),(1688227044795,'Review UI','calendar1','2023-07-16 16:20:19','2023-07-20 16:50:19','todo','','Done',1688181141478,1688226696262),(1688227044866,'Hung moi Nguyet vao team','calendar1','2024-05-11 13:27:32','2024-05-11 13:57:32','todo','<p>Hung moi Nguyet vao team</p>','Ready',1688224594942,NULL),(1688227044867,'Quang tao Helper Nguyet','calendar1','2024-05-11 13:36:51','2024-05-11 14:06:51','todo','<p>Quang tao Helper Nguyet</p>','Ready',1688181116086,NULL),(1688227044868,'Quang gui Nguyet ','calendar1','2024-05-11 13:58:03','2024-05-11 14:28:03','todo','<p>Quang gui Nguyet </p>','Ready',1688181116086,NULL),(1688227044869,'Quang gui Nguyet 2','calendar1','2024-05-11 13:58:38','2024-05-11 14:28:38','todo','<p>Quang gui Nguyet 2</p>','Ready',1688181116086,NULL),(1688227044870,'Nguyet gui Quang 3','calendar1','2024-05-11 14:24:32','2024-05-11 14:54:32','todo','<p>Nguyet gui Quang 3</p>','Ready',1688181141478,NULL),(1688227044871,'Nguyet gui Quang 4','calendar1','2024-05-11 14:25:02','2024-05-11 14:55:02','todo','<p>Nguyet gui Quang 4</p>','Ready',1688181141478,NULL),(1688227044872,'Linh gui Quang socket','calendar1','2024-05-11 14:33:06','2024-05-11 15:03:06','todo','<p>Linh gui Quang socket</p>','Ready',1688224560728,NULL),(1688227044873,'Quang gui Linh 2','calendar1','2024-05-11 14:35:36','2024-05-11 15:05:36','todo','<p>Quang gui Linh 2</p>','Ready',1688181116086,NULL),(1688227044874,'Quang gui Linh 3','calendar1','2024-05-11 14:36:06','2024-05-11 15:06:06','todo','<p>Quang gui Linh 3</p>','Ready',1688181116086,NULL),(1688227044875,'Quang gui Linh 4','calendar1','2024-05-11 14:41:53','2024-05-11 15:11:53','todo','<p>Quang gui Linh 4</p>','Ready',1688181116086,NULL),(1688227044876,'Nguyet tao helper Quang Hieu','calendar1','2024-05-11 16:03:16','2024-05-11 16:33:16','todo','<p>Nguyet tao helper Quang Hieu</p>','Ready',1688181141478,NULL),(1688227044879,'Nguyet add Linh va Hung','calendar1','2024-05-11 18:41:57','2024-05-11 19:11:57','todo','<p>Nguyet add Linh va Hung</p>','Ready',1688181141478,NULL),(1688227044901,'helper Hung','calendar1','2024-05-14 00:29:24','2024-05-14 00:59:24','todo','<p>helper Hung</p>','Ready',1688181141478,NULL),(1688227044905,'todo co Hung2','calendar1','2024-05-14 01:54:36','2024-05-14 02:24:36','todo','<p>todo co Hung2</p>','In Progress',1688181141478,1688227044904),(1688227044909,'asd','calendar1','2024-05-19 00:42:08','2024-05-19 01:12:08','todo','<p>asds</p>','Ready',1688181116086,1688227044908),(1688227044910,'addd','calendar1','2024-05-21 17:45:11','2024-05-21 18:15:11','todo','<p><br></p>','Ready',1688181141478,1688227044907),(1688227044911,'addd2','calendar1','2024-05-25 16:34:31','2024-05-25 17:04:31','todo','','Ready',1688181141478,1688227044907),(1688227044912,'aaa','calendar1','2024-05-25 16:38:25','2024-05-25 17:08:25','todo','<p>aaa</p>','Done',1688181141478,1688227044907),(1688227044913,'bbbb','calendar1','2024-05-25 16:43:17','2024-05-25 17:13:17','todo','','Ready',1688181141478,1688227044907),(1688227044914,'aaaaaa','calendar1','2024-05-25 17:30:49','2024-05-25 18:00:49','todo','','Ready',1688224594942,NULL),(1688227044915,'bbbbb','calendar1','2024-05-25 17:30:59','2024-05-25 18:00:59','todo','','Ready',1688224594942,NULL),(1688227044917,'Target co Nguyet le 2','calendar1','2024-06-02 17:50:42','2024-06-02 18:20:42','todo','<p>Target co Nguyet le 2</p>','Ready',1688224594942,NULL),(1688227044918,'Target co Nguyet le 3','calendar1','2024-06-02 17:51:13','2024-06-02 18:21:13','todo','<p>&nbsp;Target co Nguyet le 3</p>','Ready',1688224594942,NULL),(1688227044919,'Nguyet moi Hung 2','calendar1','2024-06-02 17:52:56','2024-06-02 18:22:56','todo','<p>Nguyet moi Hung 2</p>','Ready',1688181141478,NULL),(1688227044920,'New Todo Name','calendar1','2024-05-01 08:00:00','2024-05-02 08:00:00','todo','Updated event description','Ready',1688181141478,NULL),(1688227044923,'Todo','calendar1','2024-06-06 00:00:00','2024-06-06 00:30:00','todo','<p>todo Hieu</p>','Ready',1688181167199,NULL),(1688227044924,'nghe nhac','calendar1','2024-06-06 00:00:00','2024-06-06 00:30:00','todo','<p>nghe nhac</p>','Ready',1688181167199,NULL),(1688227044926,'Lam giao dien','calendar1','2024-06-06 14:28:35','2024-06-06 14:58:35','todo','','Done',1688181167199,1688227044925),(1688227044927,'cong viec 2','calendar1','2024-06-06 14:29:42','2024-06-06 14:59:42','todo','<p>cong viec 2</p>','Ready',1688181167199,1688227044925),(1688227044928,'cong viec 3','calendar1','2024-06-06 14:36:15','2024-06-10 15:06:15','todo','','Done',1688181167199,1688227044925),(1688227044933,'test socket','calendar1','2024-06-07 21:40:29','2024-06-07 22:10:29','todo','<p>test socket</p>','Ready',1688181167199,NULL),(1688227044940,'socket6','calendar1','2024-06-07 22:02:49','2024-06-07 22:32:49','target','','Ready',1688181116086,NULL),(1688227044949,'addd Linh nhe','calendar1','2024-06-07 22:45:18','2024-06-07 23:15:18','todo','<p>addd Linh nha</p><p><br></p>','Done',1688224560728,NULL),(1688227044950,'aaaaa','calendar1','2024-06-09 13:08:44','2024-06-09 13:38:44','todo','<p>aaaa</p>','Ready',1688224594942,NULL),(1688227044951,'bbbbb','calendar1','2024-06-09 13:09:26','2024-06-09 13:39:26','todo','<p><br></p>','Ready',1688224594942,NULL),(1688227044952,'aaaadddd','calendar1','2024-06-09 13:12:20','2024-06-09 13:42:20','todo','<p><br></p>','Ready',1688224594942,NULL),(1688227044953,'aaaaa','calendar1','2024-06-09 15:01:42','2024-06-09 15:31:42','todo','<p>aaaa</p>','Ready',1688181141478,1688227044934),(1688227044955,'oooooo','calendar1','2024-06-09 16:09:02','2024-06-09 16:39:02','todo','<p>wwww</p>','Ready',1688181141478,NULL),(1688227044960,'ddddd','calendar1','2024-06-09 16:27:43','2024-06-09 16:57:43','todo','<p>ddddd</p>','Ready',1688181141478,NULL),(1688227044962,'asdfasdgsagsag','calendar1','2024-06-09 16:31:57','2024-06-09 17:01:57','todo','<p>asdgsagsadg</p>','Ready',1688181141478,NULL),(1688227044963,'dasdfasdfsadf','calendar1','2024-06-09 16:32:34','2024-06-09 17:02:34','todo','<p>asfsadfsadf</p>','Ready',1688181141478,1688227044948),(1688227044964,'quang','calendar1','2024-06-09 16:32:52','2024-06-09 17:02:52','todo','','Done',1688181141478,1688227044948),(1688227044965,'quang lam','calendar1','2024-06-09 16:56:36','2024-06-09 17:26:36','todo','<p><br></p>','Done',1688181141478,1688227044934),(1688227044966,'quangli','calendar1','2024-06-09 16:58:00','2024-06-09 17:28:00','todo','','Ready',1688181141478,1688227044934),(1688227044969,'asassadf','calendar1','2024-06-09 17:02:14','2024-06-09 17:32:14','todo','','Ready',1688181141478,1688227044934),(1688227044970,'todo trong target co Quang lam helper','calendar1','2024-06-09 17:02:49','2024-06-09 20:32:49','todo','<p><br></p>','In Progress',1688181141478,1688227044934),(1688227044972,'linhqwe','calendar1','2024-06-09 17:04:04','2024-06-09 17:34:04','todo','<p>asdfasdf</p>','Ready',1688181141478,NULL),(1688227044973,'aaaaa','calendar1','2024-06-09 17:09:21','2024-06-09 17:39:21','todo','<p>hieu&nbsp;</p>','Ready',1688181141478,1688227044948),(1688227044975,'todo khong co target','calendar1','2024-06-13 00:00:00','2024-06-13 00:30:00','todo','<p>dasdfasdf</p>','Ready',1688181141478,NULL),(1688227044976,'test thoi gian','calendar1','2024-06-13 14:00:00','2024-06-13 16:30:00','todo','','Ready',1688181141478,NULL),(1688227044979,'todo trong target Nguyet Tao','calendar1','2024-06-13 16:45:50','2024-06-13 17:15:50','todo','','Done',1688181141478,1688227044978),(1688227044980,'target moi Linh','calendar1','2024-06-13 16:55:13','2024-06-13 17:25:13','target','','Ready',1688181116086,NULL),(1688227044981,'todo trong target Quang tao','calendar1','2024-06-13 16:56:00','2024-06-13 17:26:00','todo','<p>ddd</p>','Done',1688224560728,1688227044980),(1688227044982,'ddddaad','calendar1','2024-06-14 21:30:00','2024-06-14 22:00:00','todo','<p>d</p>','Ready',1688224560728,NULL),(1688227044983,'ddddasdf','calendar1','2024-06-16 17:00:00','2024-06-16 17:30:00','todo','<p><br></p>','Ready',1688224560728,NULL),(1688227044984,'ádfasccd','calendar1','2024-06-17 11:00:00','2024-06-17 15:00:00','todo','<p><br></p>','Ready',1688224560728,NULL),(1688227044985,'qww','calendar1','2024-06-17 23:46:31','2024-06-18 00:16:31','todo','','Ready',1688224560728,1688227044948),(1688227044986,'edit target','calendar1','2024-06-18 20:53:45','2024-06-18 20:57:45','target','<p>lam bai tap nhé</p>','Ready',1688224560728,NULL),(1688227044987,'aaaa','calendar1','2024-06-18 21:22:36','2024-06-18 21:52:36','todo','','Ready',1688181141478,NULL),(1688227044988,'sdafasd','calendar1','2024-06-17 22:13:34','2024-06-17 22:43:34','todo','','Ready',1688224560728,NULL),(1688227044992,'20-06','calendar1','2024-06-20 02:08:09','2024-06-20 10:00:00','todo','<p>dddddaaasdd</p>','Done',1688224560728,1688227044986),(1688227044994,'todo nho 2','calendar1','2024-06-20 16:36:06','2024-06-20 19:30:00','todo','','Done',1688224560728,NULL),(1688227044995,'todo nho 1','calendar1','2024-06-20 16:36:57','2024-06-20 18:30:00','todo','<p>todo nho 1</p>','Ready',1688224560728,NULL),(1688227044996,'d','calendar1','2024-06-20 21:14:55','2024-06-20 21:44:55','todo','','Ready',1688224560728,1688227044948),(1688227044997,'sa','calendar1','2024-06-20 21:14:58','2024-06-20 23:30:00','todo','','Ready',1688224560728,1688227044948),(1688227045004,'dđâdd','calendar1','2024-06-27 15:39:51','2024-06-27 22:30:00','todo','','Ready',1688181141478,NULL),(1688227045007,'aasdf','calendar1','2024-06-28 15:30:00','2024-06-28 19:00:00','todo','','Ready',1688181141478,NULL),(1688227045008,'ádfdsf','calendar1','2024-06-25 15:00:00','2024-06-25 19:00:00','todo','','Ready',1688181141478,NULL),(1688227045009,'dddasdfds','calendar1','2024-06-27 15:00:00','2024-06-27 22:00:00','todo','','Done',1688181141478,NULL),(1688227045010,'dddd','calendar1','2024-06-27 00:00:00','2024-06-27 00:30:00','todo','<p><br></p>','Ready',1688181116086,NULL),(1688227045011,'Ôn tập cấu trúc dữ liệu và giải thuật','calendar1','2024-06-29 21:53:48','2024-06-29 22:23:48','target','<p>Cấu trúc dữ liệu và giải thuật là hai khái niệm cơ bản và quan trọng trong khoa học máy tính, giúp lưu trữ và quản lý dữ liệu một cách hiệu quả cũng như giải quyết các vấn đề tính toán.<br><br>Tầm Quan Trọng Cấu trúc dữ liệu và giải thuật không chỉ là nền tảng cơ bản cho việc phát triển phần mềm mà còn là yếu tố then chốt trong việc nâng cao hiệu suất và tối ưu hóa các ứng dụng máy tính. Hiểu biết về các khái niệm này giúp nhà phát triển chọn lựa phù hợp cho từng loại vấn đề cụ thể.</p>','Ready',1688224594942,NULL),(1688227045012,'Đồ thị (Graphs)','calendar1','2024-06-29 21:56:08','2024-06-29 22:26:08','todo','<p>Bao gồm tập hợp các đỉnh (nút) và cạnh (liên kết giữa các nút). Đồ thị có thể là vô hướng hoặc có hướng.</p>','Ready',1688224594942,1688227045011),(1688227045013,'Đệ quy (Recursion)','calendar1','2024-06-29 21:56:42','2024-06-29 22:26:42','todo','<p>Kỹ thuật gọi lại chính hàm đó với một vấn đề nhỏ hơn.</p>','Done',1688224594942,1688227045011),(1688227045015,'a','calendar1','2024-07-08 01:00:00','2024-07-09 10:00:00','todo','','Ready',1688181141478,NULL),(1688227045020,'d','calendar1','2024-07-10 03:00:00','2024-07-11 00:00:00','todo','','Done',1688181141478,NULL),(1688227045021,'dddd','calendar1','2024-07-10 21:22:11','2024-07-10 21:52:11','todo','','Ready',1688181141478,1688227044978);
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
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Helpers`
--

LOCK TABLES `Helpers` WRITE;
/*!40000 ALTER TABLE `Helpers` DISABLE KEYS */;
INSERT INTO `Helpers` VALUES (39,1688181141478,1688227044866),(40,1688181141478,1688227044868),(41,1688181141478,1688227044869),(42,1688181116086,1688227044871),(43,1688181116086,1688227044876),(44,1688181167199,1688227044876),(51,1688181116086,1688227044872),(59,1688224594942,1688227044901),(63,1688181141478,1688227044867),(67,1688224594942,1688227044911),(68,1688224594942,1688227044912),(69,1688224594942,1688227044913),(70,1688181141478,1688227044915),(76,1688224594942,1688227044927),(94,1688224560728,1688227044952),(95,1688224560728,1688227044951),(100,1688181167199,1688227044973),(101,1688224560728,1688225588184),(108,1688224560728,1688227044980),(128,1688181167199,1688227044996),(131,1688181116086,1688227044970),(132,1688224560728,1688227045011),(134,1688181116086,1688227044965),(136,1688181141478,1688227045021);
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
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Importants`
--

LOCK TABLES `Importants` WRITE;
/*!40000 ALTER TABLE `Importants` DISABLE KEYS */;
INSERT INTO `Importants` VALUES (43,1688227044866,1688224594942,0),(44,1688227044867,1688181116086,0),(45,1688227044868,1688181116086,0),(46,1688227044869,1688181116086,0),(47,1688227044870,1688181141478,0),(48,1688227044871,1688181141478,0),(49,1688227044872,1688224560728,0),(50,1688227044873,1688181116086,0),(51,1688227044874,1688181116086,0),(52,1688227044875,1688181116086,0),(53,1688227044876,1688181141478,0),(56,1688227044879,1688181141478,0),(78,1688227044901,1688181141478,0),(82,1688227044905,1688181141478,0),(86,1688227044909,1688181116086,0),(87,1688227044910,1688181141478,0),(88,1688227044911,1688181141478,0),(89,1688227044912,1688181141478,0),(90,1688227044913,1688181141478,0),(91,1688227044914,1688224594942,0),(92,1688227044915,1688224594942,0),(94,1688227044917,1688224594942,0),(95,1688227044918,1688224594942,0),(96,1688227044919,1688181141478,0),(97,1688224797315,1688181141478,1),(99,1688227044920,1688181141478,0),(103,1688227044923,1688181167199,0),(104,1688227044924,1688181167199,0),(106,1688227044926,1688181167199,0),(107,1688227044927,1688181167199,0),(108,1688227044928,1688181167199,0),(113,1688227044933,1688181167199,0),(120,1688227044940,1688181116086,0),(129,1688227044949,1688181141478,0),(130,1688227044950,1688224594942,0),(131,1688227044951,1688224594942,0),(132,1688227044952,1688224594942,0),(134,1688227044953,1688181141478,0),(136,1688227044955,1688181141478,0),(141,1688227044960,1688181141478,0),(143,1688227044962,1688181141478,0),(144,1688227044963,1688181141478,0),(145,1688227044964,1688181141478,0),(146,1688227044965,1688181141478,0),(147,1688227044966,1688181141478,0),(150,1688227044969,1688181141478,0),(151,1688227044970,1688181141478,0),(153,1688227044972,1688181141478,0),(154,1688227044973,1688181141478,0),(156,1688227044975,1688181141478,0),(157,1688227044976,1688181141478,0),(160,1688227044979,1688181141478,0),(161,1688227044980,1688181116086,0),(162,1688227044981,1688181116086,0),(163,1688227044982,1688224560728,0),(164,1688227044983,1688224560728,0),(165,1688227044984,1688224560728,0),(166,1688227044985,1688224560728,0),(168,1688227044986,1688224560728,0),(169,1688227044987,1688181141478,0),(170,1688227044988,1688224560728,0),(174,1688227044992,1688224560728,0),(176,1688227044994,1688224560728,0),(177,1688227044995,1688224560728,0),(178,1688227044980,1688224560728,1),(179,1688227044996,1688224560728,0),(180,1688227044997,1688224560728,0),(185,1688227045004,1688181141478,0),(188,1688227045007,1688181141478,0),(189,1688227045008,1688181141478,0),(190,1688227045009,1688181141478,0),(191,1688227045010,1688181116086,0),(192,1688227045011,1688224594942,0),(193,1688227045012,1688224594942,0),(194,1688227045013,1688224594942,0),(196,1688227045015,1688181141478,0),(199,1688225588184,1688181141478,1),(202,1688226696262,1688181141478,1),(203,1688227045020,1688181141478,0),(204,1688227045021,1688181141478,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=1688226075947 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notifies`
--

LOCK TABLES `Notifies` WRITE;
/*!40000 ALTER TABLE `Notifies` DISABLE KEYS */;
INSERT INTO `Notifies` VALUES (1688226018262,'hung@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226018263,'linh@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226018260,1),(1688226075763,'hieu@gmail.com','nguyet@gmail.com','assigned you a task on target',1,1688226075762,1),(1688226075765,'updated_receiver@example.com','updated_sender@example.com','This is an updated notification',1,456,1),(1688226075774,'nguyet@gmail.com','hieu@gmail.com','assigned you join target zaa',1,1688227044832,1),(1688226075775,'linh@gmail.com','nguyet@gmail.com','assigned you join target test helper linh',0,1688227044833,0),(1688226075776,'linh@gmail.com','nguyet@gmail.com','assigned you join target test linh',0,1688227044834,0),(1688226075777,'linh@gmail.com','nguyet@gmail.com','assigned you join target test',0,1688227044838,0),(1688226075778,'linh@gmail.com','nguyet@gmail.com','assigned you join target test helper linh',1,1688227044844,1),(1688226075779,'nguyet@gmail.com','nguyet@gmail.com','assigned you join target test helper nguyet',1,1688227044845,1),(1688226075780,'nguyet@gmail.com','hieu@gmail.com','assigned you join target hieu gui nguyet',0,1688227044846,0),(1688226075781,'nguyet@gmail.com','hieu@gmail.com','assigned you join target hieu gui nguyet2',0,1688227044847,0),(1688226075782,'linh@gmail.com','nguyet@gmail.com','assigned you join target test noti',0,1688227044848,0),(1688226075783,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyettesthung',0,1688227044849,0),(1688226075784,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyettestHung2',0,1688227044850,0),(1688226075785,'hung@gmail.com','nguyet@gmail.com','assigned you join target socket',0,1688227044851,0),(1688226075786,'hung@gmail.com','nguyet@gmail.com','assigned you join target socket2',0,1688227044852,0),(1688226075787,'nguyet@gmail.com','quang@gmail.com','assigned you join target quang test nguyet',0,1688227044853,0),(1688226075788,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang',0,1688227044854,0),(1688226075789,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nnguyet test Quang2',0,1688227044855,0),(1688226075790,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang 3',1,1688227044856,1),(1688226075791,'quang@gmail.com','nguyet@gmail.com','assigned you join target nguyet test Quang 4',0,1688227044857,0),(1688226075792,'hung@gmail.com','nguyet@gmail.com','assigned you join target nguyet test realtime noti Hung',0,1688227044858,0),(1688226075793,'nguyet@gmail.com','hung@gmail.com','assigned you join target hung test Nguyet',0,1688227044859,0),(1688226075794,'nguyet@gmail.com','hung@gmail.com','assigned you join target hung test Nguyet2',0,1688227044860,0),(1688226075795,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet Hung',0,1688227044861,0),(1688226075796,'hung@gmail.com','nguyet@gmail.com','assigned you join target NguyetHung2',0,1688227044862,0),(1688226075797,'hung@gmail.com','nguyet@gmail.com','assigned you join target NguyetHung3',0,1688227044863,0),(1688226075798,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet gui Hung',0,1688227044864,0),(1688226075799,'linh@gmail.com','nguyet@gmail.com','assigned you join target Target Nguyet tao (Linh Helper)',0,1688227044865,0),(1688226075800,'nguyet@gmail.com','hung@gmail.com','assigned you join target Hung moi Nguyet vao team',1,1688227044866,1),(1688226075801,'nguyet@gmail.com','quang@gmail.com','assigned you join target Quang tao Helper Nguyet',1,1688227044867,1),(1688226075802,'nguyet@gmail.com','quang@gmail.com','assigned you join target Quang gui Nguyet ',1,1688227044868,1),(1688226075803,'nguyet@gmail.com','quang@gmail.com','assigned you join target Quang gui Nguyet 2',1,1688227044869,1),(1688226075804,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet gui Quang 3',1,1688227044870,0),(1688226075805,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet gui Quang 4',1,1688227044871,1),(1688226075806,'quang@gmail.com','linh@gmail.com','assigned you join target Linh gui Quang socket',1,1688227044872,1),(1688226075807,'linh@gmail.com','quang@gmail.com','assigned you join target Quang gui Linh 2',1,1688227044873,0),(1688226075808,'linh@gmail.com','quang@gmail.com','assigned you join target Quang gui Linh 3',1,1688227044874,0),(1688226075809,'linh@gmail.com','quang@gmail.com','assigned you join target Quang gui Linh 4',1,1688227044875,0),(1688226075810,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet tao helper Quang Hieu',1,1688227044876,1),(1688226075811,'hieu@gmail.com','nguyet@gmail.com','assigned you join target Nguyet tao helper Quang Hieu',1,1688227044876,1),(1688226075812,'quang@gmail.com','nguyet@gmail.com','assigned you join target Nguyet add Quang',1,1688227044877,1),(1688226075815,'linh@gmail.com','nguyet@gmail.com','assigned you join target Nguyet add Linh va Hung',1,1688227044879,0),(1688226075816,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet add Linh va Hung',1,1688227044879,0),(1688226075839,'hung@gmail.com','nguyet@gmail.com','assigned you join target helper Hung',1,1688227044901,1),(1688226075843,'hung@gmail.com','nguyet@gmail.com','assigned you join target todo co Hung2',1,1688227044905,1),(1688226075847,'hung@gmail.com','nguyet@gmail.com','assigned you join target addd2',1,1688227044911,1),(1688226075848,'hung@gmail.com','nguyet@gmail.com','assigned you join target aaa',1,1688227044912,1),(1688226075849,'hung@gmail.com','nguyet@gmail.com','assigned you join target bbbb',1,1688227044913,1),(1688226075850,'nguyet@gmail.com','hung@gmail.com','assigned you join target bbbbb',1,1688227044915,1),(1688226075852,'nguyet@gmail.com','hung@gmail.com','assigned you join target Target co Nguyet le 2',1,1688227044917,0),(1688226075853,'nguyet@gmail.com','hung@gmail.com','assigned you join target Target co Nguyet le 3',1,1688227044918,0),(1688226075854,'hung@gmail.com','nguyet@gmail.com','assigned you join target Nguyet moi Hung 2',1,1688227044919,0),(1688226075859,'hung@gmail.com','hieu@gmail.com','assigned you join target cong viec 2',1,1688227044927,1),(1688226075875,'quang@gmail.com','hieu@gmail.com','assigned you join target test socket',0,1688227044933,0),(1688226075884,'nguyet@gmail.com','quang@gmail.com','assigned you join target socket6',1,1688227044940,0),(1688226075904,'linh@gmail.com','hung@gmail.com','assigned you join target bbbbb',1,1688227044951,1),(1688226075905,'linh@gmail.com','hung@gmail.com','assigned you join target aaaadddd',1,1688227044952,1),(1688226075912,'linh@gmail.com','nguyet@gmail.com','assigned you join target dasdfasdfsadf',1,1688227044963,1),(1688226075913,'hieu@gmail.com','nguyet@gmail.com','assigned you join target quang',0,1688227044964,0),(1688226075914,'linh@gmail.com','nguyet@gmail.com','assigned you join target quang',1,1688227044964,1),(1688226075915,'quang@gmail.com','nguyet@gmail.com','assigned you join target quang lam',1,1688227044965,0),(1688226075923,'linh@gmail.com','nguyet@gmail.com','assigned you join target BTL ITSS',1,1688225588184,1),(1688226075926,'hieu@gmail.com','nguyet@gmail.com','assigned you join target Tạo wireframe',0,1688226867487,0),(1688226075929,'linh@gmail.com','quang@gmail.com','assigned you join target target moi Linh',1,1688227044980,1),(1688226075941,'nguyet@gmail.com','linh@gmail.com','assigned you join target edit target',1,1688227044986,0),(1688226075945,'linh@gmail.com','hung@gmail.com','assigned you join target Ôn tập cấu trúc dữ liệu và giải thuật',1,1688227045011,1);
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

-- Dump completed on 2024-07-10 21:37:18
