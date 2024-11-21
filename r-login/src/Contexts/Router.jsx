import { useEffect, useState } from 'react';
import { createContext } from 'react';
import HomeIndex from '../Pages/Home/index.jsx';
import FruitsIndex from '../Pages/Fruits/index.jsx';
import Login from '../Pages/Auth/Login.jsx';
import Page404 from '../Pages/Page404.jsx';

 
export const Router = createContext();

export const RouterProvider = ({ children }) => {

    const [route, setRoute] = useState('#home');
    const [params, setParams] = useState([]);


    const routes = [
        { path: '#home', component: <HomeIndex /> },
        { path: '#fruits', component: <FruitsIndex /> },
        { path: '#login', component: <Login /> }

    ];

    useEffect(_ => {
        const handleHashChange = _ => {
            const hash = window.location.hash.split('/');
            console.log(hash);
            setRoute(hash.shift());
            setParams(hash);
        }
        window.addEventListener('hashchange', handleHashChange);
        return _ => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const routeComponent = routes.find(r=> r.path === route)?.component || <Page404/>

    return (
        <Router.Provider value={params}>
            {routeComponent}
        </Router.Provider>
    )
}