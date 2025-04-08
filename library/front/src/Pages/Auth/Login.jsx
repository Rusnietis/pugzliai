import { useState, useContext, useEffect } from 'react';
import useLogin from '../../Hooks/useLogin';
import { Auth } from '../../Contexts/Auth';
import { SITE_URL, AFTER_LOGIN_URL } from '../../Constants/main';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setInputs, response] = useLogin();
    const { user } = useContext(Auth);

    const go = _ => {
        setInputs({ username, password });
        setPassword('');
    }
    console.log(user)
    useEffect(_ => {
        if (user) {
            window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
        }
    }, [user]);

    if (!user) {
        return (
            <div className="login-page">
                <div className="card">
                    <div className="card-header">
                        <h1>Login</h1>
                    </div>
                    <div className="card-body">
                        <form >
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Username</label>
                                <input type="text" name="name" className="form-control" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
                                <label htmlFor="pasword" className="form-label">Password</label>
                                <input type="password" name="password" className="form-control" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                                <div className="mb-3">
                                    <button type="button" className="btn btn-primary m-2" onClick={go}>GO</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
}