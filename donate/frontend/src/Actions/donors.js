import * as  constants from '../Constants/donors';

export function getDonors(donors) {

    return {

        type: constants.GET_DONORS_FROM_SERVER,
        payload: donors
    }
}

export function storeDonorAsTemp(donor) {
    return {
        type: constants.CREATE_DONOR,
        payload: donor
    }
}

export function storeDonorAsReal(response) {
    return {
        type: constants.CREATE_DONOR_REAL,
        payload: response
    }
}

export function storeDonorAsUndo(donor) {
    return {
        type: constants.CREATE_DONOR_UNDO,
        payload: donor
    }
}
