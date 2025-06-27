package org.example.backend.core.response;

public record Response<T>(Status status, T data, String error) {}
