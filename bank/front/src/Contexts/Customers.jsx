import { createContext, useReducer, useState } from 'react';
import useCustomers from '../Hooks/useCustomers';
import customersReducer from '../Reducers/customersReducer';

export const Customers = createContext();

export const CustomersProvider = ({ children }) => {

    //console.log(children)

    // pagrindinis kur laikome visus klientus yra reduceris
    const [customers, dispatchCustomers] = useReducer(customersReducer, []);
    const [deleteCustomer, setDeleteCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);

    //console.log(customers)

    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { storeCustomer, setStoreCustomer, updateCustomer, setUpdateCustomer, destroyCustomer, setDestroyCustomer } = useCustomers(dispatchCustomers); //dispatchCustomers



    return (
        <Customers.Provider value={{
            customers,
            dispatchCustomers,
            storeCustomer,
            setStoreCustomer,
            updateCustomer,
            setUpdateCustomer,
            destroyCustomer,
            setDestroyCustomer,
            deleteCustomer,
            setDeleteCustomer,
            editCustomer,
            setEditCustomer

        }}>
            {children}
        </Customers.Provider>
    );
}