import Nav from '../../Components/Nav';
// import Create from './Create';
import Delete from './Delete';
import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';
import Create from './Create';
import List from './List';
import Edit from './Edit';


export default function Layout() {

    const { editCustomer, customers } = useContext(Customers)

    if (null === customers) {
        return < div className="loader"><div></div></div>
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
            <Delete />
            <List />
           {editCustomer && <Edit />}
        </div>
    )
}