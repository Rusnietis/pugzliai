import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { useEffect } from 'react';
import { useContext } from 'react';
import { Auth } from '../Contexts/Auth';


export default function useCustomers() {

    const [customers, setCustomers] = useState([]);
    const [createCustomer, setCreateCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [deleteCustomer, setDeleteCustomer] = useState(null);

    const { user } = useContext(Auth);
    console.log(user)

    useEffect(() => {
        if (!user || !user.token) {
            console.log('Naudotojas arba prieigos raktas(token) dar nepasiekiamas');
            return;
        }
    
        const withTokenUrl = `${SERVER_URL}/customers?token=${user.token}`;
        console.log('Request URL:', withTokenUrl);
    
        axios.get(withTokenUrl)
            .then(res => {
                setCustomers(res.data);
                console.log('Response data:', res.data);
            })
            .catch(err => {
                console.log('Error in request:', err);
            });
    }, [user]);

    // useEffect(_ => {
    //     if (!user || !user.token) {
    //         console.log('User or token is not available');
    //         return;
    //     }
    //     const withTokenUrl =
    //         user ? `${SERVER_URL}/customers?token=${user.token}` : `${SERVER_URL}/customers`
    //         console.log('Request URL:', `${SERVER_URL}/customers?token=${user?.token}`);
    //         console.log(`${SERVER_URL}/customers?token=${user.token}`)
    //     axios.get(withTokenUrl)
    //         .then(res => {
    //             setCustomers(res.data);
    //             console.log(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, [user]);

    useEffect(_ => {
        if (null !== createCustomer) {
            axios.post(`${SERVER_URL}/customers`, createCustomer, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(_ => {
                    setCreateCustomer(null)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [createCustomer])



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