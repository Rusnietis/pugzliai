import { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SERVER_URL } from '../Constants/main';
import * as a from '../Actions/books';


//patikrinta
export default function useBooks(dispatchBooks) {

    const [storeBook, setStoreBook] = useState(null);
    const [updateBook, setUpdateBook] = useState(null);
    const [destroyBook, setDestroyBook] = useState(null);


    useEffect(_ => {
        axios.get(`${SERVER_URL}/books`)
            .then(res => {
                console.log(res.data);
                dispatchBooks(a.getBooks(res.data));
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    //store

    useEffect(_ => {
        if (null !== storeBook) {
            const uuid = uuidv4();
            dispatchBooks(a.storeBookAsTemp({ ...storeBook, id: uuid }));
            const withOutBook = { ...storeBook };
            delete withOutBook.author;
            axios.post(`${SERVER_URL}/books`, { ...withOutBook, id: uuid })
                .then(res => {
                    setStoreBook(null);
                    dispatchBooks(a.storeBookAsReal(res.data))
                })
                .catch(err => {
                    dispatchBooks(a.storeBookAsUndo({ ...storeBook, id: uuid }));
                    setStoreBook(null);
                });
        }
    }, [storeBook, dispatchBooks]);

    useEffect(_ => {
        if (null !== updateBook) {
            dispatchBooks(a.updateBookAsTemp(updateBook));
            const withOutAuthor = {...updateBook};
            delete withOutAuthor.author;
            axios.put(`${SERVER_URL}/books/${updateBook.id}`, withOutAuthor)
                .then(res => {
                    setUpdateBook(null);
                    dispatchBooks(a.updateBookAsReal(res.data));
                })
                .catch(err => {
                    setUpdateBook(null);
                    dispatchBooks(a.updateBookAsUndo(updateBook));
                });

        }
    }, [updateBook, dispatchBooks])

    //delete 

    useEffect(_ => {
        if (null !== destroyBook) {
            dispatchBooks(a.deleteBookAsTemp(destroyBook));
            axios.delete(`${SERVER_URL}/books/${destroyBook.id}`)
                .then(res => {
                    setDestroyBook(null);
                    dispatchBooks(a.deleteBookAsReal(res.data));
                })
                .catch(err => {
                    dispatchBooks(a.deleteBookAsUndo(destroyBook));
                    setDestroyBook(null);
                })
        }
    }, [destroyBook, dispatchBooks]);

    return {

        storeBook,
        setStoreBook,
        updateBook,
        setUpdateBook,
        destroyBook,
        setDestroyBook
    };
}