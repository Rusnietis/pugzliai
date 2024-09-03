// 25 paskaita
import './App.scss';
import Racoon from './Components/025/Racoon';

function App() {

    const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');

    return (
        <div className="App">
            <header className="App-header">
                <h1 style={
                    {
                        color: 'crimson',
                        // backgroundColor: randomColor(),
                        backgroundColor: 'black'
                    }
                }>React 25</h1>
                <Racoon name={' Jonas'} color={'darkorange'} svoris={25} randomColor={randomColor}>
                    <h4>Inside</h4>
                </Racoon>
                <Racoon name={' Ona'} color={'skyblue'} svoris={36} randomColor={randomColor}>
                    <h4>Inside</h4>
                </Racoon>
            </header>
        </div>
    );
}

export default App;