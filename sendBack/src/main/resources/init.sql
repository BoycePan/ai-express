-- 物流管理系统数据库初始化脚本
-- 创建数据库
CREATE DATABASE IF NOT EXISTS logistics_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE logistics_db;

-- 用户表
DROP TABLE IF EXISTS t_user;
CREATE TABLE t_user (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    phone VARCHAR(20) NOT NULL UNIQUE COMMENT '手机号',
    password VARCHAR(255) NOT NULL COMMENT '密码(加密)',
    avatar VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '是否删除(0-否,1-是)',
    INDEX idx_phone (phone),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 订单表
DROP TABLE IF EXISTS t_order;
CREATE TABLE t_order (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '订单ID',
    tracking_number VARCHAR(50) NOT NULL UNIQUE COMMENT '快递单号',
    courier_company VARCHAR(50) NOT NULL COMMENT '快递公司',
    courier_logo VARCHAR(255) DEFAULT NULL COMMENT '快递公司Logo',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' COMMENT '订单状态(pending-待取件,in_transit-运输中,delivered-已签收,exception-异常)',
    item_name VARCHAR(100) DEFAULT NULL COMMENT '物品名称',
    sender_name VARCHAR(50) NOT NULL COMMENT '寄件人姓名',
    sender_phone VARCHAR(20) NOT NULL COMMENT '寄件人电话',
    sender_address VARCHAR(255) NOT NULL COMMENT '寄件人地址',
    receiver_name VARCHAR(50) NOT NULL COMMENT '收件人姓名',
    receiver_phone VARCHAR(20) NOT NULL COMMENT '收件人电话',
    receiver_address VARCHAR(255) NOT NULL COMMENT '收件人地址',
    estimated_time VARCHAR(50) DEFAULT NULL COMMENT '预计送达时间',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '是否删除(0-否,1-是)',
    INDEX idx_tracking_number (tracking_number),
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- 物流节点表
DROP TABLE IF EXISTS t_logistics_node;
CREATE TABLE t_logistics_node (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '节点ID',
    order_id BIGINT NOT NULL COMMENT '订单ID',
    tracking_number VARCHAR(50) NOT NULL COMMENT '快递单号',
    time DATETIME NOT NULL COMMENT '物流时间',
    location VARCHAR(100) DEFAULT NULL COMMENT '当前位置',
    status VARCHAR(50) NOT NULL COMMENT '物流状态',
    description VARCHAR(255) DEFAULT NULL COMMENT '物流描述',
    is_active TINYINT DEFAULT 0 COMMENT '是否当前节点(0-否,1-是)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    INDEX idx_order_id (order_id),
    INDEX idx_tracking_number (tracking_number),
    INDEX idx_time (time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='物流节点表';

-- 地址表
DROP TABLE IF EXISTS t_address;
CREATE TABLE t_address (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '地址ID',
    name VARCHAR(50) NOT NULL COMMENT '联系人姓名',
    phone VARCHAR(20) NOT NULL COMMENT '联系电话',
    province VARCHAR(50) NOT NULL COMMENT '省份',
    city VARCHAR(50) NOT NULL COMMENT '城市',
    district VARCHAR(50) NOT NULL COMMENT '区县',
    detail VARCHAR(255) NOT NULL COMMENT '详细地址',
    tag VARCHAR(20) DEFAULT NULL COMMENT '地址标签(home-家,company-公司,school-学校)',
    is_default TINYINT DEFAULT 0 COMMENT '是否默认地址(0-否,1-是)',
    type VARCHAR(20) NOT NULL DEFAULT 'receiver' COMMENT '地址类型(sender-寄件,receiver-收件)',
    user_id BIGINT NOT NULL COMMENT '用户ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    deleted TINYINT DEFAULT 0 COMMENT '是否删除(0-否,1-是)',
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_default (is_default)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='地址表';

-- 插入测试数据
-- 测试用户 (密码: 123456)
INSERT INTO t_user (username, phone, password, avatar) VALUES
('张三', '13800138001', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1'),
('李四', '13800138002', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVKIUi', 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2');

-- 测试地址
INSERT INTO t_address (name, phone, province, city, district, detail, tag, is_default, type, user_id) VALUES
('张三', '13800138001', '广东省', '深圳市', '南山区', '科技园南路88号腾讯大厦', 'company', 1, 'sender', 1),
('张三', '13800138001', '广东省', '广州市', '天河区', '天河路385号太古汇', 'home', 0, 'receiver', 1),
('李四', '13800138002', '上海市', '上海市', '浦东新区', '世纪大道100号上海环球金融中心', 'company', 1, 'sender', 2),
('王五', '13900139001', '北京市', '北京市', '朝阳区', '建国路81号华贸中心', 'home', 1, 'receiver', 2);

-- 测试订单
INSERT INTO t_order (tracking_number, courier_company, courier_logo, status, item_name, sender_name, sender_phone, sender_address, receiver_name, receiver_phone, receiver_address, estimated_time, user_id) VALUES
('SF1234567890', '顺丰速运', 'https://img.alicdn.com/imgextra/i1/O1CN01F8pGFr1Wd3sMwVcLp_!!6000000002810-2-tps-120-120.png', 'in_transit', '电子产品', '张三', '13800138001', '广东省深圳市南山区科技园南路88号腾讯大厦', '李四', '13800138002', '上海市浦东新区世纪大道100号上海环球金融中心', '预计明天送达', 1),
('YT9876543210', '圆通速递', 'https://img.alicdn.com/imgextra/i4/O1CN01Gpe5Zv1TnVCrGJDa7_!!6000000002426-2-tps-120-120.png', 'delivered', '服装', '张三', '13800138001', '广东省深圳市南山区科技园南路88号腾讯大厦', '王五', '13900139001', '北京市朝阳区建国路81号华贸中心', '已签收', 1),
('ZTO2024001234', '中通快递', 'https://img.alicdn.com/imgextra/i3/O1CN01Cqn9dN1GfWJlDFDEK_!!6000000000650-2-tps-120-120.png', 'pending', '文件', '李四', '13800138002', '上海市浦东新区世纪大道100号上海环球金融中心', '张三', '13800138001', '广东省深圳市南山区科技园南路88号腾讯大厦', '预计3天内送达', 2);

-- 测试物流节点
INSERT INTO t_logistics_node (order_id, tracking_number, time, location, status, description, is_active) VALUES
-- SF1234567890 物流信息
(1, 'SF1234567890', '2024-01-15 09:00:00', '深圳市', '已揽收', '快件已从深圳市南山区揽收', 0),
(1, 'SF1234567890', '2024-01-15 14:30:00', '深圳市', '运输中', '快件已到达深圳集散中心', 0),
(1, 'SF1234567890', '2024-01-15 22:00:00', '杭州市', '运输中', '快件已到达杭州中转站', 0),
(1, 'SF1234567890', '2024-01-16 06:00:00', '上海市', '派送中', '快件已到达上海浦东派送站，正在派送', 1),
-- YT9876543210 物流信息
(2, 'YT9876543210', '2024-01-10 10:00:00', '深圳市', '已揽收', '快件已从深圳市揽收', 0),
(2, 'YT9876543210', '2024-01-11 08:00:00', '武汉市', '运输中', '快件经过武汉中转', 0),
(2, 'YT9876543210', '2024-01-12 15:00:00', '北京市', '派送中', '快件到达北京朝阳区派送站', 0),
(2, 'YT9876543210', '2024-01-12 18:30:00', '北京市', '已签收', '快件已签收，签收人：本人', 1),
-- ZTO2024001234 物流信息
(3, 'ZTO2024001234', '2024-01-16 11:00:00', '上海市', '待取件', '快递员已接单，等待上门取件', 1);
