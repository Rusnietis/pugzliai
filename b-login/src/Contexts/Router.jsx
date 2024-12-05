import { createContext } from 'react';

export const Router = createContext();

export const RouterProvider = ({ children }) => {
    const routes = [

    ];

    return (
        <Router.Provider value={routes}>
            {children}
        </Router.Provider>
    )
}