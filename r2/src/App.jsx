import React, { useEffect, useState } from 'react';
import './App.scss';
import './tables.scss';
import './form.scss';
import './buttons.scss'
import axios from 'axios';

const API_URL = 'http://localhost:3001/trees';

export default function App() {

    const [clients, setClients] = useState([]);


    return (
        <div className="inside">
            <h1>Clients</h1>
            < div className="forms">
                <div className="buttons">
                    <button className="green">INNER</button>
                    <button className="green">LEFT</button>
                    <button className="green">RIGHT</button>
                    <button className="red">Clier</button>
                </div>
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
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.id}</td>
                            <td>{client.number}</td>
                            <td>{client.client_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
           
        </div>
    )


}