import { useEffect, useState } from "react";
import useLogin from "../../Hooks/useLogin";
import { useContext } from "react";
import { Auth } from "../../Contexts/Auth";
import { AFTER_LOGIN_URL, SITE_URL } from "../../Constants/main";

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setInputs, response] = useLogin();
    const { user } = useContext(Auth);


    const go = _ => {
        setInputs({ username, password });
        setPassword('');
    }

    useEffect(_ => {
        if (user) {
            window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
        }

    }, [user])

    if (!user) {
        return (
            <div className="login-page">
                {console.log(response)}
                <div className="box">

                    <div className="response">
                        {
                            response && !response.ok && <span>{response.message}</span>
                        }
                    </div>
                    <form className="form">
                        <h1>Login</h1>
                        <label>Username</label>
                        <input type="text" name="name" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
                        <label>Password</label>
                        <input type="password" name="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                        <button type="button" onClick={go}>GO</button>
                    </form>
                </div>

            </div>
        );
    } else {
        return null;
    }
}