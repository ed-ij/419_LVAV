-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:38313
-- Generation Time: Apr 26, 2016 at 05:24 AM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vid_anno_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `annotations`
--

CREATE TABLE `annotations` (
  `annotation_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL,
  `user_name` varchar(64) NOT NULL,
  `annotation_start_time` float NOT NULL,
  `annotation_end_time` float NOT NULL,
  `annotation_x` float NOT NULL,
  `annotation_y` float NOT NULL,
  `annotation_box_width` float NOT NULL,
  `annotation_box_height` float NOT NULL,
  `annotation_text` varchar(64) NOT NULL,
  `annotation_creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `annotation_modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `annotations`
--

INSERT INTO `annotations` (`annotation_id`, `video_id`, `user_name`, `annotation_start_time`, `annotation_end_time`, `annotation_x`, `annotation_y`, `annotation_box_width`, `annotation_box_height`, `annotation_text`, `annotation_creation_time`, `annotation_modified_date`) VALUES
(1, 12, 'SPHYNX!', 1, 2, 10, 30, 16, 27, 'k', '2016-04-18 00:31:07', '0000-00-00 00:00:00'),
(11, 12, 'BEEPBOOP', 0, 0.025476, 43, 49, 71, 46, 'pocket', '2016-04-19 05:26:11', '2016-04-21 18:55:13'),
(18, 12, 'BEEPBOOP', 0, 1.58801, 123, 22, 90.6628, 96.4451, 'cat', '2016-04-21 05:14:49', '2016-04-21 18:31:53'),
(19, 12, 'BEEPBOOP', 0.595167, 2.02959, 43, 37.9573, 42.9012, 70.0427, 'scarf', '2016-04-21 20:04:46', '2016-04-21 15:01:45'),
(20, 12, 'BEEPBOOP', 1.6124, 2.63331, 45, 60, 27.5854, 22.8542, 'glove', '2016-04-22 00:29:21', '2016-04-25 10:34:11'),
(21, 12, 'BEEPBOOP', 3.15394, 4.125, 153, 33, 70, 54, 'catsmile', '2016-04-22 01:06:16', '2016-04-21 19:06:33'),
(22, 12, 'BEEPBOOP', 0.122439, 2.54363, 112.683, 82.2382, 46.2439, 35.1129, 'pawes', '2016-04-22 01:13:26', '2016-04-21 19:13:26'),
(23, 12, 'BEEPBOOP', 0.834758, 3.37139, 61.1707, 118.891, 35.7073, 28.3368, 'towel', '2016-04-24 00:40:59', '2016-04-23 18:40:59');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL COMMENT 'auto_incrementing',
  `user_name` varchar(64) NOT NULL COMMENT 'user''s login name, unique',
  `user_password_hash` varchar(255) NOT NULL COMMENT 'user''s password, saved as a hash function for safe transfer',
  `user_email` varchar(64) NOT NULL COMMENT 'user''s email address, unique',
  `user_activated` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'user activation status, must be activated by an admin',
  `user_password_reset_hash` char(40) DEFAULT NULL COMMENT 'password reset code',
  `user_password_reset_datetime` datetime DEFAULT NULL COMMENT 'time and date of last password reset',
  `user_failed_logins` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'number of failed login attempts',
  `user_last_failed_login` datetime DEFAULT NULL COMMENT 'timestamp for last failed login attempt',
  `user_registration_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_registration_ip` varchar(39) NOT NULL DEFAULT '0.0.0.0',
  `user_last_login_ip` varchar(39) NOT NULL DEFAULT '0.0.0.0',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `real_name` varchar(64) NOT NULL,
  `unique_id_key` varchar(16) NOT NULL COMMENT 'Will be given by the department so credentials can be confirmed, possibly using an excel file/other.',
  `dept` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password_hash`, `user_email`, `user_activated`, `user_password_reset_hash`, `user_password_reset_datetime`, `user_failed_logins`, `user_last_failed_login`, `user_registration_datetime`, `user_registration_ip`, `user_last_login_ip`, `admin`, `real_name`, `unique_id_key`, `dept`) VALUES
(3, 'BEEPBOOP', '098f6bcd4621d373cade4e832627b4f6', 'atestemail@fjdksl.com', 1, NULL, NULL, 0, NULL, '2016-04-25 08:11:41', '0.0.0.0', '0.0.0.0', 0, '', '0', ''),
(4, 'SPHYNX!', '098f6bcd4621d373cade4e832627b4f6', 'astupidtest@fdjsk.com', 0, NULL, NULL, 0, NULL, '2016-04-25 08:12:21', '0.0.0.0', '0.0.0.0', 0, '', '0', ''),
(8, 'testuser', '098f6bcd4621d373cade4e832627b4f6', 'j@test.com', 0, NULL, NULL, 0, NULL, '2016-04-25 08:12:09', '0.0.0.0', '0.0.0.0', 0, '', '0', ''),
(9, 'testadmin', '098f6bcd4621d373cade4e832627b4f6', 'test@test.com', 1, NULL, NULL, 0, NULL, '2016-04-21 12:35:00', '0.0.0.0', '0.0.0.0', 1, '', '0', ''),
(24, 'Qtest', '098f6bcd4621d373cade4e832627b4f6', 'fjk@fjdkls.com', 0, NULL, NULL, 0, NULL, '2016-04-24 15:34:23', '0.0.0.0', '0.0.0.0', 0, 'Test User', '0', 'Engineering'),
(26, 'testuser21', '098f6bcd4621d373cade4e832627b4f6', 'test2@test.com', 1, NULL, NULL, 0, NULL, '2016-04-25 10:32:29', '0.0.0.0', '0.0.0.0', 0, 'JW ', '111111', 'Dept of Engineer'),
(27, 'test23', '098f6bcd4621d373cade4e832627b4f6', 'test3@jfklds.com', 1, NULL, NULL, 0, NULL, '2016-04-25 13:17:00', '0.0.0.0', '0.0.0.0', 0, 'jw', '11111', 'Dept of Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `video_data_id` int(11) NOT NULL COMMENT 'auto_incrementing',
  `src_video_name` varchar(64) DEFAULT NULL COMMENT 'name of video on disc',
  `ul_user_name` varchar(64) NOT NULL,
  `src_video_location` varchar(255) DEFAULT NULL COMMENT 'location of the video on disc',
  `src_video_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `src_video_thumbnail_location` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`video_data_id`, `src_video_name`, `ul_user_name`, `src_video_location`, `src_video_datetime`, `src_video_thumbnail_location`) VALUES
(12, '043401347-soldier-petting-cat-his-pocket.mp4', 'testuser', 'videos/php604F.tmp', '2016-04-24 19:46:34', 'thumbs/catsmile.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `annotations`
--
ALTER TABLE `annotations`
  ADD PRIMARY KEY (`annotation_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `Username` (`user_name`),
  ADD UNIQUE KEY `Email` (`user_email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`video_data_id`),
  ADD UNIQUE KEY `src_video_location` (`src_video_location`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `annotations`
--
ALTER TABLE `annotations`
  MODIFY `annotation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto_incrementing', AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `video_data_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto_incrementing', AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
