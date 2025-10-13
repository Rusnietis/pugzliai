import * as  constants from '../Constants/donors';

export function getWriters(donors) {

    return {

        type: constants.GET_DONORS_FROM_SERVER,
        payload: donors
    }
}

export function storeWriterAsTemp(donor) {
    return {
        type: constants.CREATE_DONOR,
        payload: donor
    }
}

export function storeWriterAsReal(response) {
    return {
        type: constants.CREATE_DONOR_REAL,
        payload: response
    }
}

export function storeWriterAsUndo(donor) {
    return {
        type: constants.CREATE_DONOR_UNDO,
        payload: donor
    }
}
