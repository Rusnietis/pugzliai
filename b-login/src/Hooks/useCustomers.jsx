import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';


export default function useCustomers() {

    const [customers, setCustomers] = useState([]);
    const [createCustomer, setCreateCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [deleteCustomer, setDeleteCustomer] = useState(null);

    const { user, logout } = useContext(Auth);
    console.log(user)

    useEffect(() => {
        if (!user || !user.token) {
            console.log('Naudotojas arba prieigos raktas(token) dar nepasiekiamas');
            return;
        }

        const withTokenUrl =
            user ? `${SERVER_URL}/customers?token=${user.token}` : `${SERVER_URL}/customers`;
        console.log('Request URL:', withTokenUrl);


        axios.get(withTokenUrl, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                setCustomers(res.data);
                console.log('Response data:', res.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    logout();
                }
                console.log(err);
            });
    }, [user]);

    // kliento sukūrimas su axios post ir id siuntimas i serveri 
    useEffect(_ => {
        if (null !== createCustomer) {
            axios.post(`${SERVER_URL}/customers`, createCustomer)
                .then(res => {
                    setCreateCustomer(null)
                    console.log(res.data)
                    setCustomers(c => c.map(customer => customer.id === res.data.uuid ? { ...customer, id: res.data.id, temp: false } : customer))

                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [createCustomer])



    //edit customer 

    useEffect(_ => {
        if (null !== editCustomer) {
            axios.put(`${SERVER_URL}/customers/${editCustomer.id}`, editCustomer)
                .then(res => {
                    setEditCustomer(null);
                    console.log(res.data);
                    setCustomers(c => c.map(customer => customer.id === res.data.id ? { ...customer, temp: false } : customer)) 
                })
                .catch(err => {
                    console.log(err);
                })
        }

    }, [editCustomer])

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