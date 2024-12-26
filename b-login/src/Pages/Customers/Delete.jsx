import { useContext, useState, useEffect } from 'react';
import TopNav from '../TopNav';
import { Customers } from '../../Contexts/Customers';
import { Router } from '../../Contexts/Router';




export default function Delete() {

    const [customer, setCustomer] = useState(null);
    const {params} = useContext(Router); // is router konteksto paimame parametrus

    const {customers ,setDeleteCustomer, setCustomers } = useContext(Customers);


     useEffect(_ => {
            if (null == customers) {
                return;
            }
            // Patikriname ar yra klientas
            const customer = customers.find(customer => customer.id === params[1])
            console.log(customer)
            if (!customer) {
                setCustomer(null)
            } else {
                setCustomer(customer) 
            }
    
        }, [customers, params[1]])

    const doDelete = _ => {
        const customerId = customer.id; 
        setCustomers(c => c.map(customer => customer.id === customerId ? { ...customer, temp: true } : customer));
         setDeleteCustomer(customerId); 
        window.location.href = '#customers';
    }

    if (!customers)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
            </div>
        )

    if (!customer)
        return (
            <div>
                <TopNav />
                <h1>Customer not Found</h1>
            </div>
        )

    return (
        <div>
            <TopNav />


            <h1>Patvirtinkite kliento ištrinima: <b style={{color: 'red'}}>{customer.name}</b></h1>
            <div className='row'>
                <div className="button">
                    <button className="red" onClick={doDelete} >Ištrinti</button>
                    <button className="yellow" onClick={_ => window.location.href = '#customers'} >Atšaukti</button>
                </div>
            </div>
        </div>

    )
}