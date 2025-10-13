import * as constants from '../Constants/donors';
// patikrinta
// funkcija, kuri apdoroja autoriu lista is serverio
export default function donorsReducer(state, action) {

    let newState = structuredClone(state ? state : []);
    let donor = null;

    switch (action.type) {
        case constants.GET_DONORS_FROM_SERVER:
            newState = action.payload;
            break;
        case constants.CREATE_DONOR:
            newState.unshift({ ...action.payload, temp: true });
            break;
        case constants.CREATE_DONOR_REAL:
            donor = newState.find(donor => donor.id === action.payload.uuid);
            if (donor) {
                delete donor.temp;
                donor.id = action.payload.id;
            }
            break;
        case constants.CREATE_DONOR_UNDO:
            //console.log('undo', action.payload)
            newState = newState.filter(donor => donor.id !== action.payload.id);
            break;
        
        default:
    }

    return newState;

}