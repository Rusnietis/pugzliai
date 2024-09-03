import './App.scss';

function App() {

    const dogs = ['šuo', 'šunius', 'Bobikas', 'kudlius', 'Šarikas', 'avigalvis'];

    return (
        <div className="App">
            <header className="App-header">
                <h1>DOG LISTS</h1>
                <div className="dogs">
                    {
                        dogs.map((dog, i) => <div className={'dog ' + (i % 2 ? 'circle' : 'square')} key={i}>{dog}</div>)
                    }
                </div>

                <div className="dogs">
                    {
                        dogs.map((dog, i) => dog[0] === dog[0].toUpperCase() ? null : <div className="dog" key={i}>{dog}</div>)
                    }
                </div>
               
            </header>
        </div>
    );
}

export default App;