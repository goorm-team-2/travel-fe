package com.travel.register.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    // .env.local의 값을 주입받음
    @Value("${JWT_SECRET}")
    private String secretKeyPlain;

    @Value("${JWT_EXPIRATION}")
    private long expirationTime;

    private Key key;

    // 빈 초기화 시 Key 객체를 생성
    @PostConstruct
    protected void init() {
        this.key = Keys.hmacShaKeyFor(secretKeyPlain.getBytes(StandardCharsets.UTF_8));
    }

    public String createToken(String email) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + expirationTime)) // 주입받은 시간 사용
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}