import { useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { useEffect } from 'react';

export default function useLogin(){

    const [inputs, setInputs] = useState(null);
    const [response, setResponse] = useState(null);

    useEffect(() =>{
        if(null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs)
            .then(res => {
                console.log(res);
            })
            .catch( error => {
                console.log(error);
            });
            
        }
    },[inputs])


    return [setInputs, response];
}