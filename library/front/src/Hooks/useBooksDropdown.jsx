import { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';



//patikrinta
export default function useBooksDropdown() {

    const [booksDropdown, setBooksDropdown] = useState(null);


    useEffect(_ => {

        axios.get(`${SERVER_URL}/books`)
            .then(res => {
                setBooksDropdown(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return {booksDropdown};

}
