import { createContext, useEffect, useState } from 'react';

import Page404 from '../Pages/Page404.jsx';
import AuthorIndex from '../Pages/Authors/Index.jsx';
import BookIndex from '../Pages/Books/Index.jsx';
import HeroIndex from '../Pages/Heroes/Index.jsx';
import HomeIndex from '../Pages/Home/Index.jsx';
import Login from '../Pages/Auth/Login.jsx'
import { MessagesProvider } from './Messages.jsx';

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
            //console.log(hash);
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
            //console.log(hash);
            setRoute(hash.shift());
            setParams(hash);
            //setRoute(window.location.hash);

        }
        window.addEventListener('hashchange', handleHashChange);
        return _ => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const routes = [

        { path: '#authors', component: <AuthorIndex /> },
        { path: '#books', component: <BookIndex /> },
        { path: '#heroes', component: <HeroIndex /> },
        { path: '#home', component: <HomeIndex /> },
        { path: '#login', component: <Login /> }
    ];

    // routeComponent - kintamasis, kuriame bus komponentas, kurį reikia rodyti
    const routeComponent = routes.find(r => r.path === route)?.component || <Page404 />;

    return (
        <Router.Provider value={{ params }}>
            <MessagesProvider>
                {routeComponent}
            </MessagesProvider>
        </Router.Provider>
    )
}


