import { createContext, useReducer, useState, useContext } from 'react';
import { Stories } from './Stories';
import useDonors from '../Hooks/useDonors';
import donorsReducer from '../Reducers/donorsReducer';

export const Donors = createContext();

export const DonorsProvider = ({ children }) => {

    // pagrindinis kur laikome visus autorius yra reduceris
    const [donors, dispatchDonors] = useReducer(donorsReducer, null);
    const [deleteDonor, setDeleteDonor] = useState(null);
    const [editDonor, setEditDonor] = useState(null);

    console.log('donors', donors)
   
    // is hooko gauname funkcijas, su kuriai kreipsimes i severi ir su reduserio pagalba atnaujina duomenis
    const { storeDonor, setStoreDonor, updateDonor, setUpdateDonor, destroyDonor, setDestroyDonor } = useDonors(dispatchDonors, dispatchStories);



    return (
        <Donors.Provider value={{
            donors,
            dispatchDonors,
            storeDonor,
            setStoreDonor,
            updateDonor,
            setUpdateDonor,
            destroyDonor,
            setDestroyDonor,
            deleteDonor,
            setDeleteDonor,
            editDonor,
            setEditDonor

        }}>
            {children}
        </Donors.Provider>
    );
}