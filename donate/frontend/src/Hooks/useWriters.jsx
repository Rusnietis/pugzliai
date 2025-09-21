import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as a from '../Actions/writers';
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
                //console.log(res.data)
                dispatchWriters(a.getWriters(res.data));
            })
            .catch(err => {
                console.log(err)
                
            })
    }, []);


    

    return {

        storeWriter,
        setStoreWriter,
        updateWriter,
        setUpdateWriter,
        destroyWriter,
        setDestroyWriter
    };
}