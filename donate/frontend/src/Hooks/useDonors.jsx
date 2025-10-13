import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as c from '../Actions/donors';
import * as a from '../Actions/stories';
//import { MessagesContext } from '../Contexts/Messages';



//patikrinta
export default function useDonors(dispatchDonors, dispatchStories) {

    const [storeDonor, setStoreDonor] = useState(null);
    const [updateDonor, setUpdateDonor] = useState(null);
    const [destroyDonor, setDestroyDonor] = useState(null);
    // const { setUser } = useContext(Auth);
    // const { addMessage } = useContext(MessagesContext);
    // const { setErrorPageType } = useContext(Router);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/donors`)
            .then(res => {
                console.log(res.data)
                dispatchDonors(c.getDonors(res.data));
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    useEffect(_ => {
        if (null !== storeDonor) {
            const uuid = uuidv4();
            console.log("Siunčiam duomenis į backend:", { ...storeDonor, id: uuid });
            dispatchDonors(c.storeDonorAsTemp({ ...storeDonor, id: uuid }));
            axios.post(`${SERVER_URL}/donors`, { ...storeDonor, id: uuid })
                .then(res => {
                    console.log("POST OK:", res.data);
                    setStoreDonor(null)
                    dispatchDonors(c.storeDonorAsReal(res.data));
                    dispatchStories(a.addStory({
                        id: res.data.storyId,  // priklauso nuo to, ką backend grąžina
                        donor_id: res.data.donorId,
                        title: res.data.title,
                        short_description: res.data.shortDescription,
                        story: res.data.story,
                        goal: res.data.goal,
                        image: res.data.image,
                        status: res.data.status
                    }));
                })
                .catch(err => {
                    dispatchDonors(c.storeDonorAsUndo({ ...storeDonor, id: uuid }));
                    setStoreDonor(null)
                })
        }
    }, [storeDonor]);




    return {

        storeDonor,
        setStoreDonor,
        updateDonor,
        setUpdateDonor,
        destroyDonor,
        setDestroyDonor
    };
}