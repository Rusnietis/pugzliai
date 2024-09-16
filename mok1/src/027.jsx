// 27 paskaita


import './App.scss';
import './buttons.scss';
import { useState } from 'react';

export default function App() {

    // random hex color generator
    const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'); 


    const [counter, setCounter] = useState(0);
    const [squares, setSquares] = useState([]);

    const plus = _ => {
        setCounter(c => c + 1);
        console.log('plus', counter);
    }

    const reset = _ => {
        setCounter(0);
        console.log('reset', counter);
    }

    const addSquare = _ => {
        // squares.push(5); // BAD
        setSquares(s => [...s, randomColor()]); // GOOD
    }

    const resetSquares = _ => {
        setSquares([]);
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>This is STATE</h1>

                <h2>{counter}</h2>

                <div className="buttons">
                <button className="black" onClick={plus}>+</button>
                <button className="red" onClick={reset}>0</button>
                </div>

                {/* 
                <button className="black" onClick={plus}>black</button>
                <button className="red" onClick={reset}>red</button>
                <button className="yellow" onClick={reset}>yellow</button>
                <button className="green" onClick={reset}>green</button>
                <button className="white" onClick={reset}>white</button> */}

                <div className="squares">
                    
                    {
                        squares.map((square, i) => <div className="square spin" style={{
                            backgroundColor: square + '66',
                            border: '1px solid ' + square
                        }} key={i}>{square}</div>)
                    }
                </div>
                <div className="buttons">
                <button className="yellow" onClick={addSquare}>ADD SQUARE</button>
                <button className="red" onClick={resetSquares}>RESET</button>
                </div>


            </header>
        </div>
    );
}