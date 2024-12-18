import { useContext, useEffect, useState } from 'react';
import TopNav from '../TopNav';
import { Customers } from '../../Contexts/Customers';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '../../Contexts/Router';


export default function Edit() {

    const { customers, setCreateCustomer, setCustomers } = useContext(Customers);
    const params = useContext(Router);

    const [name, setName] = useState('');
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('0');





    useEffect(_ => {
        if (null == customers) {
            return;
        }
        const customer = customers.find(customer => customer.id === +params[1])
        if (null == customer) {
            return;
        }

        setName(customer.name);
        setAccount(customer.account);
        setAmount(customer.amount);

    }, [customers, params[1]], setName, setAccount, setAmount)

    const add = _ => {
        const customer = {

            name,
            account,
            amount: '0',
            id: uuidv4()

        }
        console.log(customer);
        setCustomers(c => [...c, { ...customer, temp: true }]);
        setCreateCustomer(customer);
        window.location.href = '#customers';
    }

    if (!customers)
        return (
            <div>
                <TopNav />
                <h1>Loading...</h1>
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
                                <div className="form">
                                    <input type="text" value={name} />
                                </div>
                            </td>
                            <td>
                                <div className="form">
                                    <input type="text" value={account} />
                                </div>
                            </td>
                            <td>
                            <div className="form">
                                    <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <div className="buttons">
                                    <button className="yellow" onClick={add} >Pridėti</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    )
}