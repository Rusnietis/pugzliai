import * as constants from '../Constants/writers';
// patikrinta
// funkcija, kuri apdoroja autoriu lista is serverio
export default function writersReducer(state, action) {

    let newState = structuredClone(state ? state : []);
    let writer = null;

    switch (action.type) {
        case constants.GET_WRITERS_FROM_SERVER:
            newState = action.payload;
            break;
        case constants.CREATE_WRITER:
            newState.unshift({ ...action.payload, temp: true });
            break;
        case constants.CREATE_WRITER_REAL:
            writer = newState.find(writer => writer.id === action.payload.uuid);
            if (writer) {
                delete writer.temp;
                writer.id = action.payload.id;
            }
            break;
        case constants.CREATE_WRITER_UNDO:
            //console.log('undo', action.payload)
            newState = newState.filter(writer => writer.id !== action.payload.id);
            break;
        
        default:
    }

    return newState;

}