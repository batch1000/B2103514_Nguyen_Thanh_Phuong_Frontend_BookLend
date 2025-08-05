import { apiService } from '../api.service';

export const bookService = {
    async getAllGenre() {
        return apiService.get('book/getAllGenre');
    },

    async getAllBook() {
        return apiService.get('book/getAllBook');
    },

    async getOneBook(keyword) {
        return apiService.post('book/getOneBook', { keyword });
    },

    async getBookById(id) {
        return apiService.post('book/getBookById', { id });
    },

    async addBook(data) {
        return apiService.post('book/addbook', data);
    },

    async updateBook(id, data) {
        return apiService.post(`book/updateBook/${id}`, data);
    },

    async deleteBook(id) {
        return apiService.post(`book/deleteBook/${id}`);
    },

    async lendBook(data) {
        return apiService.post('book/lendBook', data);
    },

    async getInfoLendBook(data) {
        return apiService.post('book/getInfoLendBook', data);
    },

    async getTrackBorrowBook() {
        const response = await apiService.get('book/getTrackBorrowBook');
        return response;
    },
      
    async updateBorrowStatus(data) {
        return apiService.post('book/updateBorrowStatus', data);
    },

    async extendBorrowTime(data) {
        return apiService.post('book/extendBorrowTime', data);
    },

    async getBorrowBookOfUser(id) {
        return apiService.get(`book/getBorrowBookOfUser/${id}`);
    },
};