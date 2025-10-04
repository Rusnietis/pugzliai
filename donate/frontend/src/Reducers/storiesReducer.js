import * as constants from '../Constants/stories';
import { SERVER_URL } from '../Constants/main';
// patikrinta
// funkcija, kuri apdoroja autoriu lista is serverio
export default function storiesReducer(state, action) {

    let newState = structuredClone(state ? state : []);
    let stories = null;

    switch (action.type) {
        case constants.GET_STORIES_FROM_SERVER:
            newState = action.payload.map(story => {
                return {
                    ...story,
                    image: story.image ? `${SERVER_URL}/${story.image}` : null
                }
            });
            break;
        case constants.ADD_STORY:
            return [...state, action.payload];
        default:
    }

    return newState;

}