package com.spring.app.dto.requests;

import lombok.Data;

@Data
public class MessageResponse {
    String message;

    public MessageResponse(String message) {
        this.message = message;
    }
}
