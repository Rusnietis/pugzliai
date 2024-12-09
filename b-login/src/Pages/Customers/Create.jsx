import { useContext, useState } from 'react';
import TopNav from '../TopNav';
import { Customers } from '../../Contexts/Customers';


export default function Create() {

    const [name, setName] = useState('');
    const [account, setAccount] = useState('')

    const {setCreateCustomer} = useContext(Customers);



    const add = _ => {
        const customer = {

            name,
            account,
            amount: 0

        }
        console.log(customer);
        setCreateCustomer(customer);
    }

    return (
        <div>
            <TopNav />
            <h1>Sukurti klienta</h1>
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
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                            </td>
                            <td>
                                <div className="form">
                                    <input type="text" value={account} onChange={e => setAccount(e.target.value)} />
                                </div>
                            </td>
                            <td></td>
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