import { useContext, useEffect, useState } from 'react';
import useLogin from '../../Hooks/useLogin';
import { Auth } from '../../Contexts/Auth';
import { SITE_URL, AFTER_LOGIN_URL } from '../../Constants/main';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setInputs, response] = useLogin(); // Iškviečiame hook'ą, kuris siunčia duomenis į serverį
    
    const { user } = useContext(Auth) // Ištraukiame iš konteksto vartotojo duomenis

    const go = _ => {
        setInputs({ username, password });
        setPassword('');
    }

    useEffect(_ => {
        // Jei vartotojas jau yra prisijungęs, nukreipiame į pagrindinį puslapį
        if (user) {
            window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
        }
    }, [user]);

    if (!user) {

        return (
            <div className="login-page">
                {console.log(response)}
                <div className="box">
                    <h1>Login</h1>
                    <div className="response">
                        {
                            response && !response.ok && <span>{response.message}</span>
                        }
                    </div>
                    <div className="form">
                        <label>Username</label>
                        <input type="text" name="name" value={username} onChange={e => setUsername(e.target.value)} />
                        <label>Password</label>
                        <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="button" onClick={go}>Go</button>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return null
    }
}