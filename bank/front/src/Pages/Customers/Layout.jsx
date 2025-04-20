import Nav from '../../Components/Nav';
// import Create from './Create';
// import List from './List';
// import Delete from './Delete';
// import Edit from './Edit';
import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';


export default function Layout() {

    const { editCustomer, customers } = useContext(Customers)

    if (null === customers) {
        return < div className="loader"><div></div></div>
    }
  
    return (
        <div>
            <Nav />
            <h1>Klientai</h1>
        </div>
    )
}