import { useContext, useEffect, useState } from 'react';
import TopNav from '../TopNav';
import { Customers } from '../../Contexts/Customers';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '../../Contexts/Router';


export default function Edit() {

    const { customers, setEditCustomer, setCustomers } = useContext(Customers);
    const params = useContext(Router);

    const [name, setName] = useState('');
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');
    const [customer, setCustomer] = useState(null);

    useEffect(_ => {
        if (null === customers) {
            return;
        }
        // Patikriname ar yra klientas
        const customer = customers.find(customer => customer.id === +params[1])
        if (!customer) {
            setCustomer(null)
        } else {
            setCustomer(customer);
        }

    }, [customers, params[1]])

    useEffect(_ => {
        if (null === customer) {
            return;
        }
        setName(customer.name);
        setAccount(customer.account);
        setAmount(customer.amount);
    }, [customer, setName, setAccount, setAmount])

    const save = _ => {
        const editedCustomer = {

            name,
            account,
            amount,
            id: customer.id

        }
        console.log(customer);
        setCustomers(c => [...c, { ...editedCustomer, temp: true }]);
        setEditCustomer(customer);
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
            <h1>Pinigu pridejimas</h1>
            <div className='row'>
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Vardas, pavardė</th>
                            <th scope="col">Sąskaitos Nr.</th>
                            <th scope="col">Suma</th>
                            <th scope="col">Pridėti</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">#</th>
                            <td>
                                {name}
                            </td>
                            <td>
                                {account}
                            </td>
                            <td>
                                <div className="form">
                                    <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <div className="buttons">
                                    <button className="yellow" onClick={save} >Išsaugoti</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}