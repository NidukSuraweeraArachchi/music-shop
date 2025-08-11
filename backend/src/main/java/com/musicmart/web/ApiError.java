package com.musicmart.web;

import java.time.Instant;

public class ApiError {
    public int status;
    public String error;
    public String message;
    public String path;
    public Instant timestamp = Instant.now();

    public ApiError(int status, String error, String message, String path) {
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }
}
