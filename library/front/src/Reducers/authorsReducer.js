import * as author from '../Constants/authors'

// funkcija, kuri apdoroja autoriu lista is serverio
export default function authorsReducer(state, action) {

    let newState;

    switch (action.type) {
        case author.GET_AUTHORS_FROM_SERVER:
            newState = action.payload;
            break;
        default:
            newState = [...state ?? []];
    }

    return newState;

}