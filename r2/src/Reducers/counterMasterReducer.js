import counterEmmaReducer from './counterEmmaReducer';
import counterPeterReducer from './counterPeterReducer';


export default function counterMasterReducer(state, action) {

    if (action.type >= 100 && action.type < 200) {
        return counterEmmaReducer(state, action);
    }
    else if (action.type >= 200 && action.type < 300) {
        return counterPeterReducer(state, action);
    }
    else {
        return state;
    }

}