import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { useEffect } from 'react';


export default function useCustomers() {

    const [customers, setCustomers] = useState(null);
    const [createCustomer, setCreateCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [deleteCustomer, setDeleteCustomer] = useState(null);

    useEffect(_=>{
        if(null !== createCustomer){
            axios.post(`${SERVER_URL}/customers`, createCustomer)
            .then(_=>{
                setCreateCustomer(null)
            })
            .catch(err =>{
                console.log(err)
            })
        }
    },[createCustomer])

    

    return {

        customers,
        setCustomers,
        createCustomer,
        setCreateCustomer,
        editCustomer,
        setEditCustomer,
        deleteCustomer,
        setDeleteCustomer

    };
};