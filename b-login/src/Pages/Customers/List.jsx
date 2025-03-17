import { useContext } from 'react';
import TopNav from '../TopNav';
import { Customers } from '../../Contexts/Customers';
import Customer from './Customer';

//import Create from './Create';


export default function List() {

    const { customers, setCustomers, allCustomers, customersWithMoney, customersWithoutMoney,stats} = useContext(Customers);
    //console.log(customers)

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
            <h1>Klientų sąrašas</h1>
            {/* <Message/> */}
            <div className="stats">
                <h3>Viso klientu: {stats.totalCustomers}</h3>
                <h3>Viso pinigų: {stats.totalAmount} eur</h3>
            </div>
            <div className="butons">
                <button onClick={ _ => setCustomers(allCustomers)} >Visi klientai</button>
                <button onClick={ _ => setCustomers(customersWithMoney)} >Tik turintys pinigų</button>
                <button onClick={ _ => setCustomers(customersWithoutMoney)} >Be pinigų</button>
                </div>
            <div className="row-1">
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>Eil. nr</th>
                            <th>Vardas</th>
                            <th>Sąskaita</th>
                            <th>Suma Eur</th>
                            <th>Veiksmai su klientu</th>
                            <th>Operacijos</th>
                        </tr>
                    </thead>
                    <tbody>

                        {customers.map((customer, index) => (
                            <Customer key={customer.id} customer={customer} index={index} />
                        ))}

                    </tbody>
                </table>

            </div>

        </div>
    );
}





