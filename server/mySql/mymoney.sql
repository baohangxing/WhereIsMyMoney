/*
Navicat MySQL Data Transfer

Source Server         : 阿里云
Source Server Version : 50727
Source Host           : 39.105.33.31:3306
Source Database       : mymoney

Target Server Type    : MYSQL
Target Server Version : 50727
File Encoding         : 65001

Date: 2020-04-11 14:06:00
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
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bills
-- ----------------------------

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
-- Records of defaultTypes
-- ----------------------------
INSERT INTO `defaultTypes` VALUES ('1', '三餐', '0', 'type_food', '0');
INSERT INTO `defaultTypes` VALUES ('2', '衣服', '0', 'type_clothes', '0');
INSERT INTO `defaultTypes` VALUES ('3', '交通', '0', 'type_ditie', '0');
INSERT INTO `defaultTypes` VALUES ('4', '旅行', '0', 'type_tour', '0');
INSERT INTO `defaultTypes` VALUES ('5', '网费话费', '0', 'type_online', '0');
INSERT INTO `defaultTypes` VALUES ('6', '学习', '0', 'type_study', '0');
INSERT INTO `defaultTypes` VALUES ('7', '日用品', '0', 'type_dayuse', '0');
INSERT INTO `defaultTypes` VALUES ('8', '住房', '0', 'type_house', '0');
INSERT INTO `defaultTypes` VALUES ('9', '医疗', '0', 'type_hospitol', '0');
INSERT INTO `defaultTypes` VALUES ('10', '发红包', '0', 'type_hongbao', '0');
INSERT INTO `defaultTypes` VALUES ('11', '娱乐游戏', '0', 'type_funny', '0');
INSERT INTO `defaultTypes` VALUES ('12', '请客送礼', '0', 'type_dinner', '0');
INSERT INTO `defaultTypes` VALUES ('13', '电器数码', '0', 'type_electric', '0');
INSERT INTO `defaultTypes` VALUES ('14', '运动', '0', 'type_sports', '0');
INSERT INTO `defaultTypes` VALUES ('15', '零食', '0', 'type_eat', '0');
INSERT INTO `defaultTypes` VALUES ('16', '水果', '0', 'type_fruit', '0');
INSERT INTO `defaultTypes` VALUES ('17', '其他', '0', 'type_others', '0');
INSERT INTO `defaultTypes` VALUES ('18', '工资', '1', 'type_CombinedShape', '0');
INSERT INTO `defaultTypes` VALUES ('19', '生活费', '1', 'type_life', '0');
INSERT INTO `defaultTypes` VALUES ('20', '收红包', '1', 'type_hongbao', '0');
INSERT INTO `defaultTypes` VALUES ('21', '外快', '1', 'type_WaiKuai', '0');
INSERT INTO `defaultTypes` VALUES ('22', '股票基金', '1', 'type_gupiao', '0');
INSERT INTO `defaultTypes` VALUES ('23', '其他', '1', 'type_others', '0');

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
INSERT INTO `users` VALUES ('11111', '何足道', 'e10adc3949ba59abbe56e057f20f883e', '2292398086@qq.com', '28', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1586355963649&di=e0f367c162e9a003457886460c0705a8&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F21%2F09%2F01200000026352136359091694357.jpg', '2020-04-08 19:38:53', '0', null, null);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of userTypes
-- ----------------------------
