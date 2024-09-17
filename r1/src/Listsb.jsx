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
                <h1>React  base lists uždaviniai</h1>
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
                <h4>Trecias uzdavinys</h4>
                <div className="dogs">
                    {
                        dogs.map((dog, i) => <div className={'dog ' + (i % 2 ? 'circle' : 'square')} key={i}>{dog}</div>)
                    }
                </div>
                <h4>Ketvirtas uzdavinys</h4>
                <div className="dogs">
                    {
                        dogs.map((dog, i) => dog[0] === dog[0].toUpperCase() ? null : <div className='dog' key={i}>{dog}</div>)
                    }
                </div>




            </header>
        </div>
    );
}

export default App;