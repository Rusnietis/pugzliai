import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
//import { MessagesContext } from '../Contexts/Messages';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    // const [response, setResponse] = useState(null);
    const navigate = useNavigate();

    const { login, setUser } = useContext(Auth);
    //const { addMessage } = useContext(MessagesContext)

    useEffect(_ => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs)
                .then(res => {
                    // window.localStorage.setItem('token', res.data.token);
                    // window.localStorage.setItem('user', res.data.name);
                    login(res.data.name, res.data.role, res.data.id);
                    navigate('/apie')
                    //addMessage(res.data.message);


                })
                .catch(error => {
                    console.log(error);
                    if (!error.response) {
                        //addMessage({ type: 'danger', text: 'Server error' })
                    } else {
                        //addMessage({ type: 'danger', text: error.response.data.message })
                    }
                })
        }
    }, [inputs, login]);

    const logout = _ => {
        axios.post(`${SERVER_URL}/logout`, { withCredentials: true })
            .then(res => {
                window.localStorage.removeItem('user');
                window.localStorage.removeItem('role');
                window.localStorage.removeItem('id');
                setUser(null);
                navigate('/apie')
                //addMessage(res.data.message)
            })
            .catch(error => {
                console.log(error);
                if (!error.response) {
                    //addMessage({ type: 'danger', text: 'Server error' })
                } else {
                    //addMessage({ type: 'danger', text: error.response.data.message })
                }
            })
    };


    return { setInputs, logout };

}