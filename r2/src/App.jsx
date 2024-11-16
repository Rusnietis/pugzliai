import { useEffect, useState } from 'react';
import './App.scss';
import './tables.scss';
import './form.scss';
import './buttons.scss';
import axios from 'axios';

const API_URL = 'http://localhost:3001/clients';

export default function App() {

    const [clients, setClients] = useState([]);
    const [type, setType] = useState('');


    useEffect(_ => {
        if (type === '') {
            setClients([]);
            return;
        }
        axios.get(API_URL + '/?type=' + type)
            .then(res => setClients(res.data));
    }, [type, setClients]);

    return (
        <div className="inside">
            <h1>Clients</h1>
            <h2>by join type {type}</h2>
            < div className="forms">

                <button className="green" onClick={_ => setType('inner')}>INNER</button>
                <button className="green" onClick={_ => setType('left')}>LEFT</button>
                <button className="green" onClick={_ => setType('right')}>RIGHT</button>
                <button className="red" onClick={_ => setType('')}>Clear</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>Name</th>
                        <th>Phone ID</th>
                        <th>Number</th>
                        <th>Phone client_id</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client => (
                        <tr key={client.id + '_'+ client.pid}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.pid}</td>
                            <td>{client.number}</td>
                            <td>{client.client_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )


}