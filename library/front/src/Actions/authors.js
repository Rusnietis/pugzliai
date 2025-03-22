import * as  constants from '../Constants/authors';

export function getAuthors(authors) {

    return {
        
        type: constants.GET_AUTHORS_FROM_SERVER,
        payload: authors
    }
}

export function storeAuthorAsTemp(author) {
    return {
        type: constants.CREATE_AUTHOR,
        payload: author
    }
}

export function storeAuthorAsReal(response) {
    return {
        type: constants.CREATE_AUTHOR_REAL,
        payload: response
    }
}