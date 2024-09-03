// 26 paskaita

import './App.scss';
import Animal from './Components/026/Animal';

// import Sq from './Components/026/Sq';


function App() {

    // const randomColor = _ => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    // const colors = [
    //     <li>red</li>,
    //     <li>green</li>,
    //     <li>blue</li>,
    //     <li>yellow</li>,
    //     <li>orange</li>,
    //     <li>purple</li>,
    //     <li>pink</li>,
    //     <li>brown</li>,
    //     <li>black</li>
    // ];

    const colors2 = ['crimson', 'darkorange', 'skyblue', 'skyblue', 'limegreen', 'darkorchid', 'gold', 'tomato', 'dodgerblue', 'mediumseagreen', 'rebeccapurple', 'darkkhaki', 'steelblue', 'mediumvioletred', 'darkslateblue', 'darkcyan', 'darkslategray', 'darkturquoise', 'cornflowerblue', 'darkgoldenrod', 'darkolivegreen', 'darkmagenta', 'darkred', 'darkgreen', 'darkblue', 'darkviolet', 'darkgray', 'darkslategrey'];

    const farm = [
        'Big Cow',
        'Small Cow',
        'Big Pig',
        'Small Pig',
        'Angry Chicken',
        'Happy Chicken',
        'Big Sheep',
        'Bad Sheep',
        'Big Goat',
        'White Goat',
        'Black Goat',
        'Tiny Goat',
        'Techno Chicken',
        'Big Dog',
        'Big Horse',
        'Small Horse',
        'Big Duck',
        'Small Duck',
        'Big Turkey',
        'Very Big Turkey',
        'Small Turkey'
    ];

    return (
        <div className="App">
            <header className="App-header">
                <h1>LISTS</h1>
                {/* <ul>
                    {
                        colors2.map((color, i) => <li key={i} style={{color}}>{color}</li>)
                    }
                </ul> */}
                {/* <div className="sq-bin">
                    {
                        colors2.map((color, i) => <Sq key={i} color={color}/>)
                    }
                </div> */}

                <div className="squares">
                    {
                        farm.map((animal, i) => <Animal key={i} betKas={animal}/>)
                    }
                </div>  
            </header>
        </div>
    );
}

export default App;