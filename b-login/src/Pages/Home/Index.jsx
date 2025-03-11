import TopNav from "../TopNav";
import { useContext } from 'react';
import { Auth } from '../../Contexts/Auth';
import  useCustomers  from '../../Hooks/useCustomers'

import Gate from "../Auth/PageGate";
//import { Customers } from "../../Contexts/Customers";

export default function Index() {

    const { user } = useContext(Auth);
    const { stats } = useCustomers()

    return (
        <div>
            <TopNav />
            <h1>Home</h1>
            <div className="content">
                <div className="stats">
                    <h3>Viso klientu: {stats.totalCustomers}</h3>
                    <h3>Viso pinigų: {stats.totalAmount} eur</h3>
                </div>
                <p>Welcome to the home page</p>
                <p>Click on the links above to navigate </p>
                <a href={'#users/delete/' + user?.id}>Delete account</a>
                {/* <Gate roles="editor|viewer"><a href={'#users/delete/' + user?.id}>Delete account</a></Gate> */}
            </div>

        </div>
    )
}