import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from '../Constants/main';
import { Router } from '../Contexts/Router';



export default function useGet(url) {

    const { setErrorPageType } = useContext(Router)
    const [data, setData] = useState(null)

    useEffect(_ => {
        axios.get(SERVER_URL + url)
            .then(res => {

            })
            .catch(err => {

            })
            .finally(_ => {

            })

    }, [url])


}