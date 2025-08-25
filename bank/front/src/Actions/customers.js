import * as  constants from '../Constants/customers';
// action objektas - ka mes norim padaryti
//funkcijos kurios pagamina action objektus
export function getCustomers(customers) {

    return {
        
        type: constants.GET_CUSTOMERS_FROM_SERVER,
        payload: customers
    }
}

export function storeCustomerAsTemp(customer) {
    return {
        type: constants.CREATE_CUSTOMER,
        payload: customer
    }
}

export function storeCustomerAsReal(response) {
    return {
        type: constants.CREATE_CUSTOMER_REAL,
        payload: response
    }
}

export function storeCustomerAsUndo(customer) {
    return {
        type: constants.CREATE_CUSTOMER_UNDO,
        payload: customer
    }
}

export function deleteCustomerAsTemp(customer) {
    return {
        type: constants.DELETE_CUSTOMER,
        payload: customer
    }
}

export function deleteCustomerAsReal(response) {
    return {
        type: constants.DELETE_CUSTOMER_REAL,
        payload: response
    }
}

export function deleteCustomerAsUndo(customer) {
    return {
        type: constants.DELETE_CUSTOMER_UNDO,
        payload: customer
    }
}

export function updateCustomerAsTemp(customer, oldcustomer) {
    return {
        type: constants.UPDATE_CUSTOMER,
        payload: {customer, oldcustomer}
    }
}
    


export function updateCustomerAsReal(response) {
    return {
        type: constants.UPDATE_CUSTOMER_REAL,
        payload: response
    }
}

export function updateCustomerAsUndo(customer) {
    return {
        type: constants.UPDATE_CUSTOMER_UNDO,
        payload: customer
    }
}

export function updateCustomerAmountAsTemp(customer, oldcustomer) {
    return {
        type: constants.UPDATE_CUSTOMER_AMOUNT,
        payload: {customer, oldcustomer}
    }
}

export function updateCustomerAmountAsReal(response) {
    return {
        type: constants.UPDATE_CUSTOMER_AMOUNT_REAL,
        payload: response
    }
}
export function updateCustomerAmountAsUndo(customer) {
    return {
        type: constants.UPDATE_CUSTOMER_AMOUNT_UNDO,
        payload: customer
    }
}

export function updateCustomerBlockAsTemp(customer, oldcustomer) {
    return {
        type: constants.UPDATE_CUSTOMER_BLOCK,
        payload: {customer, oldcustomer}
    }
}
export function updateCustomerBlockAsReal(response) {
    return {
        type: constants.UPDATE_CUSTOMER_BLOCK_REAL,
        payload: response
    }
}

export function updateCustomerBlockAsUndo(customer) {
    return {
        type: constants.UPDATE_CUSTOMER_BLOCK_UNDO,
        payload: customer
    }
}

export function applyTaxesAction(change) {
    return ({
        type: constants.APPLY_TAXES,
        payload: change
    })
}
