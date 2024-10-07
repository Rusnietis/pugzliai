import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import './buttons.scss';
import './form.scss';
import { useEffect, useState } from 'react';
//import { v4 as uuidv4 } from 'uuid';
//import rand from './Functions/rand';
import Create from './Components/Bankas/Create';
import Read from './Components/Bankas/Read';
import Delete from './Components/Bankas/Delete';
import Edit from './Components/Bankas/Edit';
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
    }, [createData]);

    useEffect(_ => {
        if (null === destroyData) {
            return;
        }
        lsDestroy(KEY, destroyData.id);

        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== destroyData.id));
        setDeleteData(null)

    }, [destroyData]);

    useEffect(_ => {
        if (null === updateData) {
            return;
        }

        lsUpdate(KEY, updateData.id, updateData);

        setCustomers(prevCustomers => prevCustomers.map(customer => customer.id === updateData.id ? {...updateData, id:updateData.id} : customer));

        setEditData(null);
    }, [updateData])

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
            <Edit editData={editData} setEditData={setEditData} setUpdateData={setUpdateData}/>

        </>
    );
}