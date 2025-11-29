import type { Address, LogisticsInfo, Order, User } from '@/types'

/**
 * 模拟用户数据
 */
export const mockUsers: User[] = [
  {
    id: 'user_001',
    username: '张三',
    phone: '13800138000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
    createdAt: '2024-01-01T10:00:00.000Z',
  },
]

/**
 * 模拟订单数据
 */
export const mockOrders: Order[] = [
  {
    id: 'order_001',
    trackingNumber: 'SF1234567890',
    courierCompany: '顺丰速运',
    courierLogo: '🚀',
    status: 'in_transit',
    itemName: '电子产品',
    sender: {
      name: '李明',
      phone: '13900139000',
      address: '广东省深圳市南山区科技园',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-11-30 18:00',
    createdAt: '2024-11-27T08:00:00.000Z',
    updatedAt: '2024-11-28T12:00:00.000Z',
  },
  {
    id: 'order_002',
    trackingNumber: 'JD9876543210',
    courierCompany: '京东物流',
    courierLogo: '📦',
    status: 'delivered',
    itemName: '图书',
    sender: {
      name: '王芳',
      phone: '13700137000',
      address: '上海市浦东新区张江高科技园区',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-11-26 15:00',
    createdAt: '2024-11-24T10:00:00.000Z',
    updatedAt: '2024-11-26T14:30:00.000Z',
  },
  {
    id: 'order_003',
    trackingNumber: 'ZTO5678901234',
    courierCompany: '中通快递',
    courierLogo: '🚚',
    status: 'in_transit',
    itemName: '服装',
    sender: {
      name: '赵敏',
      phone: '13600136000',
      address: '浙江省杭州市滨江区网商路',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-11-29 20:00',
    createdAt: '2024-11-26T14:00:00.000Z',
    updatedAt: '2024-11-28T10:00:00.000Z',
  },
  {
    id: 'order_004',
    trackingNumber: 'YTO3456789012',
    courierCompany: '圆通速递',
    courierLogo: '📮',
    status: 'pending',
    itemName: '日用品',
    sender: {
      name: '孙强',
      phone: '13500135000',
      address: '江苏省南京市江宁区',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-12-01 10:00',
    createdAt: '2024-11-28T09:00:00.000Z',
    updatedAt: '2024-11-28T09:00:00.000Z',
  },
  {
    id: 'order_005',
    trackingNumber: 'SF2345678901',
    courierCompany: '顺丰速运',
    courierLogo: '🚀',
    status: 'delivered',
    itemName: '数码配件',
    sender: {
      name: '周杰',
      phone: '13400134000',
      address: '广东省广州市天河区珠江新城',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-11-25 16:00',
    createdAt: '2024-11-23T11:00:00.000Z',
    updatedAt: '2024-11-25T15:45:00.000Z',
  },
  {
    id: 'order_006',
    trackingNumber: 'JD8765432109',
    courierCompany: '京东物流',
    courierLogo: '📦',
    status: 'in_transit',
    itemName: '食品',
    sender: {
      name: '吴倩',
      phone: '13300133000',
      address: '四川省成都市高新区',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-11-30 12:00',
    createdAt: '2024-11-27T13:00:00.000Z',
    updatedAt: '2024-11-28T11:00:00.000Z',
  },
  {
    id: 'order_007',
    trackingNumber: 'ZTO6789012345',
    courierCompany: '中通快递',
    courierLogo: '🚚',
    status: 'exception',
    itemName: '家居用品',
    sender: {
      name: '郑浩',
      phone: '13200132000',
      address: '湖北省武汉市光谷',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    createdAt: '2024-11-25T16:00:00.000Z',
    updatedAt: '2024-11-27T18:00:00.000Z',
  },
  {
    id: 'order_008',
    trackingNumber: 'SF3456789012',
    courierCompany: '顺丰速运',
    courierLogo: '🚀',
    status: 'in_transit',
    itemName: '化妆品',
    sender: {
      name: '冯丽',
      phone: '13100131000',
      address: '上海市徐汇区淮海中路',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-11-29 14:00',
    createdAt: '2024-11-26T17:00:00.000Z',
    updatedAt: '2024-11-28T09:30:00.000Z',
  },
  {
    id: 'order_009',
    trackingNumber: 'YTO4567890123',
    courierCompany: '圆通速递',
    courierLogo: '📮',
    status: 'delivered',
    itemName: '运动器材',
    sender: {
      name: '陈涛',
      phone: '13000130000',
      address: '天津市滨海新区',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-11-27 10:00',
    createdAt: '2024-11-25T08:00:00.000Z',
    updatedAt: '2024-11-27T09:45:00.000Z',
  },
  {
    id: 'order_010',
    trackingNumber: 'JD7654321098',
    courierCompany: '京东物流',
    courierLogo: '📦',
    status: 'pending',
    itemName: '办公用品',
    sender: {
      name: '卫青',
      phone: '12900129000',
      address: '重庆市渝北区',
    },
    receiver: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号',
    },
    estimatedTime: '2024-12-02 16:00',
    createdAt: '2024-11-28T10:30:00.000Z',
    updatedAt: '2024-11-28T10:30:00.000Z',
  },
]

/**
 * 模拟物流详情数据
 */
export const mockLogistics: Record<string, LogisticsInfo> = {
  order_001: {
    orderId: 'order_001',
    trackingNumber: 'SF1234567890',
    timeline: [
      {
        time: '2024-11-28 12:00:00',
        location: '北京市朝阳区',
        status: '运输中',
        description: '【北京朝阳区】快件已到达北京朝阳区分拨中心',
        isActive: true,
      },
      {
        time: '2024-11-28 06:30:00',
        location: '河北省廊坊市',
        status: '运输中',
        description: '【廊坊市】快件已从廊坊分拨中心发出，正在运往北京',
        isActive: false,
      },
      {
        time: '2024-11-27 20:15:00',
        location: '河北省廊坊市',
        status: '运输中',
        description: '【廊坊市】快件已到达廊坊分拨中心',
        isActive: false,
      },
      {
        time: '2024-11-27 14:00:00',
        location: '广东省深圳市',
        status: '已发货',
        description: '【深圳市】快件已从深圳南山区揽收点发出',
        isActive: false,
      },
      {
        time: '2024-11-27 08:00:00',
        location: '广东省深圳市',
        status: '已揽收',
        description: '【深圳市】顺丰速运已揽收快件',
        isActive: false,
      },
    ],
  },
  order_002: {
    orderId: 'order_002',
    trackingNumber: 'JD9876543210',
    timeline: [
      {
        time: '2024-11-26 14:30:00',
        location: '北京市朝阳区',
        status: '已签收',
        description: '您的快件已签收，感谢使用京东物流',
        isActive: true,
      },
      {
        time: '2024-11-26 10:15:00',
        location: '北京市朝阳区',
        status: '派送中',
        description: '【北京朝阳区】快件正在派送中，派送员：王师傅 15812345678',
        isActive: false,
      },
      {
        time: '2024-11-26 08:00:00',
        location: '北京市朝阳区',
        status: '运输中',
        description: '【北京朝阳区】快件已到达北京朝阳营业部',
        isActive: false,
      },
      {
        time: '2024-11-25 18:30:00',
        location: '河北省廊坊市',
        status: '运输中',
        description: '【廊坊市】快件已到达廊坊转运中心',
        isActive: false,
      },
      {
        time: '2024-11-25 06:00:00',
        location: '上海市浦东新区',
        status: '已发货',
        description: '【上海浦东】快件已从上海浦东分拨中心发出',
        isActive: false,
      },
      {
        time: '2024-11-24 10:00:00',
        location: '上海市浦东新区',
        status: '已揽收',
        description: '【上海浦东】京东物流已揽收快件',
        isActive: false,
      },
    ],
  },
  order_003: {
    orderId: 'order_003',
    trackingNumber: 'ZTO5678901234',
    timeline: [
      {
        time: '2024-11-28 10:00:00',
        location: '河北省保定市',
        status: '运输中',
        description: '【保定市】快件已到达保定转运中心',
        isActive: true,
      },
      {
        time: '2024-11-27 22:30:00',
        location: '河北省石家庄市',
        status: '运输中',
        description: '【石家庄市】快件已从石家庄转运中心发出',
        isActive: false,
      },
      {
        time: '2024-11-27 14:15:00',
        location: '山东省济南市',
        status: '运输中',
        description: '【济南市】快件已到达济南转运中心',
        isActive: false,
      },
      {
        time: '2024-11-27 02:00:00',
        location: '浙江省杭州市',
        status: '已发货',
        description: '【杭州市】快件已从杭州滨江区网点发出',
        isActive: false,
      },
      {
        time: '2024-11-26 14:00:00',
        location: '浙江省杭州市',
        status: '已揽收',
        description: '【杭州市】中通快递已揽收快件',
        isActive: false,
      },
    ],
  },
}

/**
 * 根据订单ID获取物流信息
 */
export function getLogisticsByOrderId(orderId: string): LogisticsInfo | null {
  return mockLogistics[orderId] || null
}

/**
 * 根据快递单号获取订单信息
 */
export function getOrderByTrackingNumber(trackingNumber: string): Order | null {
  return mockOrders.find(order => order.trackingNumber === trackingNumber) || null
}

/**
 * 模拟地址数据
 */
export const mockAddresses: Address[] = [
  {
    id: 'addr_001',
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '建国路88号soho现代城',
    fullAddress: '北京市北京市朝阳区建国路88号soho现代城',
    tag: '家',
    isDefault: true,
    type: 'receiver',
    createdAt: '2024-01-15T10:00:00.000Z',
  },
  {
    id: 'addr_002',
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '海淀区',
    detail: '中关村大街1号中关村创业大厦5层',
    fullAddress: '北京市北京市海淀区中关村大街1号中关村创业大厦5层',
    tag: '公司',
    isDefault: false,
    type: 'receiver',
    createdAt: '2024-02-20T14:30:00.000Z',
  },
  {
    id: 'addr_003',
    name: '李明',
    phone: '13900139000',
    province: '广东省',
    city: '深圳市',
    district: '南山区',
    detail: '科技园科兴科学园B栋10层',
    fullAddress: '广东省深圳市南山区科技园科兴科学园B栋10层',
    tag: '公司',
    isDefault: true,
    type: 'sender',
    createdAt: '2024-03-10T09:00:00.000Z',
  },
  {
    id: 'addr_004',
    name: '王芳',
    phone: '13700137000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '张江高科技园区博云路2号',
    fullAddress: '上海市上海市浦东新区张江高科技园区博云路2号',
    tag: '仓库',
    isDefault: false,
    type: 'sender',
    createdAt: '2024-04-05T16:20:00.000Z',
  },
]
