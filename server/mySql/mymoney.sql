/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50716
Source Host           : localhost:3306
Source Database       : mymoney

Target Server Type    : MYSQL
Target Server Version : 50716
File Encoding         : 65001

Date: 2020-03-20 17:55:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bills
-- ----------------------------
DROP TABLE IF EXISTS `bills`;
CREATE TABLE `bills` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `userId` int(8) NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0' COMMENT '账单的类型 0支出 1收入',
  `defaultType` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否是官方的类型',
  `typeId` int(8) NOT NULL COMMENT '账单类型',
  `time` timestamp NOT NULL DEFAULT '2020-02-22 22:22:22' ON UPDATE CURRENT_TIMESTAMP COMMENT '账单时间',
  `createdTime` timestamp NOT NULL DEFAULT '2020-02-22 22:22:22' ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `description` varchar(128) DEFAULT NULL COMMENT '备注',
  `deleteFlag` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否删除',
  `amount` decimal(8,2) NOT NULL COMMENT '金额',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bills
-- ----------------------------
INSERT INTO `bills` VALUES ('1', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'foe test', '0', '22.00');
INSERT INTO `bills` VALUES ('2', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('3', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('4', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('5', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('6', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('7', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('8', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('9', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('10', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('11', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('12', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('13', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test', '0', '22.00');
INSERT INTO `bills` VALUES ('14', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('15', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('16', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('17', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('18', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('19', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('20', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('21', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('22', '11111', '1', '1', '1', '2020-03-19 22:14:02', '2020-03-19 22:14:02', 'for test 2222222222', '0', '22.00');
INSERT INTO `bills` VALUES ('23', '11111', '1', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('24', '11111', '0', '1', '1', '2020-03-19 22:27:03', '2020-03-19 22:27:03', 'for test 2222222222', '0', '10.22');
INSERT INTO `bills` VALUES ('25', '11111', '0', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('26', '11111', '0', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('27', '11111', '0', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('28', '11111', '0', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('29', '11111', '0', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('30', '11111', '0', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('31', '11111', '0', '1', '1', '2020-03-19 22:13:56', '2020-03-19 22:13:56', 'for test 2222222222', '0', '10.00');
INSERT INTO `bills` VALUES ('32', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('33', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('34', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('35', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('36', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('37', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('38', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('39', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('40', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('41', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('42', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('43', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('44', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('45', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('46', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('47', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('48', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('49', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('50', '11111', '0', '1', '1', '2020-03-19 22:28:14', '2020-03-19 22:28:14', 'for test 2222222222', '0', '11.50');
INSERT INTO `bills` VALUES ('51', '11111', '0', '1', '1', '2020-03-19 22:14:10', '2020-03-19 22:14:10', 'for test 2222222222', '0', '35.00');
INSERT INTO `bills` VALUES ('52', '11111', '0', '1', '1', '2020-03-19 22:14:10', '2020-03-19 22:14:10', 'for test 2222222222', '0', '35.00');
INSERT INTO `bills` VALUES ('53', '11111', '0', '1', '1', '2020-03-19 22:14:10', '2020-03-19 22:14:10', 'for test 2222222222', '0', '35.00');
INSERT INTO `bills` VALUES ('54', '11111', '0', '1', '1', '2020-03-19 22:14:10', '2020-03-19 22:14:10', 'for test 2222222222', '0', '35.00');
INSERT INTO `bills` VALUES ('55', '11111', '0', '1', '1', '2020-03-19 22:14:10', '2020-03-19 22:14:10', 'for test 2222222222', '0', '35.00');
INSERT INTO `bills` VALUES ('56', '11111', '0', '1', '1', '2020-03-19 22:06:41', '2020-03-19 22:18:27', 'for test 2222222222', '0', '12.00');
INSERT INTO `bills` VALUES ('57', '11111', '0', '1', '1', '2020-03-19 22:06:41', '2020-03-19 22:18:38', 'for test 2222222222', '0', '12.00');
INSERT INTO `bills` VALUES ('58', '11111', '0', '1', '1', '2020-03-19 22:06:41', '2020-03-19 22:18:39', 'for test 2222222222', '0', '12.00');
INSERT INTO `bills` VALUES ('59', '11111', '0', '1', '1', '2020-03-19 22:06:41', '2020-03-19 22:18:40', 'for test 2222222222', '0', '12.00');
INSERT INTO `bills` VALUES ('60', '11111', '0', '1', '1', '2020-03-19 23:02:12', '2020-03-19 23:02:12', 'for test 2222222222', '1', '12.00');
INSERT INTO `bills` VALUES ('61', '11111', '0', '1', '1', '2020-03-19 22:32:10', '2020-03-19 22:32:10', 'update', '0', '12.44');
INSERT INTO `bills` VALUES ('62', '11111', '0', '1', '1', '2020-03-19 22:06:41', '2020-03-19 22:27:54', 'for test 3333333', '0', '12.44');
INSERT INTO `bills` VALUES ('63', '11111', '0', '1', '1', '2020-03-19 22:06:41', '2020-03-19 22:27:55', 'for test 3333333', '0', '12.44');

-- ----------------------------
-- Table structure for defaulttypes
-- ----------------------------
DROP TABLE IF EXISTS `defaulttypes`;
CREATE TABLE `defaulttypes` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(16) NOT NULL COMMENT '类型名称',
  `type` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '类型 默认0 0支出 1收入',
  `icon` varchar(16) CHARACTER SET ascii NOT NULL COMMENT '类型的图片',
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of defaulttypes
-- ----------------------------
INSERT INTO `defaulttypes` VALUES ('1', '衣服', '0', 'e771', '1');
INSERT INTO `defaulttypes` VALUES ('2', '加油 修改后', '0', 'e77d', '0');
INSERT INTO `defaulttypes` VALUES ('3', '加油', '0', 'e777', '0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(16) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `useDays` int(8) unsigned NOT NULL DEFAULT '0',
  `avatar` varchar(256) DEFAULT NULL COMMENT '头像',
  `createdTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `deleteFlag` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0' COMMENT '是否删除',
  `weixinId` varchar(16) DEFAULT NULL,
  `qqId` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11113 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('11111', 'himple', 'e10adc3949ba59abbe56e057f20f883e', '2292398086@qq.com', '1', '1111111111111111.img', '2020-03-18 14:39:18', '0', null, null);
INSERT INTO `users` VALUES ('11112', '何足道1', 'e10adc3949ba59abbe56e057f20f883e', '1111111111@12.com', '1', null, '2020-03-18 13:39:39', '0', null, null);

-- ----------------------------
-- Table structure for usertypes
-- ----------------------------
DROP TABLE IF EXISTS `usertypes`;
CREATE TABLE `usertypes` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `userId` int(8) NOT NULL COMMENT '用户id',
  `name` varchar(16) NOT NULL COMMENT '类型名称',
  `type` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '类型 默认0 0支出 1收入',
  `icon` varchar(16) CHARACTER SET ascii NOT NULL COMMENT '类型的图片',
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of usertypes
-- ----------------------------
INSERT INTO `usertypes` VALUES ('1', '11111', '衣服', '0', 'e771', '1');
INSERT INTO `usertypes` VALUES ('2', '11111', '加油 修改后', '0', 'e771', '0');
INSERT INTO `usertypes` VALUES ('3', '11111', '出行', '0', 'e77d', '0');
