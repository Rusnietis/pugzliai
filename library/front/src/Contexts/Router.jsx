import { createContext, useEffect, useState } from 'react';

import Page404 from '../Pages/Page404.jsx';
import AuthorIndex from '../Pages/Authors/Index.jsx'


export const Router = createContext();

export const RouterProvider = () => {

    // apskaičiuoja pradinę reikšmę, kuri bus naudojama kaip pradinė reikšmė
    const [route, setRoute] = useState(_ => {
        const hash = window.location.hash || '#home';
        return hash.split('/').shift()
    });
    // suskaiciuoja parametrus
    const [params, setParams] = useState(_ => {
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

        { path: '#authors', component: <AuthorIndex /> },


    ];

    // routeComponent - kintamasis, kuriame bus komponentas, kurį reikia rodyti
    const routeComponent = routes.find(r => r.path === route)?.component || <Page404 />;

    return (
        <Router.Provider value={{ params }}>
            {routeComponent}

        </Router.Provider>
    )
}


