// React State uždaviniai
import './App.scss';
import './buttons.scss'
import { useState } from 'react';
import rand from './Functions/rand';

export default function App() {

    const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    const [circles, setCircles] = useState([]);
    const [squares, setSquares] = useState([]);
    const [counter, setCounter] = useState(0);


    const random = rand(5, 25)

    //Antras uzdavinys
    const addCircle = _ => {
        if (circles < 1) {

            setCircles(c => [...c,
            {
                color: randomColor(),
                id: random

            }
            ]);
        }
    }

    const change = _ => {

        if (circles) {

            setCircles([]);

        }

        if (squares < 1) {

            setSquares([{
                color: randomColor(),
                id: rand(5, 25)
            }]);

        }

    }
    // const addSquare = _ => {
    //     setSquares(s => [...s,
    //     {
    //         color: randomColor(),
    //         id: random
    //     }
    //     ]);
    // }

    const changeNumber = _ => {
        if (squares) {
            setSquares(s => [{ id: random }]);
        }

    };
    // Trecias uzdavinys
    const prideti = _ => {

        setCounter(c => c + 1);

    };

    const atimti = _ => {

        setCounter(c => c - 3);

    };

    //Ketvirtas uždavinys
    const addSquare = _ => {
        setSquares(s => [...s,
        {
            color: 'blue',

        }
        ]);
    }
    //Penktas uzdavinys
    const addSquareBlue = _ => {
        setSquares(s => [...s,
        {
            color: 'blue',

        }
        ]);
    }
    const addSquareRed = _ => {
        setSquares(s => [...s,
        {
            color: 'red',

        }
        ]);
    }


    const reset = _ => {
        setSquares([]);

    }


    return (
        <div className="App">
            <header className="App-header">
                <h1>React State uždaviniai</h1>

                <div className="squares">

                    {
                        squares.map((square, i) => <div className="square" style={{
                            backgroundColor: square.color + '66',
                            border: '1px solid ' + square.color
                        }} key={i}>{square.id}</div>)
                    }
                </div>
                <div className="circles">
                    {
                        circles.map((circle, i) => <div className="circle" style={{
                            backgroundColor: circle.color + '66',
                            border: '1px solid ' + circle.color
                        }} key={i}>{circle.id}</div>)
                    }
                </div>


                <h4>Pirmas uždavinys</h4>
                {/* <div className="buttons">
                    <button className='yellow' onClick={addCircle} >ADD CIRCLE</button>
                    <button className='yellow' onClick={keisti} >CHANGE</button>
                </div> */}
                <h4>Antras uzdavinys</h4>
                <div className="buttons">
                    <button className='yellow' onClick={addCircle} >ADD CIRCLE</button>
                    <button className='yellow' onClick={change} >CHANGE</button>
                    <button className='yellow' onClick={changeNumber} >RANDOM</button>
                </div>
                {/* <h4>Trecias uzdavinys</h4>
                <h1>{counter}</h1>
                <div className="buttons">
                    <button className='yellow' onClick={prideti} >Prideti</button>
                    <button className='yellow' onClick={atimti} >Atimti</button>
                </div>
                <h4>Ketvirtas uzdavinys</h4>
                <div className="buttons">
                    <button className='yellow' onClick={addSquare} >Prideti</button>
                </div> */}
                <h4>Penktas uzdavinys</h4>
                <div className="buttons">
                    <button className='red' onClick={addSquareRed} >ADD RED</button>
                    <button className='red' onClick={addSquareBlue} >ADD BLUE</button>
                    <button className='red' onClick={reset} >RESET</button>
                </div>


            </header>
        </div>
    );
}

