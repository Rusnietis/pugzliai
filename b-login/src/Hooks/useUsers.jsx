import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { Router } from '../Contexts/Router';


export default function useUsers() {

    const [users, setUsers] = useState([]);
    const [createUser, setCreateUser] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    const { user, logout } = useContext(Auth);
    const { show401Page } = useContext(Router)


    useEffect(() => {
        if (!user || !user.token) {
            console.log('Naudotojas arba prieigos raktas(token) dar nepasiekiamas');
            return;
        }

        const withTokenUrl =
            user ? `${SERVER_URL}/users?token=${user.token}` : `${SERVER_URL}/users`;
        console.log('Request URL:', withTokenUrl);


        axios.get(withTokenUrl, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                setUsers(res.data);
                console.log('Response data:', res.data);
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
        if (null !== createUser) {

            const withTokenUrl = 
            user ? `${SERVER_URL}/users?token=${user.token}` : `${SERVER_URL}/users`;
            axios.post(withTokenUrl, createUser)
                .then(res => {
                    setCreateUser(null)
                    //console.log(res.data)
                    setUsers(c => c.map(user => user.id === res.data.uuid ? { ...user, id: res.data.id, temp: false } : user))

                })
                .catch(err => {
                    setCreateUser(null)
                    setUsers(c => c.filter(user => user.id !== createUser.id))
                    if (err.response && err.response.status === 401) {
                        if (err.response.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                })
        }
    }, [createUser])



    //edit user 

    useEffect(_ => {
        if (null !== editUser) {

            const withTokenUrl =
             user ? `${SERVER_URL}/users/${editUser.id}?token=${user.token}` : `${SERVER_URL}/users/${editUser.id}`;
            axios.put(withTokenUrl, editUser)
                .then(res => {
                    setEditUser(null);
                    //console.log(res.data);
                    setUsers(c => c.map(user => user.id === res.data.id ? { ...user, temp: false } : user))
                })
                .catch(err => {
                    setEditUser(null);
                    setUsers(c => c.map(user => user.id === editUser.id ? { ...user.preEdit, temp: false } : user))
                    if (err.response && err.response.status === 401) {
                        if (err.response.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                })
        }

    }, [editUser])

    //delete user

    useEffect(_ => {
        if (null !== deleteUser) {

           const withTokenUrl =
            user ? `${SERVER_URL}/users/${deleteUser}?token=${user.token}` : `${SERVER_URL}/users/${deleteUser}`;
            axios.delete(withTokenUrl)
                .then(res => {
                    setDeleteUser(null);
                    console.log(res.data);
                    setUsers(c => c.filter(user => user.id !== res.data.id))
                })
                .catch(err => {
                    setDeleteUser(null);
                    setUsers(c => c.map(user => user.id === deleteUser ? { ...user, temp: false } : user))
                    if (err.response && err.response.status === 401) {
                        if (err.response.status === 'login') {
                            logout();
                        }
                        show401Page();
                    }
                })
        }

    }, [deleteUser])

    return {

        users,
        setUsers,
        createUser,
        setCreateUser,
        editUser,
        setEditUser,
        deleteUser,
        setDeleteUser

    };
};