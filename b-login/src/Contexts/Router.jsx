import { createContext, useEffect, useState } from 'react';
import HomeIndex from '../Pages/Home/Index.jsx';
import CustomersIndex from '../Pages/Customers/Index.jsx';
import Login from '../Pages/Auth/Login.jsx';
import Page404 from '../Pages/Page404.jsx';
import Page401 from '../Pages/Page401.jsx';
import UserIndex from '../Pages/Users/Index.jsx';



export const Router = createContext();

export const RouterProvider = ({ children }) => {

    

    const page401 = <Page401 />
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

    const [notAuthorized, setNotAuthorized] = useState(null);

    const show401Page = _ => {
        setNotAuthorized(Page401);
    }

    useEffect(_ => {
        setNotAuthorized(null);
    }, [route, setNotAuthorized])

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
        
        { path: '#home', component: <HomeIndex /> },
        { path: '#customers', component: <CustomersIndex /> },
        { path: '#login', component: <Login /> },
        { path: '#register', component: <UserIndex to="register" /> },
        { path: '#users', component: <UserIndex /> }

    ];

    // routeComponent - kintamasis, kuriame bus komponentas, kurį reikia rodyti
    const routeComponent = routes.find(r => r.path === route)?.component || <Page404 />;

    return (
        <Router.Provider value={{ params, show401Page }}>
            {notAuthorized ?? routeComponent}
              {/* jei notAuthorized yra null, rodomas routeComponent, jei ne, rodomas notAuthorized */}
        </Router.Provider>
    )
}


