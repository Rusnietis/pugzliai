import { useContext, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { useEffect } from 'react';
import {Auth} from '../Contexts/Auth';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    const [response, setResponse] = useState(null);

    const {login} = useContext(Auth);
    
    useEffect(() => {

        if (inputs !== null) {
            console.log('Sending login data:', inputs);  // Patikrinkite, kas siunčiama
        
            axios.post(`${SERVER_URL}/login`, inputs, {
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    //console.log(res.data);
                    // Panaudojame `res` tiesiogiai, be tarpinių kintamųjų
                    // localStorage.setItem('token', res.data.token);
                    // localStorage.setItem('user', res.data.username);
                    // console.log(res.data.username);
                    login(res.data.token, res.data.username);
                    window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`
                })
                .catch(error => {
                    if (!error.response) {
                        setResponse({
                            ok: false,
                            status: 500,
                            message: 'Serverio klaida: nepavyko prisijungti prie serverio.'
                        });
                    } else if (error.response.status === 401) {
                        setResponse({
                            ok: false,
                            status: 401,
                            message: 'Netinkamas vartotojo vardas arba slaptažodis.'
                        });
                    } else {
                        setResponse({
                            ok: false,
                            status: error.response.status,
                            message: 'Įvyko klaida. Bandykite dar kartą.'
                        });
                    }
                });
        }
    }, [inputs,login])


    return [setInputs, response];
}