import Nav from '../../Components/Nav';
// import Create from './Create';
// import List from './List';
// import Delete from './Delete';
// import Edit from './Edit';
import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';
import Create from './Create';


export default function Layout() {

    const { editCustomer, customers } = useContext(Customers)

    if (null === customers) {
        return < div classNameName="loader"><div></div></div>
    }

    return (
        <div >
            <Nav />
            <div className="card">
                <h5 className="card-header">Naujo kliento pridejimas</h5>
                <div className="card-body">
                <Create />
                </div>
            </div>
           

        </div>
    )
}