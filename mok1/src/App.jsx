//Lists uzdaviniai

import './App.scss';
import Tvenkinys from './Components/Lists/Antruz/Tvenkinys';
import Bala from './Components/Lists/Pirmuz/Bala';
import Jura from './Components/Lists/Trecuz/Jura';
import Vandenynas from './Components/Lists/Ketuz/Vandenynas';
import Pasaulis from './Components/Lists/Penkuz/Pasaulis';

// import randomColor from './Functions/randomColor';
// import Dogs from './Components/Lists/Dogs';

function App() {

    const seaPlaners = [
        { id: 1, type: 'man', name: 'Lina', color: 'blue' },
        { id: 2, type: 'car', name: 'Opel', color: 'red' },
        { id: 3, type: 'animal', name: 'Vilkas', color: 'green' },
        { id: 4, type: 'fish', name: 'Ungurys', color: 'yellow' },
        { id: 5, type: 'man', name: 'Tomas', color: 'green' },
        { id: 6, type: 'animal', name: 'Bebras', color: 'red' },
        { id: 7, type: 'animal', name: 'Barsukas', color: 'green' },
        { id: 8, type: 'car', name: 'MB', color: 'blue' },
        { id: 9, type: 'car', name: 'ZIL', color: 'red' },
        { id: 10, type: 'man', name: 'Teta Toma', color: 'yellow' },
    ];

    console.log(seaPlaners);

    return (
        <div className="App">
            <header className="App-header">
                <h1>React lists uždaviniai</h1>
                <h4>Pirmas uzdavinys</h4>
                <div>
                    {
                        seaPlaners.map((item) => <Bala key={item.id} vardas={item.name} color={item.color} />)
                    }
                </div>

                <h4>Antras uzdavinys</h4>

                <Tvenkinys data={seaPlaners}/>
                {/* 
                <div>
                    {
                        seaPlaners.filter(item => item.id % 2 === 0).map((item) => <Tvenkinys key={item.id} vardas={item.name} color={item.color} tipas={item.type} />)
                    }
                </div>
                <div>
                    {
                        seaPlaners.filter(item => item.id % 2 !== 0).map((item) => <Tvenkinys key={item.id} vardas={item.name} color={item.color} tipas={item.type} />)
                    }
                </div> */}
                <h4>Trecias uzdavinys</h4>

                <Jura data={seaPlaners} />

                <h4>Ketvirtas uzdavinys</h4>

                <Vandenynas data={seaPlaners} />

                <h4>Penktas uzdavinys</h4>

                <Pasaulis data={seaPlaners}/>

            </header>
        </div>
    );
}

export default App;