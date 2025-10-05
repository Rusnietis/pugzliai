import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import WriterIndex from './Pages/Writers/Index.jsx';
import HomeIndex from './Pages/Home/Index.jsx';

export default function App() {

  return (
    <div className='app'>
      <Nav/>

      <Routes>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/apie" element={<HomeIndex />} />
        <Route path="/istorijos" element={<WriterIndex />} />
        
      </Routes>
    </div>
  );
}


