import TopNav from "../TopNav";
import { useContext, useEffect, useState } from 'react';
import { Auth } from '../../Contexts/Auth';
import useCustomers from '../../Hooks/useCustomers'

import Gate from "../Auth/PageGate";
import axios from "axios";
import { SERVER_URL } from "../../Constants/main";
//import { Customers } from "../../Contexts/Customers";

export default function Index() {

    const [stats, setStats] = useState({ totalCustomers: 0, totalAmount: 0 })
console.log(stats)
    const { user } = useContext(Auth);
    //const { stats } = useCustomers()

    useEffect(_ => {
        axios.get(`${SERVER_URL}` + `/stats`)
            .then(res => {
                setStats(res.data.stats)
            })
            .catch(err => console.log(err))

    }, []);

    return (
        <div>
            <TopNav />
            <h1>Home</h1>
            <div className="content">
                <div className="container mt-3">
                    <h2>Banko statistika</h2>
                    <div className="card p-3">
                        <p><strong>Viso klientų:</strong ><b style={{color: 'red'}}> {stats.totalCustomers}</b></p>
                        <p><strong>Viso pinigų:</strong> <b style={{color: 'red'}}>{stats.totalAmount}</b> €</p>
                    </div>
                </div>
                <p>Welcome to the home page</p>
                <p>Click on the links above to navigate </p>
                <a href={'#users/delete/' + user?.id}>Delete account</a>
                {/* <Gate roles="editor|viewer"><a href={'#users/delete/' + user?.id}>Delete account</a></Gate> */}
            </div>

        </div>
    )
}