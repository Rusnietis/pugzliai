import { useState, useEffect } from "react";

export default function useLocalstorage(key, keyLt, initialValue) {

    const [value, setValue] = useState(initialValue);
    const [valueLt, setValueLt] = useState(initialValue);

    // const [value, setValue] = useState(_=>{
    //     console.log('useState', 'key', key, 'initialValue', initialValue);
    //     const item = window.localStorage.getItem(key);
    //     return item ? JSON.parse(item) : initialValue;
    // })

    useEffect(_ => {
        //console.log('useEffect 1', 'key', key, 'initialValue', initialValue);
        const item = window.localStorage.getItem(key);
        setValue(item ? JSON.parse(item) : initialValue);
        const itemLt = window.localStorage.getItem(keyLt);
        setValueLt(item ? JSON.parse(itemLt) : initialValue);

    }, [key, keyLt,initialValue]);

    useEffect(_ => {
        //console.log('useEffect 2', 'key', key, 'value', value);
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    useEffect(_ => {
        //console.log('useEffect 2', 'key', key, 'value', value);
        window.localStorage.setItem(keyLt, JSON.stringify(valueLt));
    }, [valueLt, keyLt]);
    return [value, setValue, valueLt, setValueLt];

}