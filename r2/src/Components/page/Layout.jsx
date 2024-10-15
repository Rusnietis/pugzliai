import { useState } from 'react';
import About from './About';
import Animals from './Animals';
import Contact from './Contact';
import Home from './Home';
import Page404 from './Page404';
import { useEffect } from 'react';
import Loading from './Loading';


export default function Layout() {

    const [patch, setPatch] = useState(null);
    const [params, setParams] = useState([]);

    useEffect(_ => {

        const hash = window.location.hash.split('/')
        setPatch(hash.shift() || '#home');
        setParams(hash);


        const onHashChange = _ => {
            const hash = window.location.hash.split('/')
            setPatch(hash.shift() || '#home');
            setParams(hash);
        }

        window.addEventListener('hashchange', onHashChange);

        return _ => {
            window.removeEventListener('hashchange', onHashChange);
        }
    }, [setParams,setPatch]);


    const routes = [
        { path: '#home', component: <Home /> },
        { path: '#animals', component: <Animals /> },
        { path: '#about', component: <About /> },
        { path: '#contact', component: <Contact /> },
        { path: null, component: <Loading /> },

    ]

    return (
        <>
            {
                routes.find(route => route.path === patch)?.component || <Page404 />
            }
        </>
    )
}