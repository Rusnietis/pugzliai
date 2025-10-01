import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as c from '../Actions/writers';
//import { MessagesContext } from '../Contexts/Messages';



//patikrinta
export default function useWriters(dispatchWriters) {

    const [storeWriter, setStoreWriter] = useState(null);
    const [updateWriter, setUpdateWriter] = useState(null);
    const [destroyWriter, setDestroyWriter] = useState(null);
    // const { setUser } = useContext(Auth);
    // const { addMessage } = useContext(MessagesContext);
    // const { setErrorPageType } = useContext(Router);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/writers`)
            .then(res => {
                console.log(res.data)
                dispatchWriters(a.getWriters(res.data));
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

     useEffect(_ => {

        axios.get(`${SERVER_URL}/stories`)
            .then(res => {
                console.log(res.data)
                //dispatchWriters(a.getWriters(res.data));
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(_ => {
        if (null !== storeWriter) {
            const uuid = uuidv4();
            console.log("Siunčiam duomenis į backend:", { ...storeWriter, id: uuid });
            dispatchWriters(c.storeWriterAsTemp({ ...storeWriter, id: uuid }));
            axios.post(`${SERVER_URL}/writers`, { ...storeWriter, id: uuid })
                .then(res => {
                    console.log("POST OK:", res.data);
                    setStoreWriter(null)
                    dispatchWriters(c.storeWriterAsReal(res.data));
                })
                .catch(err => {
                    dispatchWriters(c.storeWriterAsUndo({ ...storeWriter, id: uuid }));
                    setStoreWriter(null)
                })
        }
    }, [storeWriter]);




    return {

        storeWriter,
        setStoreWriter,
        updateWriter,
        setUpdateWriter,
        destroyWriter,
        setDestroyWriter
    };
}