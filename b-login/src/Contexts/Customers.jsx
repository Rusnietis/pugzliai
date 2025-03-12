import { createContext } from 'react';
import useCustomers from '../Hooks/useCustomers';

export const Customers = createContext();

export const CustomersProvider = ({ children }) => {
    // hukas skirtas sukurti naujus klientus, redaguoti ir istrinti
    const { customers, setCustomers, allCustomers,
        setAllCustomers,
        customersWithMoney,
        setCustomersWithMoney,
        customersWithoutMoney,
        setCustomersWithoutMoney,
        stats,
        setStats,
        createCustomer, setCreateCustomer, editCustomer, setEditCustomer, deleteCustomer, setDeleteCustomer } = useCustomers();

    return (

        <Customers.Provider value={{
            customers,
            setCustomers,
            allCustomers,
            setAllCustomers,
            customersWithMoney,
            setCustomersWithMoney,
            customersWithoutMoney,
            setCustomersWithoutMoney,
            stats,
            setStats,
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