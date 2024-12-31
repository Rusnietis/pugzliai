import { createContext } from 'react';
import useCustomers from '../Hooks/useCustomers';

export const Customers = createContext();

export const CustomersProvider = ({ children }) => {

    const {customers, setCustomers ,createCustomer, setCreateCustomer, editCustomer, setEditCustomer, deleteCustomer, setDeleteCustomer } = useCustomers();

    return (
        <Customers.Provider value={{
            customers,
            setCustomers,
            createCustomer,
            setCreateCustomer,
            editCustomer,
            setEditCustomer,
            deleteCustomer,
            setDeleteCustomer
        }}>
            {children} 
        </Customers.Provider>
    )
}