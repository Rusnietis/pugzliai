import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
//import { use } from 'react';


export default function useUsers() {

    const [users, setUsers] = useState([]);
    const [createUser, setCreateUser] = useState(null);
    // const [editUser, setEditUser] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);

    const { user, login } = useContext(Auth);
    console.log(user)
    //const { show401Page } = useContext(Router)


    useEffect(() => {
        if (null === user) {
            return
        }

        axios.get(`${SERVER_URL}/users`)
            .then(res => {
                setUsers(res.data);
                console.log('Response data:', res.data);
            })
            .catch(err => {
                console.error('Klaida gaunant vartotojus:', err);
                // Jei norim žymėti klaidą:
                setUsers([]);
                // Jei reikia logout ar redirect:
                // if (err.response?.status === 401) logout();
            });
    }, [user]);

    // kliento sukūrimas su axios post ir id siuntimas i serveri 
   useEffect(() => {
    if (createUser === null) return;

    axios.post(`${SERVER_URL}/users`, createUser)
      .then(res => {
        console.log('Vartotojas sukurtas:', res.data);

        // ⬇️ Čia svarbiausia vieta: automatinis login
        login(createUser.name, 'animal', createUser.id);

        // atnaujina sąrašą po registracijos
        return axios.get(`${SERVER_URL}/users`);
      })
      .then(res => setUsers(res.data))
      .catch(err => console.error('Klaida kuriant user:', err))
      .finally(() => setCreateUser(null));
  }, [createUser]);



    //Vartotojo redagavimas

    // useEffect(_ => {
    //     if (null !== editUser) {

    //         const withTokenUrl =
    //             user ? `${SERVER_URL}/users/${editUser.id}?token=${user.token}` : `${SERVER_URL}/users/${editUser.id}`;
    //         axios.put(withTokenUrl, editUser)

    //             .then(res => {
    //                 setEditUser(null);// išvalo editUser
    //                 //console.log(res.data);
    //                 setUsers(c => 
    //                     c.map(user => 
    //                         user.id === res.data.id 
    //                             ? { ...user, ...res.data, temp: false } 
    //                             : user
    //                     )
    //                 );

    //                 //setUsers(c => c.map(user => user.id === res.data.id ? { ...user, temp: false } : user))   
    //             })
    //             .catch(err => {
    //                 setEditUser(null);// išvalo editUser
    //                 setUsers(c => 
    //                     c.map(user => 
    //                         user.id === editUser.id 
    //                             ? { ...editUser, preEdit: user, temp: true } 
    //                             : user
    //                     )
    //                 );

    //                 //setUsers(c => c.map(user => user.id === editUser.id ? { ...user.preEdit, temp: false } : user))
    //                 if (err.response && err.response.status === 401) {
    //                     if (err.response.status === 'login') {
    //                         logout();
    //                     }
    //                     show401Page();
    //                 }
    //             })
    //     }

    // }, [editUser])

    // //delete user

    // useEffect(_ => {
    //     if (null !== deleteUser) {

    //         const withTokenUrl =
    //             user ? `${SERVER_URL}/users/${deleteUser}?token=${user.token}` : `${SERVER_URL}/users/${deleteUser}`;
    //         axios.delete(withTokenUrl)
    //             .then(res => {
    //                 setDeleteUser(null);
    //                 console.log(res.data);
    //                 setUsers(c => c.filter(user => user.id !== res.data.id))
    //             })
    //             .catch(err => {
    //                 setDeleteUser(null);
    //                 setUsers(c => c.map(user => user.id === deleteUser ? { ...user, temp: false } : user))
    //                 if (err.response && err.response.status === 401) {
    //                     if (err.response.status === 'login') {
    //                         logout();
    //                     }
    //                     show401Page();
    //                 }
    //             })
    //     }

    // }, [deleteUser])

    return {

        users,
        setUsers,
        createUser,
        setCreateUser,
        // editUser,
        // setEditUser,
        deleteUser,
        setDeleteUser

    };
};