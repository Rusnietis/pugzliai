import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import './buttons.scss';
import './form.scss';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
//import rand from './Functions/rand';
import Create from './Components/Bankas/Create';
import { lsRead, lsStore } from './Components/Bankas/lsManager'


//Bankas CRUD ver.1
export default function App() {

    const KEY = 'costumers';

    const [costumers, setCostumers] = useState({})
    const [createData, setCreateData] = useState(null);
    console.log(costumers)
    // useEffect(_=> {
    //     setCostumers(lsRead(KEY))
    // })
    useEffect(_ => {
        if (null === createData) {
            return;
        }
        const id = lsStore(KEY, createData);
        // setCostumers(prevCostumers => [...prevCostumers, { ...createData, id }]);
        

    }, [createData]);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="row-1">
                        {/* <Read /> */}
                    </div>
                    <div className="row-2">
                        <Create setCreateData={setCreateData} />
                    </div>
                </div>


            </div>
            {/* <Delete  />
        <Edit /> */}

        </>
    );
}