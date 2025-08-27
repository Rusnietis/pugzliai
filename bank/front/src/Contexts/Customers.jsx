import { createContext, useReducer, useState, useEffect} from 'react';
import useCustomers from '../Hooks/useCustomers';
import customersReducer from '../Reducers/customersReducer';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';

export const Customers = createContext();

export const CustomersProvider = ({ children }) => {
    //console.log(children)
    // pagrindinis kur laikome visus klientus yra reduceris
    const [customers, dispatchCustomers] = useReducer(customersReducer, []);

    const [deleteCustomer, setDeleteCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [updateAmount, setUpdateAmount] = useState(null);
    const [isBlocked, setIsBlocked] = useState(null);
    const [taxes, setTaxes] = useState(null);
    const [stats, setStats] = useState(null);
    //console.log(deleteCustomer)
    console.log(stats)
    
    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const {
         storeCustomer, setStoreCustomer,
          updateCustomer, setUpdateCustomer, 
          destroyCustomer, setDestroyCustomer 
        } 
        = useCustomers(
            dispatchCustomers, 
            editCustomer, 
            updateAmount, 
            setUpdateAmount, 
            isBlocked, 
            setIsBlocked, 
            taxes, setTaxes
        ); // <-- useCustomers yra hookas, kuris valdo klientu duomenis ir kreipiasi i serveri
   
   useEffect(_ => {
           axios.get(`${SERVER_URL}/customer-stats`)
               .then(res => {
                   console.log(res.data);
                   setStats(res.data ?? []);
               })
               .catch(err => {
                   console.log(err);
               })
       }, [setStats])
   
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
            setEditCustomer,
            updateAmount,
            setUpdateAmount,
            isBlocked,
            setIsBlocked,
            taxes,
            setTaxes,
            stats, 
            setStats

        }}>
            {/* {console.log('Context: updateAmount', updateAmount)}   */}
            {children}
        </Customers.Provider>
    );
}