package com.travel.register.controller;

import com.travel.register.dto.LoginRequest;
import com.travel.register.dto.SignupRequest;
import com.travel.register.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map; 
import com.travel.register.dto.TokenResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Valid @RequestBody SignupRequest request) {
        authService.signup(request);
        return ResponseEntity.ok("회원가입 성공");
    }

   @PostMapping("/login")
public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest request) {
    String token = authService.login(request);
    return ResponseEntity.ok(new TokenResponse(token));
}


    /*
     예약 버튼 클릭 시 로그인 확인용 API
     */
    @GetMapping("/check")
    public ResponseEntity<?> check() {
        return ResponseEntity.ok(Map.of("isLoggedIn", true));
    }
}