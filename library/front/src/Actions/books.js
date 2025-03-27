import * as  constants from '../Constants/books';

export function getBooks(books) {

    return {
        
        type: constants.GET_BOOKS_FROM_SERVER,
        payload: books
    }
}

export function storeBookAsTemp(book) {
    return {
        type: constants.CREATE_BOOK,
        payload: book
    }
}

export function storeBookAsReal(response) {
    return {
        type: constants.CREATE_BOOK_REAL,
        payload: response
    }
}

export function storeBookAsUndo(book) {
    return {
        type: constants.CREATE_BOOK_UNDO,
        payload: book
    }
}

export function deleteBookAsTemp(book) {
    return {
        type: constants.DELETE_BOOK,
        payload: book
    }
}

export function deleteBookAsReal(response) {
    return {
        type: constants.DELETE_BOOK_REAL,
        payload: response
    }
}

export function deleteBookAsUndo(book) {
    return {
        type: constants.DELETE_BOOK_UNDO,
        payload: book
    }
}

export function updateBookAsTemp(book) {
    return {
        type: constants.UPDATE_BOOK,
        payload: book
    }
}
    


export function updateBookAsReal(response) {
    return {
        type: constants.UPDATE_BOOK_REAL,
        payload: response
    }
}

export function updateBookAsUndo(book) {
    return {
        type: constants.UPDATE_BOOK_UNDO,
        payload: book
    }
}
