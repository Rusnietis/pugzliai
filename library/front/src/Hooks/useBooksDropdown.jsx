import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Router } from '../Contexts/Router';


//patikrinta
export default function useBooksDropdown() {

    const [booksDropdown, setBooksDropdown] = useState(null);
    const { setErrorPageType } = useContext(Router)

    useEffect(_ => {

        axios.get(`${SERVER_URL}/books`, { withCredentials: true })
            .then(res => {
                setBooksDropdown(res.data);
            })
            .catch(err => {
                setErrorPageType('ups');
            })
    }, [setErrorPageType]);

    return { booksDropdown };

}
