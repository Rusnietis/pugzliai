import * as  constants from '../Constants/writers';

export function getWriters(writers) {

    return {

        type: constants.GET_WRITERS_FROM_SERVER,
        payload: writers
    }
}

export function storeWriterAsTemp(writer) {
    return {
        type: constants.CREATE_WRITER,
        payload: writer
    }
}

export function storeWriterAsReal(response) {
    return {
        type: constants.CREATE_WRITER_REAL,
        payload: response
    }
}

export function storeCustomerAsUndo(writer) {
    return {
        type: constants.CREATE_WRITER_UNDO,
        payload: writer
    }
}
