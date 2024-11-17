export default function counterReducer(state, action) {

    let newState;

    switch (action.type) {
        case 'add_1':
            newState = state + 1;
            break;
        case 'rem_1':
            newState = state - 1;
            break;
        case 'set_0':
            newState = 0;
            break;
        case 'add':
            newState = state + action.payload;
            break;
        case 'error':
            newState = 'Invalid input!';
            break;
        default:
            newState = state;
    }

    return newState;

}