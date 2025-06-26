package org.example.backend.core.dto;

public record Response<T>(Status status, T data, String error) {}
