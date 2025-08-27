import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
//import { Router } from './Router';

export const Home = createContext();

export const HomeProvider = ({ children }) => {

    const [home, setHome] = useState(null);
    // const {setErrorPageType} = useContext(Router)

    useEffect(_ => {
        axios.get(`${SERVER_URL}/home-stats`)
            .then(res => {
                console.log(res.data);
                setHome(res.data ?? []);
            })
            .catch(err => {
                console.log(err);
            })
    }, [setHome])


    return (
        <Home.Provider value={{
            home, setHome
        }}>
            {children}
        </Home.Provider>
    );
}
