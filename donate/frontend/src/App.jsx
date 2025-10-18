import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './Components/Nav';
import WriterIndex from './Pages/Writers/Index.jsx';
import StoriesIndex from './Pages/Stories/Index.jsx';
import HomeIndex from './Pages/Home/Index.jsx';
import RegisterIndex from './Pages/Users/Index.jsx';
import Login from './Pages/Auth/Login.jsx';

import Page404 from './Pages/Page404.jsx';
import Page401 from './Pages/Page401.jsx';
import Page503 from './Pages/Page503.jsx';
import PageUPS from './Pages/PageUps.jsx';


export default function App() {

  const location = useLocation();

  const noNavRoutes = ["/login","/error/ups", "/error/401", "/error/403", "/error/500", "/error/503"];


  const hideNav = noNavRoutes.includes(location.pathname);


  return (
    <div className='app'>

      {!hideNav && <Nav />}

      <Routes>
        <Route path="/" element={<HomeIndex />} />
        <Route path="/apie" element={<HomeIndex />} />
        <Route path="/istorijos" element={<StoriesIndex />} />
        <Route path="/mano-istorijos" element={<WriterIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/*" element={<RegisterIndex />} />

        <Route path="/error/ups" element={<PageUPS />} />
        <Route path="/error/401" element={<Page401 />} />
        <Route path="/error/503" element={<Page503 />} />

        <Route path="*" element={<Page404 />} />


      </Routes>
    </div>
  );
}


