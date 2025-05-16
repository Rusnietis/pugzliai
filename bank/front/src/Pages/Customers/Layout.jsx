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
            <div className="container ">
                <div className="row">
                    <div className="col-4 mt-4" >
                        <Create />
                    </div>
                    <div className="col-8 mt-4">
                        <List />
                    </div>
                </div>
            </div>
            <Delete />
            {editCustomer && <Edit />}
        </div>
    )
}