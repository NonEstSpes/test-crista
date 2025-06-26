package org.example.backend.core.controller;

import org.example.backend.core.dto.Response;
import org.example.backend.core.dto.Status;
import org.example.backend.core.entities.Book;
import org.example.backend.core.services.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BookController {
    private final BookService bookService;

    public BookController(final BookService bookService){
        this.bookService = bookService;
    }

    @GetMapping("/books")
    public Response<List<Book>> getAllBooks() {
        List<Book> books = this.bookService.read();
        return new Response<>(Status.SUCCESS, books, null);
    }

    @PostMapping("/new_book")
    public Response<Book> newBook(@RequestBody Book book) {
        Book newBook = this.bookService.create(book);
        return new Response<>(Status.SUCCESS, newBook, null);
    }

    @PutMapping("/update_book")
    public Response<Book> updateBook(@RequestBody Book book) {
        try {
            this.bookService.update(book);
            return new Response<>(Status.SUCCESS, book, null);
        } catch (Exception e) {
            return new Response<>(Status.ERROR, null, e.getMessage());
        }
    }

    @DeleteMapping("/delete_book")
    public Response<Book> deleteBook(@RequestBody Book book) {
        try {
            this.bookService.delete(book);
            return new Response<>(Status.SUCCESS, book, null);
        } catch (Exception e) {
            return new Response<>(Status.ERROR, null, e.getMessage());
        }
    }
}
