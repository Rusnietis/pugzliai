import React, { useState, useEffect, createContext } from 'react';
import About from './About';
import Animals from './Animals';
import Contact from './Contact';
import Home from './Home';
import Page404 from './Page404';
import Loading from './Loading';

export const ParameterContext = createContext();

//Layout komponenta reiktu pakeisti i  ParameterContext.Provider komponenta
export default function Layout() {

    const [path, setPath] = useState(null);
    const [params, setParams] = useState([]);

    useEffect(_ => {

        const hash = window.location.hash.split('/')
        setPath(hash.shift() || '#home');
        setParams(hash);


        const onHashChange = _ => {
            const hash = window.location.hash.split('/')
            setPath(hash.shift() || '#home');
            setParams(hash);
        }

        window.addEventListener('hashchange', onHashChange);

        return _ => {
            window.removeEventListener('hashchange', onHashChange);
        }
    }, [setParams, setPath]);


    const routes = [
        { path: '#home', component: <Home /> },
        { path: '#animals', component: <Animals /> },
        { path: '#about', component: <About /> },
        { path: '#contact', component: <Contact /> },
        { path: null, component: <Loading /> },

    ]

    return ( <ParameterContext.Provider value={
            {
                params,
                path
            }
        }>
            {
                routes.find(route => route.path === path)?.component || <Page404 />
            }
        
        </ParameterContext.Provider>
    )
}