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

        const withTokenUrl =
            user ? `${SERVER_URL}/customers?token=${user.token}` : `${SERVER_URL}/customers`;
        console.log('Request URL:', withTokenUrl);

        axios.get(withTokenUrl)
            .then(res => {
                setCustomers(res.data);
                console.log('Response data:', res.data);
            })
            .catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        window.location.href = '#login';
                    }
                }
                console.log(err);
            });
    }, []);



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