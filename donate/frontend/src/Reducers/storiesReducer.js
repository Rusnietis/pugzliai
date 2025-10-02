import * as constants from '../Constants/stories';
// patikrinta
// funkcija, kuri apdoroja autoriu lista is serverio
export default function storiesReducer(state, action) {

    let newState = structuredClone(state ? state : []);
    let stories = null;

    switch (action.type) {
        case constants.GET_STORIES_FROM_SERVER:
            newState = action.payload;
            break;
        case constants.ADD_STORY:
            return [...state, action.payload];
        default:
    }

    return newState;

}