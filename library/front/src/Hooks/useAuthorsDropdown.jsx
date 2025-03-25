import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';



//patikrinta
export default function useAuthorsDropdown() {

    const [authorsDropdown, setAuthorsDropdown] = useState(null);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/authors`)
            .then(res => {
                //console.log(res.data)
                setAuthorsDropdown(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return {authorsDropdown};

}
