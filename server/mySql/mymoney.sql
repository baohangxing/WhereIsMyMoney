/*
Navicat MySQL Data Transfer

Source Server         : 阿里云
Source Server Version : 50727
Source Host           : 39.105.33.31:3306
Source Database       : mymoney

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-05-05 16:02:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for appVersions
-- ----------------------------
DROP TABLE IF EXISTS `appVersions`;
CREATE TABLE `appVersions` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `appVersion` varchar(10) CHARACTER SET utf8 DEFAULT NULL COMMENT '版本号',
  `appDownloadLink` varchar(128) CHARACTER SET utf8 DEFAULT NULL COMMENT 'app下载链接',
  `updateTip` varchar(4000) CHARACTER SET utf8 DEFAULT NULL COMMENT '版本说明',
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0',
  `createdTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

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
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for defaultTypes
-- ----------------------------
DROP TABLE IF EXISTS `defaultTypes`;
CREATE TABLE `defaultTypes` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(16) NOT NULL COMMENT '类型名称',
  `type` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '类型 默认0 0支出 1收入',
  `icon` varchar(32) CHARACTER SET ascii NOT NULL COMMENT '类型的图片',
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(16) NOT NULL COMMENT '用户名',
  `password` varchar(64) NOT NULL COMMENT '密码',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `avatar` varchar(256) DEFAULT NULL COMMENT '头像',
  `createdTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `deleteFlag` tinyint(1) unsigned zerofill NOT NULL DEFAULT '0' COMMENT '是否删除',
  `weixinId` varchar(16) DEFAULT NULL,
  `qqId` varchar(16) DEFAULT NULL,
  `administrator` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11122 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for userTypes
-- ----------------------------
DROP TABLE IF EXISTS `userTypes`;
CREATE TABLE `userTypes` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `userId` int(8) NOT NULL COMMENT '用户id',
  `name` varchar(16) NOT NULL COMMENT '类型名称',
  `type` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '类型 默认0 0支出 1收入',
  `icon` varchar(16) CHARACTER SET ascii NOT NULL COMMENT '类型的图片',
  `deleteFlag` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
