//Lists uzdaviniai

import './App.scss';
// import randomColor from './Functions/randomColor';
// import Dogs from './Components/Lists/Dogs';

function App() {

    const dogs = ['šuo', 'šunius', 'Bobikas', 'kudlius', 'Šarikas', 'avigalvis'];
    console.log(dogs);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React lists uždaviniai</h1>
                <h4>Pirmas uzdavinys</h4>
                {/* <div className="squares">
                    {
                        dogs.map((animal, i) => <Dogs key={i} vardas={animal} />)
                    }
                </div> */}
                <h4>Antras uzdavinys</h4>
                {/* <div className="circles">
                    {
                        dogs.sort().map((animal, i) => <Dogs key={i} skaicius={i + 1} vardas={animal} />)
                    }
                </div> */}
            




            </header>
        </div>
    );
}

export default App;