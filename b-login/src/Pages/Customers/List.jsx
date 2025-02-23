import { useContext } from 'react';
import TopNav from '../TopNav';
import { Customers } from '../../Contexts/Customers';
import Customer from './Customer';
import Create from './Create';




export default function List() {
 
    const { customers } = useContext(Customers);
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
            <div className="row-1">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vardas</th>
                            <th>Sąskaita</th>
                            <th>Suma</th>
                            <th>Veiksmai su klientu</th>
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





