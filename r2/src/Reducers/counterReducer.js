import * as c from '../Constants/counterConstants';

export default function counterReducer(state, action) {
    let newState = { ...state };

    switch (action.type) {
        case c.ADD_1:
            newState.number++;
            newState.error = '';
            break;
        case c.REM_1:
            newState.number--;
            newState.error = '';
            break;
        case c.SET_0:
            newState.number = 0;
            newState.error = '';
            break;
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