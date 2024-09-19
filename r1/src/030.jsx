// 030 paskaita


import './App.scss';
import './buttons.scss';
import './form.scss';
import { useEffect, useState } from 'react';

const animals = ['cat', 'dog', 'fish', 'bird', 'rabbit', 'hamster', 'turtle', 'snake', 'lizard', 'frog', 'chicken', 'duck', 'goat', 'horse', 'cow', 'pig', 'sheep', 'mouse', 'rat', 'guinea pig', 'chinchilla', 'ferret', 'hedgehog', 'gerbil', 'chicken', 'duck', 'goat', 'horse', 'cow', 'pig', 'sheep', 'mouse', 'rat', 'guinea pig', 'chinchilla', 'ferret', 'hedgehog', 'gerbil'];

export default function App() {

    const [singleText, setSingleText] = useState('');
    const [multiText, setMultiText] = useState({
        animal1: '',
        animal2: '',
        animal3: ''
    });
    const [select, setSelect] = useState('');
    const [checkboxes, setCheckboxes] = useState({
        A: false,
        B: true,
        C: false,
        D: false
    });
    const [radios, setRadios] = useState({
        A: false,
        B: true,
        C: false,
        D: false
    });

    const [textarea, setTextarea] = useState('');

    const [range, setRange] = useState(50);

    const [rangeSetter, setRangeSetter] = useState(50);

    const [color, setColor] = useState('#282c34');

    const [backgroundColor, setBackgroundColor] = useState('#282c34');

    useEffect(_ => {
   
        setBackgroundColor(color + parseInt(range).toString(16));
    }, [color, range]);


    const handleSingleText = e => {
        setSingleText(e.target.value);
    }

    const handleMultiText = e => {
        setMultiText(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSelect = e => {
        setSelect(e.target.value);
    }

    const handleCheckbox = e => {
        // setCheckboxes(prev => ({ ...prev, [e.target.name]: e.target.checked }));
        setCheckboxes(prev => ({ ...prev, [e.target.name]: !prev[e.target.name] }));
    }

    const handleRadio = e => {
        for (let key in radios) {
            if (key === e.target.name) {
                setRadios(prev => ({ ...prev, [key]: !prev[key] }));
            } else {
                setRadios(prev => ({ ...prev, [key]: false }));
            }
        }
    }

    const handleTextarea = e => {
        setTextarea(e.target.value);
    }

    const handleRange = e => {
        setRange(e.target.value);
    }

    const handleRageSetter = e => {
        const value = e.target.value ? e.target.value : 0;
        setRangeSetter(e.target.value);
        setRange(value);
    }

    const handleColor = e => {
        setColor(e.target.value);
    }


    return (
        <div className="App">
            <header className="App-header" style={{backgroundColor}}>
                <div className="form">
                    <input type="text" placeholder="Name" value={singleText} onChange={handleSingleText} />

                    <input type="text" name="animal1" placeholder="Animal 1" value={multiText.animal1} onChange={handleMultiText}/>
                    <input type="text" name="animal2" placeholder="Animal 2" value={multiText.animal2} onChange={handleMultiText} />
                    <input type="text" name="animal3" placeholder="Animal 3" value={multiText.animal3} onChange={handleMultiText} />

                    <select value={select} onChange={handleSelect}>
                        <option value="">Select</option>
                        {
                            animals.map((animal, index) => <option key={index} value={animal}>{animal.toUpperCase()}</option>)
                        }
                    </select>

                    <div className="checkboxes">
                        <input type="checkbox" id="A" name="A" checked={checkboxes.A} onChange={handleCheckbox} />
                        <label htmlFor="A">A</label>
                        <input type="checkbox" id="B" name="B" checked={checkboxes.B} onChange={handleCheckbox}/>
                        <label htmlFor="B">B</label>
                        <input type="checkbox" id="C" name="C" checked={checkboxes.C} onChange={handleCheckbox}/>
                        <label htmlFor="C">C</label>
                        <input type="checkbox" id="D" name="D" checked={checkboxes.D} onChange={handleCheckbox}/>
                        <label htmlFor="D">D</label>
                    </div>

                    <div className="radios">
                        <input type="checkbox" id="Ar" name="A" checked={radios.A} onChange={handleRadio} />
                        <label htmlFor="Ar">A</label>
                        <input type="checkbox" id="Br" name="B" checked={radios.B} onChange={handleRadio}/>
                        <label htmlFor="Br">B</label>
                        <input type="checkbox" id="Cr" name="C" checked={radios.C} onChange={handleRadio}/>
                        <label htmlFor="Cr">C</label>
                        <input type="checkbox" id="Dr" name="D" checked={radios.D} onChange={handleRadio}/>
                        <label htmlFor="Dr">D</label>
                    </div>

                    <textarea placeholder="Message" value={textarea} onChange={handleTextarea}></textarea>

                    <h3>{range}</h3>
                    <input type="range" min="0" max="255" step="1" value={range} onChange={handleRange} />
                    <input type="number" min="0" max="255" value={rangeSetter} onChange={handleRageSetter} />

                    <input type="color" value={color} onChange={handleColor} />
                </div>

            </header>
        </div>
    );
}