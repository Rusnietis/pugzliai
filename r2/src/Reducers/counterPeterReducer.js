import * as c from '../Constants/counterConstants';

export default function counterPeterReducer(state, action) {
    let newState = { ...state };

    switch (action.type) {
        case c.ADD:
            newState.number += action.payload;
            newState.error = '';
            break;
        case c.ERROR:
            newState.error = action.payload;
            break;
        default:
    }


    return newState;
}
//