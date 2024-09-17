import './App.scss';
import ColorCircle from './Components/029/ColorCircle';
import randomColor from './Functions/randomColor';
import './buttons.scss';
import { useCallback, useEffect, useState } from 'react';

export default function App() {

    const [counterYellow, setCounterYellow] = useState(0);
    const [counterRed, setCounterRed] = useState(0);
    const [circleColor, setCircleColor] = useState('#777777');

    // const changeColor = _ => {
    //     setCircleColor(randomColor());
    // }

    const changeColor = useCallback(_ => {
        setCircleColor(randomColor());
    }, [setCircleColor]);


    const countYelow = _ => {
        setCounterYellow(c => c + 1);
        // changeColor();
    }

    const countRed = _ => {
        setCounterRed(c => c + 1);
        // changeColor();
    }

    useEffect(_ => {
        // console.log('useEffect');
        changeColor();
    }, [changeColor, counterYellow, counterRed]);

    const clickBlack = ja => console.log(ja + ' clickBlack');

    return (
        <div className="App">
            <header className="App-header">
                <h1>This is STATE and UseEfect</h1>
                <ColorCircle color={circleColor} />
                <div className="buttons">
                    <button className="yellow" onClick={countYelow}><h2>{counterYellow}</h2></button>
                    <button className="red" onClick={countRed}><h2>{counterRed}</h2></button>
                    <button className="black" onClick={_ => clickBlack('ja ja')}><h2>CLICK</h2></button>
                </div>
            </header>
        </div>
    );
}