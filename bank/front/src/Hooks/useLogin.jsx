import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    const [response, setResponse] = useState(null);

    const {login} = useContext(Auth)

    useEffect(_ => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs)
                .then(res => {
                    // window.localStorage.setItem('token', res.data.token);
                    // window.localStorage.setItem('user', res.data.name);
                    login(res.data.token, res.data.name);
                    window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
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
    }, [inputs]);


    return [setInputs, response];

}