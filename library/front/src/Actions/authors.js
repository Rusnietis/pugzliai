import * as  author from '../Constants/authors';

export function getAuthors(authors) {

    return {
        type: author.GET_AUTHORS_FROM_SERVER,
        payload: authors
    }
}