import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { Router } from '../Contexts/Router';


export default function useCustomers() {

    const [customers, setCustomers] = useState([]);
    const [createCustomer, setCreateCustomer] = useState(null);
    const [editCustomer, setEditCustomer] = useState(null);
    const [deleteCustomer, setDeleteCustomer] = useState(null);

    const { user, logout } = useContext(Auth);
    const {show401Page} = useContext(Router)
    

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
                    if (err.response.status === 'login') {
                    logout();
                    }
                    show401Page();
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
                    //console.log(res.data)
                    setCustomers(c => c.map(customer => customer.id === res.data.uuid ? { ...customer, id: res.data.id, temp: false } : customer)) 

                })
                .catch(_ => {
                    setCreateCustomer(null)
                    setCustomers(c => c.filter(customer => customer.id !== createCustomer.id))
                })
        }
    }, [createCustomer])



    //edit customer 

    useEffect(_ => {
        if (null !== editCustomer) {
            axios.put(`${SERVER_URL}/customers/${editCustomer.id}`, editCustomer)
                .then(res => {
                    setEditCustomer(null);
                    //console.log(res.data);
                    setCustomers(c => c.map(customer => customer.id === res.data.id ? { ...customer, temp: false } : customer)) 
                })
                .catch(_ => {
                    setEditCustomer(null);
                    setCustomers(c => c.map(customer => customer.id === editCustomer.id ? { ...customer.preEdit, temp: false } : customer))
                })
        }

    }, [editCustomer])

    //delete customer

    useEffect(_ => {
        if (null !== deleteCustomer) {
            axios.delete(`${SERVER_URL}/customers/${deleteCustomer}`)
                .then(res => {
                    setDeleteCustomer(null);
                    console.log(res.data);
                    setCustomers(c => c.filter(customer => customer.id !== res.data.id)) 
                })
                .catch(err => {
                    setDeleteCustomer(null);
                    setCustomers(c => c.map(customer => customer.id === deleteCustomer ? { ...customer, temp: false } : customer)) 
                })
        }

    }, [deleteCustomer])

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