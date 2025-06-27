package org.example.backend.core.response;

import lombok.Getter;

@Getter
public class Response <T> {
    private Status status;
    private T data;
    private String error;

    public Response(Status status, T data) {
        this.status = status;
        this.data = data;
    }
    public Response(Status status, String error) {
        this.status = status;
        this.error = error;
    }
}
