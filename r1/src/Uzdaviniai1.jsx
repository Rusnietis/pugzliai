//React Base uzdaviniai


import './App.scss';
import Animal from './Components/Uzdaviniai/Animal';
import Labas from './Components/Uzdaviniai/Labas';
import Tekstas from './Components/Uzdaviniai/Tekstas';
import Tekstas1 from './Components/Uzdaviniai/Tekstas1';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Uždaviniai </h1>
        <Labas />
        <h1>Grazi diena</h1>
        <Animal color={'blue'} />
        <Tekstas sakinys={<h1>Koks grazus rytas</h1>} sakinys1={<h2>Koks grazus vakaras</h2>} />
        <Tekstas1 sakinys={'Koks grazus pasaulis'} sakinys1={'Koks grazus pastatas'} color={'red'} />
      </header>
    </div>
  );
}

export default App;