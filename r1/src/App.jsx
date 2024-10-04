import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import './buttons.scss';
import './form.scss';
import { useEffect, useState } from 'react';
//import { v4 as uuidv4 } from 'uuid';
//import rand from './Functions/rand';
import Create from './Components/Bankas/Create';
import Read from './Components/Bankas/Read';
import { lsRead, lsStore } from './Components/Bankas/lsManager'


//Bankas CRUD ver.1
export default function App() {

    const KEY = 'custumers';

    const [customers, setCustomers] = useState([])
    const [createData, setCreateData] = useState(null);
    console.log(customers)
    useEffect(_ => {
        setCustomers(lsRead(KEY))
    }, [])
    useEffect(_ => {
        if (null === createData) {
            return;
        }
        lsStore(KEY, createData)
        console.log(createData);
        // setCostumers(prevCostumers => [...prevCostumers, { ...createData, id }]);
    }, [createData]);

    return (
        <>
            <h1>Bankas</h1>
            <div className="container mt-5">
                <div className="row">

                    <div className="row-1">
                        <Create setCreateData={setCreateData} />
                    </div>
                    <div className="row-2">
                        <Read customers={customers} />
                    </div>

                </div>


            </div>
            {/* <Delete  />
        <Edit /> */}

        </>
    );
}