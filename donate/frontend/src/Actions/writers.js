import * as  constants from '../Constants/writers';

export function getWriters(writers) {

    return {
        
        type: constants.GET_WRITERS_FROM_SERVER,
        payload: writers
    }
}

