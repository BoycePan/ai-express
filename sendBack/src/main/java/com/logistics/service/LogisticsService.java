package com.logistics.service;

import com.logistics.dto.LogisticsNodeDTO;
import com.logistics.vo.LogisticsNodeVO;
import com.logistics.vo.LogisticsTrackingVO;

public interface LogisticsService {

    LogisticsTrackingVO getLogisticsByOrderId(Long orderId);

    LogisticsNodeVO addLogisticsNode(LogisticsNodeDTO nodeDTO);
}
