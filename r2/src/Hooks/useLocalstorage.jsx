import { useState, useEffect } from 'react';

export default function useLocalstorage(key, keyLt, initialValue) {
    
    const [value, setValue] = useState(initialValue);
    const [valueLt, setValueLt] = useState(initialValue);

    // const [value, setValue] = useState(_ => {
    //     console.log('useState', 'key', key, 'initialValue', initialValue);
    //     const item = window.localStorage.getItem(key);
    //     return item ? JSON.parse(item) : initialValue;
    // });


    useEffect(_ => {
        const item = window.localStorage.getItem(key);
        setValue(item ? JSON.parse(item) : initialValue);
        const itemLt = window.localStorage.getItem(keyLt);
        setValueLt(itemLt ? JSON.parse(itemLt) : initialValue);
    }, [key, keyLt, initialValue]);


    useEffect(_ => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    useEffect(_ => {
        window.localStorage.setItem(keyLt, JSON.stringify(valueLt));
    }, [valueLt, keyLt]);


    return [value, setValue, valueLt, setValueLt];
}