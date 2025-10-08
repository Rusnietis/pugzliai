import { Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav';
import WriterIndex from './Pages/Writers/Index.jsx';
import StoriesIndex from './Pages/Stories/Index.jsx';
import HomeIndex from './Pages/Home/Index.jsx';

export default function App() {

  return (
    <div className='app'>
      <Nav/>

      <Routes>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/apie" element={<HomeIndex />} />
        <Route path="/istorijos" element={<StoriesIndex />} />
        <Route path="/mano istorijos" element={<WriterIndex />} />
        
      </Routes>
    </div>
  );
}


