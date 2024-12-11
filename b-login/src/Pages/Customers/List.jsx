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
          
                <h3>
                  {customers.length > 0 ? (
                   customers.map(customer => <Customer key={customer.id} customer={customer} />)
                  ) : (
                    <div>Loading...</div>
                        )}
                </h3>
           
        </div>
    );
}






// import { useContext } from 'react';
// import TopNav from '../TopNav';
// import { Customers } from '../../Contexts/Customers';
// import Customer from './Customer';


// export default function List() {


//     const { customers = [] } = useContext(Customers)


//     return (
//         <div>
//             <TopNav />
//             <h1>Klientu sarasas</h1>

            
//                 <h1>
//                 {
//                     customers.map(customer => <Customer key={customer.id} customer={customer} />)
//                 }
//                 </h1>

           
//         </div >
//     )
// }