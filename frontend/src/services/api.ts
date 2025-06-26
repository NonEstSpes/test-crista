import axios, {AxiosInstance, AxiosResponse} from "axios";
import {Book} from "@/model/book";

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
})

export default {
    getAllBooks(): Promise<AxiosResponse<Book[]>> {
        return apiClient.get('/books');
    },

    createBook(book: Book): Promise<AxiosResponse<Book>> {
        return apiClient.post('/new_book', book);
    },

    updateBook(book: Book): Promise<AxiosResponse<Book>> {
        return apiClient.put('/update_book', book);
    },

    deleteBook(book: Book): Promise<AxiosResponse<Book>> {
        return apiClient.delete('/delete_book', book);
    }
}