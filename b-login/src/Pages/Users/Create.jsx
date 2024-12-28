import { useContext, useState } from 'react';
import TopNav from '../TopNav';
import { Users } from '../../Contexts/Users';
import { v4 as uuidv4 } from 'uuid';


export default function Create() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const { setCreateUser } = useContext(Users);



    const register = _ => {
        const user = {

            username,
            password,
            id: uuidv4()

        }
        setCreateUser(user);
        window.location.href = '#login';
    }

    return (
        <div>
            <TopNav />


            <h1>Registracija</h1>
            <div className="fruits-bin">
                <form className="form">
                           
                    <div className="form-group">
                        <label>Name</label>
                      <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>

                   <div className="form-group">
                    <label>Password</label>
                      <input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="buttons">
                      <button type="button" className="yellow" onClick={register} >Registracija</button>
                    </div>
                </form>
            </div>
        </div>
        

    )
}