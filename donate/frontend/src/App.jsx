import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import Home from './Pages/Home/Home.jsx';
import History from './Pages/History/History.jsx';


export default function App() {

  return (
    <div className='app'>
      <Nav/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apie" element={<Home />} />
        <Route path="/istorijos" element={<History />} />
        
      </Routes>
    </div>
  );
}


