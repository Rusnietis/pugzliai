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


    useEffect(_ => {
        if (null !== createCustomer) {
            axios.post(`${SERVER_URL}/customers`, createCustomer, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    setCreateCustomer(null)
                    console.log(res.data)
                    // setCustomers(c => c.map(customer => customer.id === res.data.uuid ? { ...customer, id: res.data.id, temp: false } : customer))
                    setCustomers(c => {
                        console.log('res.data.uuid:', res.data.uuid);
                        console.log('customers ids:', c.map(customer => customer.id));
                        return c.map(customer => {
                            if (String(customer.id) === String(res.data.uuid)) {
                                console.log('Updating customer:', customer);
                                return { ...customer, id: res.data.id, temp: res.data.temp ?? false };
                            }
                            return customer;
                        });
                    });
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