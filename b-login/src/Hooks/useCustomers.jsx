import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { Router } from '../Contexts/Router';


export default function useCustomers() {

    const [customers, setCustomers] = useState([]);
    const [allCustomers, setAllCustomers] = useState([]);
    const [customersWithMoney, setCustomersWithMoney] = useState([]);
    const [customersWithoutMoney, setCustomersWithoutMoney] = useState([]);
    const [stats, setStats] = useState({ totalAmount: 0, totalCustomers: 0 });
    const [createCustomer, setCreateCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [deleteCustomer, setDeleteCustomer] = useState(null);

    const { user, logout } = useContext(Auth);
    const { show401Page } = useContext(Router)
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
                setAllCustomers(res.data.customers);
                setCustomers(res.data.customers); // Pradžioje rodome visus
                setCustomersWithMoney(res.data.customersWithMoney);
                setCustomersWithoutMoney(res.data.customersWithoutMoney);
                setStats({ ...res.data.stats });
                
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    if (err.response.status === 'login') {
                        logout();
                    }
                    show401Page();
                }
            });
    }, [user]);

    // kliento sukūrimas su axios post ir id siuntimas i serveri  
    useEffect(_ => {
        if (null !== createCustomer) {

            const withTokenUrl =
                user ? `${SERVER_URL}/customers?token=${user.token}` : `${SERVER_URL}/customers`;

            axios.post(withTokenUrl, createCustomer)
                .then(res => {
                    setCreateCustomer(null)
                    //console.log(res.data)
                    setCustomers(c => c.map(customer => customer.id === res.data.uuid ? { ...customer, id: res.data.id, temp: false } : customer))
                  
                })
                .catch(err => {
                    setCreateCustomer(null)
                    setCustomers(c => c.filter(customer => customer.id !== createCustomer.id))
                    if (err.response && err.response.status === 401) {
                        if (err.response.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                })
        }
    }, [createCustomer])



    //edit customer 

    useEffect(_ => {
        if (null !== editCustomer) {

            const withTokenUrl =
                user ? `${SERVER_URL}/customers/${editCustomer.id}?token=${user.token}` : `${SERVER_URL}/customers/${editCustomer.id}`;
            axios.put(withTokenUrl, editCustomer)
                .then(res => {
                    setEditCustomer(null);
                    //console.log(res.data);
                    setCustomers(c => c.map(customer => customer.id === res.data.id ? { ...customer, temp: false } : customer))
                })
                .catch(err => {
                    setEditCustomer(null);
                    setCustomers(c => c.map(customer => customer.id === editCustomer.id ? { ...customer.preEdit, temp: false } : customer))
                    if (err.response && err.response.status === 401) {
                        if (err.response.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                })
        }

    }, [editCustomer])

    //delete customer

    useEffect(_ => {
        if (null !== deleteCustomer) {

            const withTokenUrl =
                user ? `${SERVER_URL}/customers/${deleteCustomer}?token=${user.token}` : `${SERVER_URL}/customers/${deleteCustomer}`;
            axios.delete(withTokenUrl)
                .then(res => {
                    setDeleteCustomer(null);
                    console.log(res.data);
                    setCustomers(c => c.filter(customer => customer.id !== res.data.id))
                })
                .catch(err => {
                    setDeleteCustomer(null);
                    setCustomers(c => c.map(customer => customer.id === deleteCustomer ? { ...customer, temp: false } : customer))
                    if (err.response && err.response.status === 401) {
                        if (err.response.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                })
        }

    }, [deleteCustomer])

    return {

        customers,
        allCustomers,
        setAllCustomers,
        customersWithMoney,
        setCustomersWithMoney,
        customersWithoutMoney,
        setCustomersWithoutMoney,
        stats,
        setStats,
        setCustomers,
        createCustomer,
        setCreateCustomer,
        editCustomer,
        setEditCustomer,
        deleteCustomer,
        setDeleteCustomer

    };
};