import { useContext } from 'react';
import TopNav from '../TopNav';
import { Customers } from '../../Contexts/Customers';
import Customer from './Customer';

export default function List() {
    const { customers = [] } = useContext(Customers);

    return (
        <div>
            <TopNav />
            <h1>Klientų sąrašas</h1>
            <div className="row-1">
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Vardas</th>
                        <th>Sąskaita</th>
                        <th>Suma</th>
                        <th>Veiksmai</th>
                        <th>Sumos ivedimas</th>
                        <th>Operacijos</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <Customer key={customer.id} customer={customer} />
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}





