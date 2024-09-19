import './App.scss';
import './buttons.scss';
import './form.scss';
import { useEffect, useState } from 'react';
//31 paskaita
export default function App() {

    const [cat, setCat] = useState('');
    const [dog, setDog] = useState('');
    const [bird, setBird] = useState('');

    useEffect(_ => {
        let animals = JSON.parse(localStorage.getItem('animals'));
        if (null === animals)  {
            return;
        }
        setCat(animals.cat);
        setDog(animals.dog);
        setBird(animals.bird);
    }, []);

    const saveCat = _ => {
        localStorage.setItem('cat', cat);
    }

    const removeCat = _ => {
        localStorage.removeItem('cat');
    }

    const getCat = _ => {
        setCat(localStorage.getItem('cat'));
    }

    const addDog = _ => {
        localStorage.setItem('dog', dog);
    }

    const removeDog = _ => {
        localStorage.removeItem('dog');
    }

    const addBird = _ => {
        localStorage.setItem('bird', bird);
    }

    const removeBird = _ => {
        localStorage.removeItem('bird');
    }

    const clear = _ => {
        localStorage.clear();
    }

    const addAll = _ => {
        localStorage.setItem('animals', JSON.stringify({cat, dog, bird}));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>This is Local Storage</h1>

                <div className="form">
                    <label>Cat</label>
                    <input type="text" name="cat" value={cat} onChange={e => setCat(e.target.value)} />
                    <label>Dog</label>
                    <input type="text" name="dog" value={dog} onChange={e => setDog(e.target.value)} />
                    <label>Bird</label>
                    <input type="text" name="bird" value={bird} onChange={e => setBird(e.target.value)} />
                    <input type="text" name="name" autoComplete="off" />
                    <div className="buttons">
                        <button className="black" onClick={saveCat}>Add Cat</button>
                        <button className="red" onClick={removeCat}>Remove Cat</button>
                        <button className="black" onClick={getCat}>Get Cat</button>
                        <button className="yellow" onClick={addDog}>Add Dog</button>
                        <button className="red" onClick={removeDog}>Remove Dog</button>
                        <button className="green" onClick={addBird}>Add Bird</button>
                        <button className="red" onClick={removeBird}>Remove Bird</button>

                        <button className="white" onClick={addAll}>Add All</button>

                        <button className="red" onClick={clear}>Clear</button>
                    </div>
                </div>






            </header>
        </div>
    );
}