DROP TABLE IF EXISTS `blog_topic`;

CREATE TABLE `blog_topic` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `allow_comment` tinyint(11) NOT NULL DEFAULT '1' COMMENT '1 为允许， 0 为不允许',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime NOT NULL,
  `is_public` tinyint(11) NOT NULL DEFAULT '1' COMMENT '1 为公开，0 为不公开',
  PRIMARY KEY (`id`),
  KEY `create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `blog_user`;

CREATE TABLE `blog_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL DEFAULT '',
  `type` tinyint(11) NOT NULL DEFAULT '1' COMMENT '1 为管理员  2 为编辑',
  `email` varchar(255) NOT NULL DEFAULT '',
  `create_time` datetime NOT NULL,
  `last_login_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;