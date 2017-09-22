-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1:38313
-- Generation Time: Apr 19, 2016 at 07:09 AM
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
  `annotation_x` int(11) NOT NULL,
  `annotation_y` int(11) NOT NULL,
  `annotation_box_width` int(11) NOT NULL,
  `annotation_box_height` int(11) NOT NULL,
  `annotation_text` varchar(64) NOT NULL,
  `annotation_creation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `annotation_modified_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `annotations`
--

INSERT INTO `annotations` (`annotation_id`, `video_id`, `user_name`, `annotation_start_time`, `annotation_end_time`, `annotation_x`, `annotation_y`, `annotation_box_width`, `annotation_box_height`, `annotation_text`, `annotation_creation_time`, `annotation_modified_date`) VALUES
(1, 12, 'SPHYNX!', 1, 2, 10, 30, 16, 27, 'k', '2016-04-18 00:31:07', '0000-00-00 00:00:00'),
(2, 12, 'SPHYNX!', 1, 2, 10, 30, 16, 27, 'kd', '2016-04-18 00:31:07', '0000-00-00 00:00:00'),
(9, 12, 'testuser', 0, 1.71539, 137, 23, 87, 87, 'cat', '2016-04-19 03:03:21', '0000-00-00 00:00:00');

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
  `user_activation_hash` varchar(40) DEFAULT NULL COMMENT 'user email verification code, part 1 of 2 step activation process',
  `user_password_reset_hash` char(40) DEFAULT NULL COMMENT 'password reset code',
  `user_password_reset_datetime` bigint(20) DEFAULT NULL COMMENT 'time and date of last password reset',
  `user_failed_logins` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'number of failed login attempts',
  `user_last_failed_login` int(10) DEFAULT NULL COMMENT 'timestamp for last failed login attempt',
  `user_registration_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_registration_ip` varchar(39) NOT NULL DEFAULT '0.0.0.0',
  `user_last_login_ip` varchar(39) NOT NULL DEFAULT '0.0.0.0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_password_hash`, `user_email`, `user_activated`, `user_activation_hash`, `user_password_reset_hash`, `user_password_reset_datetime`, `user_failed_logins`, `user_last_failed_login`, `user_registration_datetime`, `user_registration_ip`, `user_last_login_ip`) VALUES
(3, 'BEEPBOOP', '098f6bcd4621d373cade4e832627b4f6', 'atestemail@fjdksl.com', 0, NULL, NULL, NULL, 0, NULL, '0000-00-00 00:00:00', '0.0.0.0', '0.0.0.0'),
(4, 'SPHYNX!', '098f6bcd4621d373cade4e832627b4f6', 'astupidtest@fdjsk.com', 0, NULL, NULL, NULL, 0, NULL, '0000-00-00 00:00:00', '0.0.0.0', '0.0.0.0'),
(7, 'atest', '098f6bcd4621d373cade4e832627b4f6', 'fjds@FJK.com', 0, NULL, NULL, NULL, 0, NULL, '0000-00-00 00:00:00', '0.0.0.0', '0.0.0.0'),
(8, 'testuser', '098f6bcd4621d373cade4e832627b4f6', 'j@test.com', 0, NULL, NULL, NULL, 0, NULL, '0000-00-00 00:00:00', '0.0.0.0', '0.0.0.0'),
(9, 'test2', '098f6bcd4621d373cade4e832627b4f6', 'atest@gmail.com', 0, NULL, NULL, NULL, 0, NULL, '0000-00-00 00:00:00', '0.0.0.0', '0.0.0.0');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `video_data_id` int(11) NOT NULL COMMENT 'auto_incrementing',
  `src_video_name` varchar(64) DEFAULT NULL COMMENT 'name of video on disc',
  `ul_user_name` varchar(64) NOT NULL,
  `src_video_location` varchar(255) DEFAULT NULL COMMENT 'location of the video on disc',
  `src_video_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`video_data_id`, `src_video_name`, `ul_user_name`, `src_video_location`, `src_video_datetime`) VALUES
(12, '043401347-soldier-petting-cat-his-pocket.mp4', 'testuser', 'videos/php604F.tmp', '2016-04-16 22:28:13');

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
  MODIFY `annotation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto_incrementing', AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `video_data_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'auto_incrementing', AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
