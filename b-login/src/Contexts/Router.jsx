import { createContext, useEffect, useState } from 'react';
import HomeIndex from '../Pages/Home/Index.jsx';
import CustomersIndex from '../Pages/Customers/Index.jsx';
import Login from '../Pages/Auth/Login.jsx';
import Page404 from '../Pages/Page404.jsx';



export const Router = createContext();

export const RouterProvider = ({ children }) => {

    const [route, setRoute] = useState(_=> {
        const hash = window.location.hash || '#home';
        return hash.split('/').shift()
    });
    const [params, setParams] = useState(_=>{
        const hash = window.location.hash.split('/');
        hash.shift();
        return hash;
    });

    useEffect(_ => {

        const handleHashChange = _ => {
            const hash = window.location.hash.split('/');
            console.log(hash);
            setRoute(hash.shift());
            setParams(hash);
            //setRoute(window.location.hash);

        }
        window.addEventListener('hashchange', handleHashChange);
        return _ => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const routes = [

        { path: '#home', component: <HomeIndex /> },
        { path: '#customers', component: <CustomersIndex /> },
        { path: '#login', component: <Login /> }

    ];

    const routeComponent = routes.find(r => r.path === route)?.component || <Page404/>;

    return (
        <Router.Provider value={params}>
            {routeComponent}
        </Router.Provider>
    )
}