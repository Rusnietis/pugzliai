import { useContext, useState } from 'react';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { useEffect } from 'react';
import {Auth} from '../Contexts/Auth';

// Hook'as, skirtas prisijungimo formos duomenims siųsti į serverį
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
                    //localStorage.setItem('token', res.data.token);
                    //localStorage.setItem('user', res.data.username);
                    // console.log(res.data.username);
                    login(res.data.token, res.data.username, res.data.role, res.data.id); // Išsaugome prisijungimo duomenis į kontekstą
                    window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}` // Nukreipiame į pagrindinį puslapį (redirektinam)
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

    // Grąžiname abi reikšmes - funkciją, kuri leidžia nustatyti naujus įvesties duomenis ir objektą su serverio atsakymu
    return [setInputs, response];
}