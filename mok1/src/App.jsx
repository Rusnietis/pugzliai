// React State uždaviniai
import './App.scss';
import './buttons.scss'
import { useState } from 'react';


export default function App() {

    const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');


    const [circles, setCircles] = useState([])
    const [squares, setSquares] = useState([])


    const addCircle = _ => {
        if (circles < 1) {

            setCircles(c => [...c, randomColor()]);
        }
    }

    // const addSquare = _ => {

    //     setSquares(s => [...s, randomColor()]);
    // }

    const change = _ => {

        if (circles) {
            setCircles([])
            

        } else {
            setSquares([randomColor()])

        }


        // if (squares) {
        //     setSquares([])
        // }
        // if (circles) {

        //     setCircles([randomColor()])
        // }

    }



    return (
        <div className="App">
            <header className="App-header">
                <h1>React State uždaviniai</h1>
                <div className="squares">
                    {
                        squares.map((square, i) => <div className="square" style={{
                            backgroundColor: square + '66',
                            border: '1px solid ' + square
                        }} key={i}>{square}</div>)
                    }
                </div>
                <div className="circles">
                    {
                        circles.map((circle, i) => <div className="circle" style={{
                            backgroundColor: circle + '66',
                            border: '1px solid ' + circle
                        }} key={i}>{circle}</div>)
                    }
                </div>

                <div className="buttons">

                    <button className='yellow' onClick={addCircle} >ADD CIRCLE</button>

                    <button className='yellow' onClick={change} >CHANGE</button>
                </div>

            </header>
        </div>
    );
}

