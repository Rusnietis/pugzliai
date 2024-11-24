import { useState } from "react";
import useLogin from "../../Hooks/useLogin";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setInputs, response] = useLogin();


    const go = _ => {
        setInputs({ username, password });
        setPassword('');
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
                <form className="form">
                    <label>Username</label>
                    <input type="text" name="name" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <label>Password</label>
                    <input type="password" name="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="button" onClick={go}>GO</button>
                </form>
            </div>

        </div>
    );
}