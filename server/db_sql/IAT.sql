/*
MySQL Data Transfer
Source Host: ownerworld.tpddns.cn
Source Database: IAT
Target Host: ownerworld.tpddns.cn
Target Database: IAT
Date: 2019/1/28 11:41:31
*/

SET FOREIGN_KEY_CHECKS=0;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for sample
-- ----------------------------
DROP TABLE IF EXISTS `sample`;
CREATE TABLE `sample` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT NULL,
  `path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `param_type` smallint(6) DEFAULT NULL,
  `params` mediumtext COLLATE utf8mb4_unicode_ci,
  `asserts_type` smallint(6) DEFAULT NULL,
  `asserts_data` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extract_type` smallint(6) DEFAULT NULL,
  `extract_key_name` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `extract_data` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `add_time` timestamp NULL DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `project_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(500) DEFAULT NULL,
  `task_type` smallint(6) DEFAULT NULL,
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4;

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
  `phoneNumber` varchar(255) DEFAULT NULL,
  `account_type` int(10) unsigned zerofill DEFAULT NULL,
  `szwego_url` varchar(255) DEFAULT NULL,
  `szwego_token` varchar(500) DEFAULT NULL,
  `get_status` smallint(5) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `project` VALUES ('6', 'demo', '2019-01-22 03:29:01', '1', '44');
INSERT INTO `project` VALUES ('7', 'demo1', '2019-01-23 10:06:29', '1', '50');
INSERT INTO `sample` VALUES ('82', '145', '/crov/doLoginWithPass', 'POST', '3', '[{\"value\": \"666666677388\", \"type\": false, \"id\": 1548139972810, \"key\": \"account\"}, {\"value\": \"aaaaa12334\", \"type\": false, \"id\": 1548139981744, \"key\": \"password\"}, {\"value\": \"\", \"type\": false, \"id\": 1548139992743, \"key\": \"cartLocal\"}, {\"value\": \"aec320x54xxxx8e4ff3d3f1xxx\", \"type\": false, \"id\": 1548140007973, \"key\": \"deviceNo\"}, {\"value\": \"795ef42c399xxxxx09bxxxx63951d4a24\", \"type\": false, \"id\": 1548140025130, \"key\": \"pushInfo\"}, {\"value\": \"5\", \"type\": false, \"id\": 1548140037562, \"key\": \"pushType\"}]', '1', '[{\"id\": 1548145401299, \"value\": \"\\\"status\\\":\\\"1\\\"\"}]', '0', null, '[]', '2019-01-22 14:31:16', '44', '6');
INSERT INTO `sample` VALUES ('83', '146', '/api/IAT/taskList', 'POST', '3', '[{\"value\": \"1\", \"type\": false, \"id\": 1548140494371, \"key\": \"taskType\"}, {\"value\": \"\", \"type\": false, \"id\": 1548646042599, \"key\": \"\"}]', '1', '[{\"id\": 1548646035633, \"value\": \"\"}]', '1', 'taskId', '[{\"value\": \"content[0].id\", \"id\": 1548296801921, \"key\": \"taskId\"}]', '2019-01-22 15:01:22', '52', '6');
INSERT INTO `sample` VALUES ('84', '147', '/supplier/ask/profile', 'POST', '1', '[{\"value\": \"12\", \"type\": false, \"id\": 1548140946746, \"key\": \"versionCode\"}]', '1', '[{\"id\": 1548141019480, \"value\": \"\\\"code\\\":0\"}]', '1', '', '[{\"value\": \"\", \"id\": 1548646098855, \"key\": \"\"}]', '2019-01-22 15:09:01', '52', '6');
INSERT INTO `sample` VALUES ('85', '149', '/api/IAT/taskPrew', 'GET', '1', '[{\"value\": \"${taskId}\", \"type\": true, \"id\": 1548296922793, \"key\": \"id\"}, {\"value\": \"1548296863773\", \"type\": false, \"id\": 1548296935860, \"key\": \"_\"}]', '2', '[{\"value\": \"normal\\u8bf7\\u6c42\\u8c03\\u8bd5\", \"id\": 1548296949994, \"key\": \"content.testname\"}]', '0', null, '[]', '2019-01-24 02:28:43', '50', '6');
INSERT INTO `sample` VALUES ('86', '153', '/api/IAT/taskList', 'POST', '2', '[{\"value\": \"1\", \"type\": false, \"id\": 1548140494371, \"key\": \"taskType\"}]', '2', '[{\"value\": \"\", \"id\": 1548646081191, \"key\": \"\"}]', '1', '', '[{\"value\": \"\", \"id\": 1548646086275, \"key\": \"\"}]', '2019-01-24 02:36:19', '52', '6');
INSERT INTO `task` VALUES ('35', 'json类型接口调试', '1', '12:08', 'json类型接口调试', 'http://localhost:8000', '[]', '', '[]', '[146]', '2019-01-22 16:35:11', '44', '2019-01-22 08:43:51', '3', '[{\"Latency\": \"0\", \"allThreads\": \"1\", \"grpThreads\": \"1\", \"success\": \"False\", \"dataType\": \"text\", \"timeStamp\": \"1548146631286\", \"threadName\": \"json\\u7c7b\\u578b\\u63a5\\u53e3\\u8c03\\u8bd5 1-1\", \"bytes\": \"1236\", \"failureMessage\": \"nan\", \"label\": \"\\u5217\\u8868\\u6d4b\\u8bd5\", \"URL\": \"http://[localhost:8000]:8000/api/IAT/taskList\", \"responseMessage\": \"Non HTTP response message: Malformed IPv6 address at index 8: http://[localhost:8000]:8000/api/IAT/taskList\", \"responseCode\": \"Non HTTP response code: java.net.URISyntaxException\", \"IdleTime\": \"0\", \"elapsed\": \"0\", \"sentBytes\": \"0\", \"Connect\": \"0\"}]', '6', null);
INSERT INTO `task` VALUES ('36', 'json类型任务调试2', '1', '12:08', 'json类型任务调试2', 'http://localhost:800', '[]', '', '[]', '[146]', '2019-01-22 16:48:52', '44', '2019-01-22 08:49:02', '3', '[{\"Latency\": \"0\", \"allThreads\": \"1\", \"grpThreads\": \"1\", \"success\": \"False\", \"dataType\": \"text\", \"timeStamp\": \"1548146939415\", \"threadName\": \"json\\u7c7b\\u578b\\u4efb\\u52a1\\u8c03\\u8bd52 1-1\", \"bytes\": \"2834\", \"failureMessage\": \"nan\", \"label\": \"\\u5217\\u8868\\u6d4b\\u8bd5\", \"URL\": \"http://localhost:800/api/IAT/taskList\", \"responseMessage\": \"Non HTTP response message: Connect to localhost:800 [localhost/127.0.0.1, localhost/0:0:0:0:0:0:0:1] failed: Connection refused: connect\", \"responseCode\": \"Non HTTP response code: org.apache.http.conn.HttpHostConnectException\", \"IdleTime\": \"0\", \"elapsed\": \"2228\", \"sentBytes\": \"0\", \"Connect\": \"2228\"}]', '6', null);
INSERT INTO `task` VALUES ('37', 'json类型任务调试3', '1', '12:08', 'json类型任务调试3', 'http://localhost:8000', '[]', '', '[]', '[146]', '2019-01-22 16:49:58', '44', '2019-01-22 08:50:02', '3', '[{\"Latency\": \"119\", \"allThreads\": \"1\", \"grpThreads\": \"1\", \"success\": \"True\", \"dataType\": \"text\", \"timeStamp\": \"1548147002276\", \"threadName\": \"json\\u7c7b\\u578b\\u4efb\\u52a1\\u8c03\\u8bd53 1-1\", \"bytes\": \"1500\", \"failureMessage\": \"nan\", \"label\": \"\\u5217\\u8868\\u6d4b\\u8bd5\", \"URL\": \"http://localhost:8000/api/IAT/taskList\", \"responseMessage\": \"OK\", \"responseCode\": \"200\", \"IdleTime\": \"0\", \"elapsed\": \"119\", \"sentBytes\": \"204\", \"Connect\": \"23\"}]', '6', null);
INSERT INTO `task` VALUES ('40', 'tet', '2', '02:20', 'tewrwer', 'etwetwe', '[]', '', '[]', '[146]', '2019-01-23 01:26:26', '50', '2019-01-25 02:19:59', '1', null, '6', null);
INSERT INTO `task` VALUES ('41', '调试任务', '1', '12:08', '', 'https://app.made-in-china.com', '[]', '', '[]', '[147]', '2019-01-24 11:59:29', '45', '2019-01-24 12:59:41', '5', '[{\"Latency\": \"0\", \"allThreads\": \"1\", \"grpThreads\": \"1\", \"success\": \"False\", \"dataType\": \"text\", \"timeStamp\": \"1548334740548\", \"threadName\": \"\\u8c03\\u8bd5\\u4efb\\u52a1 1-1\", \"bytes\": \"2343\", \"failureMessage\": \"Test failed: text expected to contain /\\\"code\\\":0/\", \"label\": \"normal\", \"URL\": \"https://app.made-in-china.com/supplier/ask/profile\", \"responseMessage\": \"Non HTTP response message: app.made-in-china.com: Temporary failure in name resolution\", \"responseCode\": \"Non HTTP response code: java.net.UnknownHostException\", \"IdleTime\": \"0\", \"elapsed\": \"40063\", \"sentBytes\": \"0\", \"Connect\": \"40062\"}]', '6', null);
INSERT INTO `task` VALUES ('42', '法大师傅撒', '1', '12:08', '', 'https://app.made-in-china.com', '[]', '', '[]', '[147]', '2019-01-24 13:01:01', '45', '2019-01-25 01:07:16', '3', '[{\"Latency\": \"1485\", \"allThreads\": \"1\", \"grpThreads\": \"1\", \"success\": \"False\", \"dataType\": \"text\", \"timeStamp\": \"1548378434802\", \"threadName\": \"\\u6cd5\\u5927\\u5e08\\u5085\\u6492 1-1\", \"bytes\": \"490\", \"failureMessage\": \"Test failed: text expected to contain /\\\"code\\\":0/\", \"label\": \"normal\", \"URL\": \"https://app.made-in-china.com/supplier/ask/profile\", \"responseMessage\": \"OK\", \"responseCode\": \"200\", \"IdleTime\": \"0\", \"elapsed\": \"1510\", \"sentBytes\": \"244\", \"Connect\": \"1275\"}]', '6', null);
INSERT INTO `task_count` VALUES ('1', '2', '1', '1', '2019-02-01 15:51:30');
INSERT INTO `task_count` VALUES ('2', '2', '1', '1', '2019-01-19 15:53:12');
INSERT INTO `task_count` VALUES ('3', '2', '1', '1', '2019-01-19 15:55:17');
INSERT INTO `task_count` VALUES ('4', '2', '0', '2', '2019-01-19 22:28:48');
INSERT INTO `task_count` VALUES ('5', '2', '1', '1', '2019-01-20 15:55:31');
INSERT INTO `task_count` VALUES ('6', '15', '0', '15', '2019-01-20 22:31:51');
INSERT INTO `task_count` VALUES ('7', '17', '16', '1', '2019-01-20 22:44:15');
INSERT INTO `task_count` VALUES ('8', '1', '1', '0', '2019-01-22 16:22:51');
INSERT INTO `task_count` VALUES ('9', '1', '1', '0', '2019-01-22 16:31:54');
INSERT INTO `task_count` VALUES ('10', '1', '0', '1', '2019-01-22 16:43:52');
INSERT INTO `task_count` VALUES ('11', '1', '0', '1', '2019-01-22 16:49:02');
INSERT INTO `task_count` VALUES ('12', '1', '1', '0', '2019-01-22 16:50:03');
INSERT INTO `task_count` VALUES ('13', '1', '0', '1', '2019-01-22 16:51:30');
INSERT INTO `task_count` VALUES ('14', '1', '0', '1', '2019-01-24 12:41:41');
INSERT INTO `task_count` VALUES ('15', '1', '0', '1', '2019-01-24 12:53:26');
INSERT INTO `task_count` VALUES ('16', '1', '0', '1', '2019-01-24 12:59:41');
INSERT INTO `task_count` VALUES ('17', '1', '0', '1', '2019-01-24 13:01:54');
INSERT INTO `task_count` VALUES ('18', '1', '0', '1', '2019-01-24 13:37:37');
INSERT INTO `task_count` VALUES ('19', '1', '0', '1', '2019-01-25 01:07:17');
INSERT INTO `tree` VALUES ('54', '4', '0', '供应商APP', '1', '2019-01-14 14:26:38', '44', '0');
INSERT INTO `tree` VALUES ('66', '5', '0', '买家APP', '1', '2019-01-20 15:33:29', '44', '0');
INSERT INTO `tree` VALUES ('141', '6', '0', 'demo', '1', '2019-01-22 03:29:01', '44', '0');
INSERT INTO `tree` VALUES ('145', '6', '151', 'formdata', '2', '2019-01-22 14:31:08', '44', '1');
INSERT INTO `tree` VALUES ('146', '6', '150', '列表返回值保存参数', '2', '2019-01-22 15:01:06', '44', '2');
INSERT INTO `tree` VALUES ('147', '6', '151', 'normal', '2', '2019-01-22 15:08:55', '44', '3');
INSERT INTO `tree` VALUES ('148', '7', '0', 'demo1', '1', '2019-01-23 10:06:29', '50', '0');
INSERT INTO `tree` VALUES ('149', '6', '150', '任务详情调用获取参数', '2', '2019-01-24 02:28:38', '50', '4');
INSERT INTO `tree` VALUES ('150', '6', '141', '参数传递', '1', '2019-01-24 02:29:54', '50', '5');
INSERT INTO `tree` VALUES ('151', '6', '141', '不同请求类型参数', '1', '2019-01-24 02:30:22', '50', '6');
INSERT INTO `tree` VALUES ('153', '6', '151', 'json', '2', '2019-01-24 02:36:19', '44', '2');
INSERT INTO `users` VALUES ('45', 'admin', 'ca56f9607e85fc33ca968b4b2e3b544e46254178d6a0b73801ed4914386fba23', 'a267ff9503acc50826b1a1b41c53f724', 'adfas@fa.com', null, '0000000000', null, null, null);
INSERT INTO `users` VALUES ('47', 'test1', '420fd7ff6e29b20942d69f964dd18941e1a766504a73769197cb9676f01d3349', 'd75edb49b58249355d9e73f143c9c431', 'test@tes.com', null, null, null, null, null);
INSERT INTO `users` VALUES ('48', 'test2', '8f2b06fc9ee7563d552b0d2abb920b725f662d0261da95f5bd06b64bb34b7e0b', 'e1d83d80b859fd1713224f503eb45da0', 'test@tes.com', null, null, null, null, null);
