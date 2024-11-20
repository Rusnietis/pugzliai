
import './App.scss';
import './form.scss';
import './buttons.scss';
import useLocalstorage from './Hooks/useLocalstorage';


export default function App() {
    const [racoons, setRacoons, meskenai, setMeskenai] = useLocalstorage('racoons', 'meskenai', 0);


    return (
        <div className="App">
            <header className="App-header">
                <h1>CUSTOM HOOK</h1>
                <h2>Now we have {racoons} Racoons</h2>
                <h2>Dabar mes turim tiek {meskenai} Meskenu</h2>
                <div className="buttons">
                    <button className="green" onClick={_=>setRacoons(r => r +1)}>+</button>
                    <button className="green" onClick={_=>setMeskenai(r => r +1)}>+</button>
                </div>
                
            </header>
        </div>
    );
}