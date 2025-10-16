import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as c from '../Actions/writers';
import * as a from '../Actions/stories';
//import { MessagesContext } from '../Contexts/Messages';



//patikrinta
export default function useWriters(dispatchWriters, dispatchStories) {

    const [storeWriter, setStoreWriter] = useState(null);
    const [updateWriter, setUpdateWriter] = useState(null);
    const [destroyWriter, setDestroyWriter] = useState(null);
    // const { setUser } = useContext(Auth);
    // const { addMessage } = useContext(MessagesContext);
    // const { setErrorPageType } = useContext(Router);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/writers`, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                dispatchWriters(c.getWriters(res.data));
            })
            .catch(err => {
                console.log(err)
            })
    }, [destroyWriter]);

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
                    dispatchStories(a.addStory({
                        id: res.data.storyId,  // priklauso nuo to, ką backend grąžina
                        writer_id: res.data.writerId,
                        title: res.data.title,
                        short_description: res.data.shortDescription,
                        story: res.data.story,
                        goal: res.data.goal,
                        image: res.data.image,
                        status: res.data.status,
                        collected: res.data.collected
                    }));
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