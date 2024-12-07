import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { useEffect } from 'react';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.log(error);
                    if (!error.response) {
                        setResponse({
                            ok: false,
                            status: 500,
                            message: 'Server Error'
                        });
                    } else {
                        setResponse({
                            ok: false,
                            status: error.response.status,
                            message: error.message
                        });
                    }
                });

        }
    }, [inputs])


    return [setInputs, response];
}