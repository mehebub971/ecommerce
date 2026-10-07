package com.mehebub.ecommerce.service;

import com.mehebub.ecommerce.dto.AuthResponse;
import com.mehebub.ecommerce.dto.LoginRequest;
import com.mehebub.ecommerce.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}