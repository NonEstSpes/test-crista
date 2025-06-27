import axios, {AxiosInstance} from "axios";
import {Book} from "@/model/book";
import {ResponseBook} from "@/services/type";

const apiClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
})

export default {
    getAllBooks(): Promise<ResponseBook<Book[]>> {
        return apiClient.get('/books').then((res) => res.data);
    },

    createBook(book: Book): Promise<ResponseBook<Book>> {
        return apiClient.post('/new_book', book).then((res) => res.data);
    },

    updateBook(book: Book): Promise<ResponseBook<Book>> {
        return apiClient.put('/update_book', book).then((res) => res.data);
    },

    deleteBook(bookId: number): Promise<ResponseBook<Book>> {
        return apiClient.delete('/delete_book', {
            params: {id: bookId}
        }).then((res) => res.data);
    }
}