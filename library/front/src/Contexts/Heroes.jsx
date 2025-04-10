import { createContext, useState, useReducer } from 'react';
import heroesReducer from '../Reducers/heroesReducer'
import  useHeroes  from '../Hooks/useHeroes'


export const Heroes = createContext();

export const HeroesProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [heroes, dispatchHeroes] = useReducer(heroesReducer, null);
    const [deleteHero, setDeleteHero] = useState(null);
    const [editHero, setEditHero] = useState(null);

    //console.log(heroes)

    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { storeHero, setStoreHero, updateHero, setUpdateHero, destroyHero, setDestroyHero } = useHeroes(dispatchHeroes);



    return (
        <Heroes.Provider value={{
            heroes,
            dispatchHeroes,
            storeHero,
            setStoreHero,
            updateHero,
            setUpdateHero,
            destroyHero,
            setDestroyHero,
            deleteHero, 
            setDeleteHero,
            editHero, 
            setEditHero

        }}>
            {children}
        </Heroes.Provider>
    );
}