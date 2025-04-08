import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';

export const Home = createContext();

export const HomeProvider = ({ children }) => {

    const [home, setHome] = useState(null);

    useEffect(_ => {
        axios.get(`${SERVER_URL}/stats`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setHome(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <Home.Provider value={{
            home, setHome
        }}>
            {children}
        </Home.Provider>
    );
}
