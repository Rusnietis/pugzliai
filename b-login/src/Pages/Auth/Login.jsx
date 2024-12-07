import { useState } from 'react';
import useLogin from '../../Hooks/useLogin';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setInputs, response] = useLogin();

    const go = _ => {
        setInputs({ username, password });
    }

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