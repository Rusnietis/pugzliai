import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './Components/Nav';
import WriterIndex from './Pages/Writers/Index.jsx';
import StoriesIndex from './Pages/Stories/Index.jsx';
import HomeIndex from './Pages/Home/Index.jsx';
import Login from './Pages/Auth/Login.jsx';

import Page404 from './Pages/Page404.jsx';
import Page401 from './Pages/Page401.jsx';

export default function App() {

  const location = useLocation();


  const hideNav = location.pathname === '/login';


  return (
    <div className='app'>

      {!hideNav && <Nav />}

      <Routes>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/apie" element={<HomeIndex />} />
        <Route path="/istorijos" element={<StoriesIndex />} />
        <Route path="/mano-istorijos" element={<WriterIndex />} />
        <Route path="/login" element={<Login />} />

        <Route path="/error/401" element={<Page401 />} />

        <Route path="*" element={<Page404 />} />


      </Routes>
    </div>
  );
}


