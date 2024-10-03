
import './App.scss';
import './buttons.scss';
import './form.scss';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//import rand from './Functions/rand';

//Bankas(paprasta versija)
export default function App() {

    // random hex color generator
    // const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState(0);
    // const [showText, setShowText] = useState('');
    console.log(items)

    const [newItem, setNewItem] = useState({
        id: uuidv4(),
        vardas: '',
        saskaita: '',
        amount: 0
    });

    const handleNewItem = (e) => {
        //  setMultiText(e.target.value);
        setNewItem(prev => ({ ...prev, [e.target.name]: e.target.value }));
        // setNewItem(prev => prev.map(items, i => i === index ? e.target.value : items));
        // setNewItem(prevItems => prevItems.map((item, i) =>
        //     i === index ? { ...item, [e.target.name]: e.target.value } : item
        // ));
    }

    const additem = _ => {
         localStorage.setItem('newItem', JSON.stringify(newItem));
        setItems(item => [...item, newItem]);
        setNewItem({
            id: uuidv4(),
            vardas: '',
            saskaita: '',
            amount: 0
        });
    }

    const handleAmountChange = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, amount: item.amount + Number(inputValue) } : item
        ));
        setInputValue(0); 
    };

    const handleAmountMinus = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, amount: item.amount - Number(inputValue) } : item
        ));
        setInputValue(0); 
    };

    console.log(items)
    const deleteItem = (id) => {
        const newRemoveItems = items.filter(item => item.id !== id);
        setItems(newRemoveItems);
    };
    // console.log(newItems)
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

                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.index}</td>
                                <td>{item.vardas}</td>
                                <td>{item.saskaita} </td>
                                <td>{item.amount} </td>
                                <td>
                                    <div className="form">
                                        <input type="number" value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} />
                                    </div>
                                    <div className="buttons">
                                        <button className="red" onClick={_ => deleteItem(item.id)} >Ištrinti</button>
                                        <button className="yellow" onClick={_=> handleAmountChange(item.id)} >Pridėti lėšų</button>
                                        <button className="blue" onClick={_=>handleAmountMinus(item.id)} >Ištrinti lėšas</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div>


                    <div className="form">
                        <input type="text" name="vardas" placeholder="Vardas, pavarde" value={newItem.vardas} onChange={handleNewItem} />
                        <input type="text" name="saskaita" placeholder="Saskaitos numeris" value={newItem.saskaita} onChange={e =>handleNewItem(e, index)} />
                        {/* <input type="number" placeholder="Suma" value={multiText[2]} onChange={e => handleMultiText(e, 2)} /> */}

                        <div className="buttons">
                            <button className="yellow" onClick={additem} >Pridėti klienta</button>
                        </div>
                    </div>
                </div>

            </header >
        </div >
    );
}