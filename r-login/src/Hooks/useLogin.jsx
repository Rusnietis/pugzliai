import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(_ => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs)
                .then(res => {
                    console.log(res);
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
                            message: error.message
                        });
                    }
                })
        }
    },[inputs]);


    return [setInputs, response];

}