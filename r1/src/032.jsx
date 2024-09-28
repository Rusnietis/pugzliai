import './App.scss';
import './buttons.scss';
import A from './Components/035/A';
import { useState } from 'react';
import { Context } from './Components/035/Context';
import { ColorContext } from './Components/035/ColorContext';
// 32 paskaita
function App() {

    const [counter1, setCounter1] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [color, setColor] = useState('#000000');
    const hello = 'hello, Africa!';

    return (
        <div className="App">
            <header className="App-header">
                <h2>CONTEXT I:{counter1} II:{counter2}</h2>
                <div className="buttons">
                    <button className="yellow" onClick={_ => setCounter1(c => c + 1)}>I+</button>
                    <button className="green" onClick={_ => setCounter2(c => c + 1)}>II+</button>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                </div>
                <ColorContext.Provider value={
                    {
                        color
                    }
                }>

                <Context.Provider value={
                    {
                        counter2,
                        hello
                    }
                }>
                <A counter1={counter1} />
                </Context.Provider>
                </ColorContext.Provider>
            </header>
        </div>
    );
}

export default App;