import { useState } from 'react';
import './form.scss';
import './buttons.scss';
import './App.css';



function App() {

  const [animalInput, setAnimalInput] = useState('');




  return (
    <div className="App">
      <header className="App-header">
        <h1>React and Express</h1>

        <div className="form">
          <input type="text" placeholder="Enter Animal" value={animalInput} onChange={e =>setAnimalInput(e.target.value)}/>
        </div>
        <div className="buttons">
          <button className="green">Submit</button>
          <button className="red" onClick={_=> setAnimalInput('')}>Clear</button>
        </div>
      </header>
    </div>
  );
}

export default App;
