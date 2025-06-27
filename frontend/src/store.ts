import {createStore, Store} from 'vuex'
import {Book} from "@/model/book";
import api from "@/services/api";
import {ResponseBook} from "@/services/type";

interface StoreBook {
    books: Book[];
    editingId: number | null;
    loading: boolean;
    error: string | null;
}

const store: Store<StoreBook> = createStore<StoreBook>({
    state: {
        books: [],
        editingId: null,
        loading: false,
        error: null,
    },
    getters: {
        books: (state: StoreBook) => state.books,
        editingId: (state: StoreBook) => state.editingId,
        loading: (state: StoreBook) => state.loading,
        error: (state: StoreBook) => state.error,
    },
    mutations: {
        SET_BOOKS(state: StoreBook, books: Book[]): void {
            state.books = books
        },
        ADD_BOOK(state: StoreBook, book: Book): void {
            state.books.push(book)
        },
        UPDATE_BOOK(state: StoreBook, updatedBook: Book): void {
            state.books = state.books.map((value: Book): Book =>
                value.id === updatedBook.id ? updatedBook : value
            )
        },
        DELETE_BOOK(state: StoreBook, id: number): void {
            state.books = state.books.filter((value: Book): boolean => value.id !== id)
        },
        SET_LOADING(state: StoreBook, loading: boolean): void {
            state.loading = loading
        },
        SET_ERROR(state: StoreBook, error: string): void {
            state.error = error
        },
        SET_EDITING_ID(state: StoreBook, id: number | null): void {
            console.log(id)
            state.editingId = id
        }
    },
    actions: {
        async fetchBooks({ commit }): Promise<void> {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                const response: ResponseBook<Book[]> = await api.getAllBooks()
                commit('SET_BOOKS', response.data)
            } catch {
                commit('SET_ERROR', 'Ошибка загрузки книг')
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async addBook({ commit }, book: Book): Promise<void> {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                const response: ResponseBook<Book> = await api.createBook(book)
                commit('ADD_BOOK', response.data)
            } catch {
                commit('SET_ERROR', 'Ошибка добавления книги')
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async updateBook({ commit }, book: Book): Promise<void> {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)

            try {
                const response: ResponseBook<Book> = await api.updateBook(book)
                commit('UPDATE_BOOK', response.data)
                commit('SET_EDITING_ID', null)
            } catch {
                commit('SET_ERROR', 'Ошибка обновления книги')
            } finally {
                commit('SET_LOADING', false)
            }
        },
        async deleteBook({ commit, dispatch }, bookId: number): Promise<void> {
            commit('SET_LOADING', true)
            commit('SET_ERROR', null)
            try {
                const response: ResponseBook<Book> = await api.deleteBook(bookId)
                commit('DELETE_BOOK', response.data)
                commit('SET_EDITING_ID', null)
                dispatch('fetchBooks')
            } catch {
                commit('SET_ERROR', 'Ошибка удаления книги')
            } finally {
                commit('SET_LOADING', false)
            }
        },
        editBook({ commit }, id: number): void {
            commit('SET_EDITING_ID', id)
        },
        cancelEdit({ commit }): void {
            commit('SET_EDITING_ID', null)
        }
    },
    modules: {}
})

export default store