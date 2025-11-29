package com.logistics.vo;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "分页结果")
public class PageVO<T> {

    @Schema(description = "数据列表")
    private List<T> list;

    @Schema(description = "总记录数")
    private Long total;

    @Schema(description = "当前页码")
    private Integer page;

    @Schema(description = "每页数量")
    private Integer pageSize;

    @Schema(description = "总页数")
    private Integer totalPages;

    public static <T> PageVO<T> of(List<T> list, Long total, Integer page, Integer pageSize) {
        PageVO<T> pageVO = new PageVO<>();
        pageVO.setList(list);
        pageVO.setTotal(total);
        pageVO.setPage(page);
        pageVO.setPageSize(pageSize);
        pageVO.setTotalPages((int) Math.ceil((double) total / pageSize));
        return pageVO;
    }
}
