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
            newState.unshift({ ...action.payload, temp: true });
            break;
        case constants.CREATE_AUTHOR_REAL:
            author = newState.find(author => author.id === action.payload.uuid);
            if (author) {
                delete author.temp;
                author.id = action.payload.id;
            }
            break;
        case constants.CREATE_AUTHOR_UNDO:
            //console.log('undo', action.payload)
            newState = newState.filter(author => author.id !== action.payload.id);
            break;
        case constants.DELETE_AUTHOR:
            author = newState.find(author => author.id === action.payload.id);
            if (author) {
                author.deleted = true;
            }
            break;
        case constants.DELETE_AUTHOR_REAL:
            newState = newState.filter(author => author.id !== action.payload.id);
            break;
        case constants.DELETE_AUTHOR_UNDO:
            author = newState.find(author => author.id === action.payload.id);
            if (author) {
                delete author.deleted;
            }
            break;
        case constants.UPDATE_AUTHOR:
            author = newState.find(author => author.id === action.payload.id);
            if (author) {
                for (let key in action.payload) {
                    author[key] = action.payload[key];
                }
                // author.id = action.payload.author.id;
                // author.name = action.payload.author.name;
                // author.surname = action.payload.author.surname;
                // author.nickname = action.payload.author.nickname;
                // author.born = action.payload.author.born;
                author.temp = true;
            }
            break;
        case constants.UPDATE_AUTHOR_REAL:
            author = newState.find(author => author.id === action.payload.id);
            if (author) {
                delete author.temp;
                delete author.old;
            }
            break;
        case constants.UPDATE_AUTHOR_UNDO:
            //console.log('UNDO', action.payload)
            author = newState.find(author => author.id === action.payload.id);
            if (author) {
                for (let key in action.payload.old) {
                    author[key] = action.payload.old[key];
                }
                delete author.temp;
                delete author.old;
            }
            break;
        default:
    }

    return newState;

}