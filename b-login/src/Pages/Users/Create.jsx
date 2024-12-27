import { useContext, useState } from 'react';
import TopNav from '../TopNav';
import { Users } from '../../Contexts/Users';
import { v4 as uuidv4 } from 'uuid';


export default function Create() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('')

    const {setCreateUser} = useContext(Users);



    const register = _ => {
        const user = {

            name,
            password,
            id: uuidv4()

        } 
        setCreateUser(user);
        window.location.href = '#home';
    }

    return (
        <div>
            <TopNav />
            
            
            <h1>Registracija</h1>
            <div className='row'>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Vardas, pavardė</th>
                            <th scope="col">Slaptazodis</th>
                            <th scope="col">Pridėti</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">#</th>
                            <td>
                                <div className="form">
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <div className="form">
                                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                                </div>
                            </td>
                            <td></td>
                            <td>
                                <div className="buttons">
                                    <button className="yellow" onClick={register} >Registracija</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}