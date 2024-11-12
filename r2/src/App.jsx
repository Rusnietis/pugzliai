import React, { useEffect, useState } from 'react';
import './App.scss';
import './tables.scss';
import './form.scss';
import './buttons.scss'
import axios from 'axios';

const API_URL = 'http://localhost:3001/trees';

export default function App() {
    // const trees = [
    //     { id: 1, name: 'Oak', height: 20, type: 'Deciduous' },
    //     { id: 3, name: 'Pine', height: 15, type: 'Evergreen' },
    //     { id: 2, name: 'Maple', height: 18, type: 'Deciduous' },

    // ];

    const types = ['lapuotis', 'spigliuotis', 'palmė'];
    const [inputs, setInputs] = useState({ name: '', height: '', type: '' });
    const [cutId, setCutId] = useState('');
    const [growInputs, setGrowInputs] = useState({id: '', height:''})

    const handleInputChange = e => {
        setInputs({ ...inputs, [e.target.id]: e.target.value });
    }

    const handleGrowInputChange = e => {
        setGrowInputs({ ...growInputs, [e.target.id]: e.target.value });
    }
    const [trees, setTrees] = useState([]);

    useEffect(_ => {
        axios.get(API_URL)
            .then(res => setTrees(res.data))
    }, []);

    const plant = _ => {
        axios.post(API_URL, { ...inputs, height: +inputs.height })
            .then(res => {
                setTrees([...trees, { ...inputs, id: res.data.id }]);
                setInputs({ name: '', height: '', type: '' });
            });
    }

    const cut = _ => {
        axios.delete(`${API_URL}/${cutId}`)
            .then(res => {
                setTrees(trees.filter(tree => tree.id !== +cutId));
                setCutId('');
            });
    }

    const grow = _ => {
        axios.put(`${API_URL}/${growInputs.id}`, { height: +growInputs.height })
            .then(_ => {
                setTrees(trees.map(tree => tree.id === +growInputs.id ? { ...tree, height: +growInputs.height } : tree));
                setGrowInputs({ id: '', height: '' });
            });
    }

    return (
        <div className="inside">
            <h1>Trees</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {trees.map(tree => (
                        <tr key={tree.id}>
                            <td>{tree.id}</td>
                            <td>{tree.name}</td>
                            <td>{tree.height}</td>
                            <td>{tree.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            < div className="forms">
                <div className="form">
                    <h2>Add a tree</h2>
                    <label htmlFor="name">Namr</label>
                    <input type="text" id="name" placeholder="Vardas" value={inputs.name} onChange={handleInputChange} />
                    <label htmlFor="height">Height</label>
                    <input type="text" id="height" placeholder="Aukštis" value={inputs.height} onChange={handleInputChange} />
                    <label htmlFor="type">Type</label>
                    <select id="type" value={inputs.type} onChange={handleInputChange}>
                        <option key="0" value="">Pasirinkti</option>
                        {
                            types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))
                        }
                    </select>
                    <div className="buttons">
                        <button type="button" className="green" onClick={plant}>Plant Tree</button>
                    </div>
                </div>
                <div className="form">
                    <h2>Cut a tree</h2>
                    <label htmlFor="id">ID</label>
                    <input type="text" id="id" placeholder="ID" value={cutId} onChange={e => setCutId(e.target.value)} />
                    <div className="buttons">
                        <button type="button" className="green" onClick={cut}>Cut Tree</button>
                    </div>
                </div>
                <div className="form">
                    <h2>Grow a tree</h2>
                    <label htmlFor="id">ID</label>
                    <input type="text" id="id" placeholder="ID" value={growInputs.id} onChange={handleGrowInputChange} />
                    <label htmlFor="height">Height</label>
                    <input type="text" id="height" placeholder="Aukštis" value={growInputs.height} onChange={handleGrowInputChange} />
                    <div className="buttons">
                        <button type="button" className="green" onClick={grow}>Grow Tree</button>
                    </div>
                </div>
            </div>
        </div>
    )


}