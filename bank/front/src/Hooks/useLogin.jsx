import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { MessagesContext } from '../Contexts/Messages';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    // const [response, setResponse] = useState(null);

    const { login, setUser } = useContext(Auth);
    const { addMessage } = useContext(MessagesContext)

    useEffect(_ => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs, { withCredentials: true })
                .then(res => {
                    // window.localStorage.setItem('token', res.data.token);
                    // window.localStorage.setItem('user', res.data.name);
                    login(res.data.name, res.data.role, res.data.id);
                    window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
                    addMessage(res.data.message);


                })
                .catch(error => {
                    console.log(error);
                    if (!error.response) {
                        addMessage({ type: 'danger', text: 'Server error' })
                    } else {
                        addMessage({ type: 'danger', text: error.response.data.message })
                    }
                })
        }
    }, [inputs, addMessage, login]);

    const logout = _ => {
        axios.post(`${SERVER_URL}/logout`, {}, { withCredentials: true })
            .then(res => {
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('role');
                window.localStorage.removeItem('id');
                setUser(null);
                window.location.href = '#home';//<-- arba login puslapi
                addMessage(res.data.message)
            })
            .catch(error => {
                console.log(error);
                if (!error.response) {
                    addMessage({ type: 'danger', text: 'Server error' })
                } else {
                    addMessage({ type: 'danger', text: error.response.data.message })
                }
            })
    };


    return { setInputs, logout };

}