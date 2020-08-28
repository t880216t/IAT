/*
 Navicat Premium Data Transfer

 Source Server         : 192.168.26.118
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : 192.168.26.118:3306
 Source Schema         : IAT

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 28/08/2020 14:21:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for global_values
-- ----------------------------
DROP TABLE IF EXISTS `global_values`;
CREATE TABLE `global_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key_name` varchar(500) DEFAULT NULL,
  `key_value` varchar(4000) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `value_type` smallint(6) DEFAULT NULL COMMENT '1.正式环境 2.测试环境 3.参数化提取',
  `case_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for iat_case_info
-- ----------------------------
DROP TABLE IF EXISTS `iat_case_info`;
CREATE TABLE `iat_case_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `domain` varchar(500) DEFAULT NULL,
  `method` varchar(500) DEFAULT NULL,
  `path` varchar(500) DEFAULT NULL,
  `param_type` smallint(6) DEFAULT NULL,
  `assert_type` smallint(6) DEFAULT NULL,
  `extract_type` smallint(6) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `body_data` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for iat_key_values
-- ----------------------------
DROP TABLE IF EXISTS `iat_key_values`;
CREATE TABLE `iat_key_values` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `key_name` varchar(500) DEFAULT NULL,
  `key_value` varchar(2000) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `value_type` smallint(6) DEFAULT NULL COMMENT '1.header设置 2.参数设置 3.文本匹配校验 4. Json校验',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=337 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for iat_shell_data
-- ----------------------------
DROP TABLE IF EXISTS `iat_shell_data`;
CREATE TABLE `iat_shell_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `shell_type` smallint(6) DEFAULT NULL COMMENT '1.前置shell 2.后置shell',
  `shell_data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `add_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for project
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  `status` smallint(6) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for sample
-- ----------------------------
DROP TABLE IF EXISTS `sample`;
CREATE TABLE `sample` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `param_type` smallint(6) unsigned zerofill DEFAULT NULL,
  `params` mediumtext COLLATE utf8mb4_unicode_ci,
  `asserts_type` smallint(6) DEFAULT NULL,
  `asserts_data` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extract_type` smallint(6) DEFAULT NULL,
  `extract_key_name` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extract_data` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  `pre_shell_type` smallint(6) DEFAULT NULL,
  `pre_shell_data` mediumtext COLLATE utf8mb4_unicode_ci,
  `post_shell_type` smallint(6) DEFAULT NULL,
  `post_shell_data` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `task_type` smallint(6) DEFAULT NULL COMMENT '1.即时任务 2.定时任务 3.调试任务',
  `run_time` varchar(255) DEFAULT NULL,
  `task_desc` varchar(1000) DEFAULT NULL,
  `domain` varchar(500) DEFAULT NULL,
  `headers` mediumtext,
  `proxy` varchar(500) DEFAULT NULL,
  `params` mediumtext,
  `case` mediumtext,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` smallint(6) DEFAULT NULL,
  `result` mediumtext,
  `project_id` int(11) DEFAULT NULL,
  `daily_result` mediumtext,
  `value_type` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for task_copy
-- ----------------------------
DROP TABLE IF EXISTS `task_copy`;
CREATE TABLE `task_copy` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `task_type` smallint(6) DEFAULT NULL COMMENT '1.即时任务 2.定时任务 3.调试任务',
  `run_time` varchar(255) DEFAULT NULL,
  `task_desc` varchar(1000) DEFAULT NULL,
  `domain` varchar(500) DEFAULT NULL,
  `headers` mediumtext,
  `proxy` varchar(500) DEFAULT NULL,
  `params` mediumtext,
  `case` mediumtext,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` smallint(6) DEFAULT NULL,
  `result` mediumtext,
  `project_id` int(11) DEFAULT NULL,
  `daily_result` mediumtext,
  `value_type` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for task_count
-- ----------------------------
DROP TABLE IF EXISTS `task_count`;
CREATE TABLE `task_count` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task_total` int(11) DEFAULT NULL,
  `sucess` int(11) DEFAULT NULL,
  `fail` int(11) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=194 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tree
-- ----------------------------
DROP TABLE IF EXISTS `tree`;
CREATE TABLE `tree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` smallint(6) DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `index_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=426 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) DEFAULT NULL,
  `hash_password` varchar(80) DEFAULT NULL,
  `salt` varchar(80) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `status` smallint(6) unsigned zerofill DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `account_type` int(10) unsigned zerofill DEFAULT NULL,
  `szwego_url` varchar(255) DEFAULT NULL,
  `szwego_token` varchar(500) DEFAULT NULL,
  `get_status` smallint(5) unsigned zerofill DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
