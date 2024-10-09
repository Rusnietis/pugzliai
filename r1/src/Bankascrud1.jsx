import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import './App.scss';
import './buttons.scss';
import './form.scss';
import { useCallback, useEffect, useState } from 'react';
//import { v4 as uuidv4 } from 'uuid';
//import rand from './Functions/rand';
import Create from './Components/Bankas/Create';
import Read from './Components/Bankas/Read';
import Delete from './Components/Bankas/Delete';
import Edit from './Components/Bankas/Edit';
import Messages from './Components/Bankas/Messages';
import { lsDestroy, lsRead, lsStore, lsUpdate } from './Components/Bankas/lsManager'


//Bankas CRUD ver.1
export default function App() {

    const KEY = 'custumers';

    const [customers, setCustomers] = useState([])
    const [createData, setCreateData] = useState(null);
    const [deleteData, setDeleteData] = useState(null); // valdo modala ir duomenis, kurios galima istrinti
    const [destroyData, setDestroyData] = useState(null);
    const [editData, setEditData] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const [messages, setMessages] = useState([]);

    // { id: 1, type: 'danger', text: 'Error' },
    // { id: 2, type: 'dark', text: 'Success' },
    // { id: 3, type: 'warning', text: 'Warning' },
    // { id: 4, type: 'info', text: 'Info' }

    const addMessage = useCallback((type, text) => {
        const id = uuidv4();
        setMessages(prevMessages => [{ id, type, text }, ...prevMessages]);
        setTimeout(_ => {
            setMessages(prevMessages => prevMessages.filter(m => m.id !== id));
        }, 5000)
    },[]);

    console.log(deleteData)
    useEffect(_ => {
        setCustomers(lsRead(KEY))
    }, [])
    useEffect(_ => {
        if (null === createData) {
            return;
        }
        const id = lsStore(KEY, createData)
        console.log(createData);
        setCustomers(prevCustomers => [...prevCustomers, { ...createData, id }]);
        addMessage('dark', 'Klientas pridėtas sėkmingai');
    }, [createData, setCustomers, addMessage]);

    useEffect(_ => {
        if (null === destroyData) {
            return;
        }
        lsDestroy(KEY, destroyData.id);
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== destroyData.id));
        setDeleteData(null)
        addMessage('danger', 'Klientas pašalintas sėkmingai');
    }, [destroyData, setCustomers, addMessage]);

    useEffect(_ => {
        if (null === updateData) {
            return;
        }
        lsUpdate(KEY, updateData.id, updateData);
        setCustomers(prevCustomers => prevCustomers.map(customer => customer.id === updateData.id ? { ...updateData, id: updateData.id } : customer));
        setEditData(null);
        addMessage('dark', 'Klientas atnaujintas sėkmingai');
    }, [updateData, setCustomers, addMessage])

  

    return (
        <>
            <h1>Bankas</h1>
            <div className="container mt-5">
                <div className="row">

                    <div className="row-1">
                        <Create setCreateData={setCreateData} />
                    </div>
                    <div className="row-2">
                        <Read customers={customers} setDeleteData={setDeleteData} setEditData={setEditData} />
                    </div>

                </div>


            </div>
            <Delete deleteData={deleteData} setDeleteData={setDeleteData} setDestroyData={setDestroyData} />
            <Edit editData={editData} setEditData={setEditData} setUpdateData={setUpdateData} />
            <Messages messages={messages} />

        </>
    );
}