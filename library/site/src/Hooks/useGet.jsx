import axios from 'axios';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Router } from '../Contexts/Router.jsx';

export default function useGet(startUrl) {

    const SERVER_URL = 'http://library.org';

    const {setErrorPageType} = useContext(Router);
    
    const [url, setUrl] = useState(startUrl);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
      //console.log(data)
    useEffect(_ => {
        axios.get(SERVER_URL + url)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setErrorPageType('ups');
            })
            .finally(_ => {
                setLoading(false);
            });
    }, [url, setErrorPageType]);

    return { data, loading, setUrl };
}