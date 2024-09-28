
import './App.scss';
import './buttons.scss';
import './form.scss';
import { useState } from 'react';
//import rand from './Functions/rand';


export default function App() {

    // random hex color generator
    // const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    const [items, setItems] = useState([]);
    // const [counter, setCounter] = useState(1);
    // const [showText, setShowText] = useState('');


    const [newItem, setNewItem] = useState({

        vardas: '',
        saskaita: '',
        amount: 0
    });

    const handleNewItem = e => {

        //  setMultiText(e.target.value);
        setNewItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
        // setMultiText(prev => prev.map(items, i => i === index? e.target.value:items));

    }

    const addItem = _ => {
        localStorage.setItem('newItem', JSON.stringify(newItem));

        setItems(item => [...item, newItem]);
        setNewItem({

            vardas: '',
            saskaita: '',
            amount: 0
        });
        //setCounter(' ')

    }
    console.log(items)
    const deleteItem = (index) => {
        setItems((prevItems) => prevItems.filter((_, item) => item.index !== index));
    };
    console.log(items)
    return (
        <div className="App">
            <header className="App-header">
                <h1>Bankas</h1>
                <table border="1" cellPadding="10">
                    <thead>
                        <tr>
                            <th>Eil. Nr.</th>
                            <th>Vardas, Pavarde</th>
                            <th>Saskaitos numeris</th>
                            <th>Suma Eur</th>
                            <th>Prideti </th>
                        </tr>
                    </thead>
                    <tbody>

                        {items.map((item, index) => (
                            <tr key={index} >
                                <td>{index}</td>
                                <td>{item.vardas}</td>
                                <td>{item.saskaita}</td>
                                <td>{item.amount}</td>
                                <td><div className="buttons">

                                    <div className="form">
                                        <input type="number" />
                                    </div>
                                    <button className="red" onClick={_ => deleteItem(index)} >Ištrinti</button>
                                    <button className="yellow" onClick={addItem} >Pridėti lėšų</button>
                                    <button className="red" onClick={addItem} >Ištrinti lėšas</button>


                                </div></td>
                            </tr>

                        ))}


                    </tbody>
                </table>


                <div className='form'>
                    <input type="text" name="vardas" placeholder="Vardas, pavarde" value={newItem.name} onChange={handleNewItem} />
                    <input type="text" name="saskaita" placeholder="Saskaitos numeris" value={newItem.saskaita} onChange={handleNewItem} />
                    {/* <input type="number" placeholder="Suma" value={multiText[2]} onChange={e => handleMultiText(e, 2)} /> */}


                    <div className="buttons">
                        <button className="blue" onClick={addItem} >Prideti klienta</button>
                        {/* <button className="red" >RESET</button> */}
                    </div>
                </div>

            </header >
        </div >
    );
}