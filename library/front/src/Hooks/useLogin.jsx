import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL, AFTER_LOGIN_URL, SITE_URL } from '../Constants/main';
import { Auth } from '../Contexts/Auth';
import { MessagesContext } from '../Contexts/Messages';

export default function useLogin() {

    const [inputs, setInputs] = useState(null);
    const { login } = useContext(Auth);
    const { addMessage } = useContext(MessagesContext);

    useEffect(() => {
        if (null !== inputs) {
            axios.post(`${SERVER_URL}/login`, inputs, { withCredentials: true})
                .then(res => {
                    login( res.data.name, res.data.role, res.data.id);
                    window.location.href = `${SITE_URL}/${AFTER_LOGIN_URL}`;
                    addMessage({type: 'success', text: 'Welcame to the Library' + res.data.name });
                })
                .catch(error => {
                    if (!error.response) {
                      addMessage({type: 'danger', text: 'Server is not responding'});
                    } else {
                        addMessage({type: 'danger', text: error.response.data.message})
                    }
                });
        }
    }, [inputs]);



    return [setInputs];
}