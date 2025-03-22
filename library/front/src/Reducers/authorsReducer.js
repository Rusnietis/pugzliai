import * as author from '../Constants/authors';
// patikrinta
// funkcija, kuri apdoroja autoriu lista is serverio
export default function authorsReducer(state, action) {

    let newState;

    switch (action.type) {
        case author.GET_AUTHORS_FROM_SERVER:
            newState = action.payload;
            break;
        case author.CREATE_AUTHOR:
            newState = [...state, { ...action.payload, temp: true }];
            break;
        case author.CREATE_AUTHOR_REAL:
            newState = state.map(author => {
                if (author.id === action.payload.uuid) {
                    const a = { ...author};
                    delete a.temp;
                    a.id = action.payload.id;
                    return a;
                }
                return author;
            });
            break;
        default:
            newState = [...state ?? []];
    }

    return newState;

}