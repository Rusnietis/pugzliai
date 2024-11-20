import { createContext } from 'react';

export const Router = createContext();

export const RouterProvider = ({children}) => {
    const routs = [

    ];

    return (
        <Router.Provider value={routs}>
            {children}
        </Router.Provider>
    )
}