// 28 paskaita


import './App.scss';
import './buttons.scss';
import { useEffect, useState } from 'react';
import Sq from './Components/028/Sq';
import randomColor from './Functions/randomColor';
import { v4 as uuidv4 } from 'uuid';
import BigSq1 from './Components/028/BigSq1';
import BigSq2 from './Components/028/BigSq2';


export default function App() {

    const [squares, setSquares] = useState([]);

    const [sq2, setSq2] = useState('#444444');
    const [sq1, setSq1] = useState('#444444');

    const [sync, setSync] = useState(false);

    useEffect(_ => {
        console.log('Squres are changed');
        if (sync) {
            setSquares(s => s.map(s => ({ ...s, show: true })));
            setSync(false);
        }
    }, [squares]);


    const add = _ => {
        setSquares(s => [...s,
        {
            color: randomColor(),
            id: uuidv4(),
            show: true
        }
        ]);
    }

    const reset = _ => {
        setSquares(s => s.map(s => ({ ...s, show: false })));
    }

    const syncSpin = _ => {
        setSquares(s => s.map(s => ({ ...s, show: false })));
        setSync(true);
    }



    return (
        <div className="App">
            <header className="App-header">
                <h1>This is STATE part II</h1>
                <div className="squares">
                    {
                        squares.map((s, i) => s.show ? <Sq setSquares={setSquares} square={s} key={i} /> : null)
                    }
                </div>
                <div className="buttons">
                    <button className="black" onClick={add}>+</button>
                    <button className="red" onClick={reset}>0</button>
                    <button className="green" onClick={_ => setSquares(s => s.map(s => ({ ...s, show: true })))}>*</button>
                    <button className="yellow" onClick={syncSpin}>sync</button>
                </div>
                <div className="squares">
                    <BigSq1 sq1={sq1} setSq1={setSq2} />
                    <BigSq2 sq2={sq2} setSq2={setSq1} />

                </div>



            </header>
        </div>
    );
}