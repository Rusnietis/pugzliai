import { createContext, useEffect, useState } from 'react';

import Page404 from '../Pages/Page404.jsx';
import Page503 from '../Pages/Page503.jsx';
import Page401 from '../Pages/Page401.jsx';
import AuthorIndex from '../Pages/Authors/Index.jsx';
import BookIndex from '../Pages/Books/Index.jsx';
import HeroIndex from '../Pages/Heroes/Index.jsx';
import HomeIndex from '../Pages/Home/Index.jsx';
import Login from '../Pages/Auth/Login.jsx'
import { MessagesProvider } from './Messages.jsx';
import PageUps from '../Pages/PageUps.jsx';

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

    const [errorPageType, setErrorPageType] = useState(null);

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

    const errorPages = [
        {type: 503, component: <Page503 />},
        {type: 401,component: <Page401 />},
        {type: 'ups', component: <PageUps />}
    ]

    // routeComponent - kintamasis, kuriame bus komponentas, kurį reikia rodyti
    const routeComponent = routes.find(r => r.path === route)?.component || <Page404 />;
    const errorComponent = errorPages.find(r => r.type === errorPageType)?.component || null;

    return (
        <Router.Provider value={{ params, setErrorPageType }}>
            <MessagesProvider>
                {errorComponent || routeComponent}
            </MessagesProvider>
        </Router.Provider>
    )
}


