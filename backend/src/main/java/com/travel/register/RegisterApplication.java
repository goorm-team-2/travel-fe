package com.travel.register;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RegisterApplication {

    public static void main(String[] args) {
        // 스프링 부트가 시작될 때 자동으로 src/main/resources/application.properties를 로드
        SpringApplication.run(RegisterApplication.class, args);
    }

}