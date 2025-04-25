import * as constants from '../Constants/customers';
// patikrinta
// funkcija, kuri apdoroja klientu lista is serverio
export default function customersReducer(state, action) {

    let newState = structuredClone(state ? state : []);
    let customer = null;
    console.log(newState)
    switch (action.type) {
        case constants.GET_CUSTOMERS_FROM_SERVER:
            newState = action.payload;
            break;
        case constants.CREATE_CUSTOMER:
            newState.unshift({ ...action.payload, temp: true });
            break;
        case constants.CREATE_CUSTOMER_REAL:
            customer = newState.find(customer => customer.id === action.payload.uuid);
            if (customer) {
                delete customer.temp;
                customer.id = action.payload.id;
            }
            break;
        case constants.CREATE_CUSTOMER_UNDO:
            //console.log('undo', action.payload)
            newState = newState.filter(customer => customer.id !== action.payload.id);
            break;
        case constants.DELETE_CUSTOMER:
            customer = newState.find(customer => customer.id === action.payload.id);
            if (customer) {
                customer.deleted = true;
            }
            break;
        case constants.DELETE_CUSTOMER_REAL:
            newState = newState.filter(customer => customer.id !== action.payload.id);
            break;
        case constants.DELETE_CUSTOMER_UNDO:
            customer = newState.find(customer => customer.id === action.payload.id);
            if (customer) {
                delete customer.deleted;
            }
            break;
        case constants.UPDATE_CUSTOMER:
            customer = newState.find(customer => customer.id === action.payload.id);
            if (customer) {
                for (let key in action.payload) {
                    customer[key] = action.payload[key];
                }
                // customer.id = action.payload.customer.id;
                // customer.name = action.payload.customer.name;
                // customer.surname = action.payload.customer.surname;
                // customer.nickname = action.payload.customer.nickname;
                // customer.born = action.payload.customer.born;
                customer.temp = true;
            }
            break;
        case constants.UPDATE_CUSTOMER_REAL:
            customer = newState.find(customer => customer.id === action.payload.id);
            if (customer) {
                delete customer.temp;
                delete customer.old;
            }
            break;
        case constants.UPDATE_CUSTOMER_UNDO:
            //console.log('UNDO', action.payload)
            customer = newState.find(customer => customer.id === action.payload.id);
            if (customer) {
                for (let key in action.payload.old) {
                    customer[key] = action.payload.old[key];
                }
                delete customer.temp;
                delete customer.old;
            }
            break;
        default:
    }

    return newState;

}