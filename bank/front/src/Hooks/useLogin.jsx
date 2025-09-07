import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { MessagesContext } from '../Contexts/Messages';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    const [response, setResponse] = useState(null);

    const { login, setUser, doLogout, setDoLogout } = useContext(Auth);

    console.log('Kas ateina is contexto:', login)
    
    const { addMessage } = useContext(MessagesContext)

    useEffect(_ => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs, { withCredentials: true })
                .then(res => {
                    // window.localStorage.setItem('token', res.data.token);
                    // window.localStorage.setItem('user', res.data.name);
                    login(res.data.name, res.data.role, res.data.id);
                    window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
                    addMessage(res.data.message)
                   
                })
                .catch(error => {
                    console.log(error);
                    if (!error.response) {
                        setResponse({
                            ok: false,
                            status: 500,
                            message: 'Server error'
                        });
                    } else {
                        setResponse({
                            ok: false,
                            status: error.response.status,
                            message: error.response.data?.message || error.message
                        });
                    }
                })
        }
    }, [inputs, addMessage, login]);

    useEffect(_ => {
        if(!doLogout){
            return;
        }
        axios.post(`${SERVER_URL}/logout`, { withCredentials: true })
            .then(res => {
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('role');
                window.localStorage.removeItem('id');
                setUser(null);
                window.location.href = '#login';
                addMessage(res.data.message)
            })
            .catch(error => {
                console.log(error);
                if (!error.response) {
                    addMessage(response.data.message);
                } else {
                    addMessage(response.data.message);
                }
            })
    },[doLogout, addMessage, setUser]);


    return { setInputs };

}