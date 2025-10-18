import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as a from '../Actions/stories';
//import { MessagesContext } from '../Contexts/Messages';



//patikrinta
export default function useStories(dispatchStories) {

    const [storeStory, setStoreStory] = useState(null);
    // const [updateWriter, setUpdateWriter] = useState(null);
    // const [destroyWriter, setDestroyWriter] = useState(null);
    // const { setUser } = useContext(Auth);
    // const { addMessage } = useContext(MessagesContext);
    // const { setErrorPageType } = useContext(Router);

    const navigate = useNavigate();



    useEffect(_ => {

        axios.get(`${SERVER_URL}/stories`, { withCredentials: true })
            .then(res => {
                console.log(res.data)
                dispatchStories(a.getStories(res.data));
            })
            .catch(err => {
                if (err?.response?.status === 401) {
                    if (err.response.data.type === 'login') {
                        navigate("/login");
                    } else {
                        navigate("/error/401");
                    }
                } else {
                    navigate("/error/503");
                    //navigate("/error/ups");
                }
                console.log(err);
            })

    }, [dispatchStories, navigate]);


    return {
        storeStory,
        setStoreStory


    };
}