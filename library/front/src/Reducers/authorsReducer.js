import * as constants from '../Constants/authors';
// patikrinta
// funkcija, kuri apdoroja autoriu lista is serverio
export default function authorsReducer(state, action) {

    let newState = structuredClone(state ? state : []);
    let author = null;

    switch (action.type) {
        case constants.GET_AUTHORS_FROM_SERVER:
            newState = action.payload;
            break;
        case constants.CREATE_AUTHOR:
            newState.push({ ...action.payload, temp: true });
            break;
        case constants.CREATE_AUTHOR_REAL:
            author = newState.find(author => author.id === action.payload.uuid);
            if (author) {
                delete author.temp;
                author.id = action.payload.id;
            }
            break;
        case constants.DELETE_AUTHOR:
            author = newState.find(author => author.id === action.payload.id);
            if (author) {
                author.deleted = true;
            }
            break;
        case constants.DELETE_AUTHOR_REAL:
            newState = newState.filter(author => author.id === action.payload.id);
            break;
        default:
    }

    return newState;

}