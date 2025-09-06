import { createContext, useReducer, useState, useEffect } from 'react';
import useCustomers from '../Hooks/useCustomers';
import customersReducer from '../Reducers/customersReducer';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';

export const Customers = createContext();

export const CustomersProvider = ({ children }) => {
    // pagrindinis kur laikome visus klientus yra reduceris
    const [customers, dispatchCustomers] = useReducer(customersReducer, []);
    //console.log('customers from context:', customers);
    // CRUD ir papildomi state'ai
    const [deleteCustomer, setDeleteCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [updateAmount, setUpdateAmount] = useState(null);
    const [isBlocked, setIsBlocked] = useState(null);
    const [taxes, setTaxes] = useState(null);
    const [stats, setStats] = useState(null);

    // 🔹 filtravimo būsena
    const [filters, setFilters] = useState({
        isBlocked: null, // null = visi, true = tik blokuoti, false = tik aktyvūs
    });

    const [sort, setSort] = useState('none');

    // hookas bendrauti su serveriu
    const {
        storeCustomer,
        setStoreCustomer,
        updateCustomer,
        setUpdateCustomer,
        destroyCustomer,
        setDestroyCustomer,
    } = useCustomers(
        dispatchCustomers,
        editCustomer,
        updateAmount,
        setUpdateAmount,
        isBlocked,
        setIsBlocked,
        taxes,
        setTaxes,
        filters, // 🔹 perduodam filtrus hookui
        sort
    );

    // Statistika
    useEffect(() => {
        axios
            .get(`${SERVER_URL}/customer-stats`)
            .then((res) => {
                setStats(res.data ?? []);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Customers.Provider
            value={{
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
                setEditCustomer,
                updateAmount,
                setUpdateAmount,
                isBlocked,
                setIsBlocked,
                taxes,
                setTaxes,
                stats,
                setStats,
                filters, // 🔹 įdedam filtrus
                setFilters,
                sort,
                setSort
            }}
        >
            {children}
        </Customers.Provider>
    );
};
