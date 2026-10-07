package com.mehebub.ecommerce.mapper;

import com.mehebub.ecommerce.dto.RegisterRequest;
import com.mehebub.ecommerce.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toEntity(RegisterRequest request) {

        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .phone(request.getPhone())
                .role("CUSTOMER")
                .status("ACTIVE")
                .build();
    }
}