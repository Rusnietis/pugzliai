import { useState, useReducer } from 'react';
import './App.scss';
import './form.scss';
import './buttons.scss';
import counterReducer from './Reducers/counterMasterReducer';
import * as a from './Actions/counterActions';

export default function App() {

    const [input1, setInput1] = useState('');

    const [counter, dispatchCounter] = useReducer(counterReducer, { number: 0, error: '' });



    const add = _ => {
        const value = parseInt(input1);
        if (isNaN(value)) {
            dispatchCounter(a.error('Please enter a number')); 
        } else {
            dispatchCounter(a.add(value)); // dispatchCounter <--- tai yra funkcija, kuri siunčia action objektą į reduserį
        }
        setInput1('');
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>USE REDUCER: {counter.number}</h1>
                {
                    counter.error && <h2 style={{color: 'crimson'}}>{counter.error}</h2>
                }
                <div className="buttons">
                    <button className="green" onClick={_ => dispatchCounter(a.add1())}>+</button>
                    <button className="green" onClick={_ => dispatchCounter(a.rem1())}>-</button>
                    <button className="green" onClick={_ => dispatchCounter(a.set0())}>0</button>
                    <div className="form small">
                        <input type="text" className="small-white" placeholder="Number" value={input1} onChange={e => setInput1(e.target.value)} />
                    </div>
                    <button className="green" onClick={add}>ADD</button>

                </div>
            </header>
        </div>
    );
}