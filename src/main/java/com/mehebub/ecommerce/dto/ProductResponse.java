package com.mehebub.ecommerce.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;

    private String productCode;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer stock;

    private String categoryCode;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}