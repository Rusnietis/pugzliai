import { useContext, useEffect, useState } from 'react';
import { Customers } from '../../Contexts/Customers';
//import { useMessage } from '../../Contexts/Message';
import { Router } from '../../Contexts/Router';
import TopNav from '../TopNav';
import axios from 'axios';
import { SERVER_URL } from '../../Constants/main';
import { useMessage } from '../../Hooks/useMessage';

export default function Edit() {
    
    const { customers, setEditCustomer, setCustomers } = useContext(Customers);
    const { showMessage } = useMessage();

    const [amount, setAmount] = useState('');
    const [customer, setCustomer] = useState(null);
    const [action, setAction] = useState('add'); // Numatyta, kad pridėsime pinigus

    // id isgavimas 
    const {params} = useContext(Router);
    console.log('Params:', params)
    const rawCustomerId = params[1];  // Gauname visą reikšmę su query
    const customerId = rawCustomerId.split('?')[0];  // Pašaliname viską po `?`
    
    console.log('Tikras customerId:', customerId);



    useEffect(() => {
        
        if (!customers) return;
       
        const foundCustomer = customers.find(c => c.id === customerId);
        if (!foundCustomer) return;

        setCustomer(foundCustomer);

        // Gauti query params
        const queryParams = new URLSearchParams(rawCustomerId.split('?')[1]);
        console.log(queryParams)
        const actionType = queryParams.get('action'); // "add" arba "withdraw"
        if (actionType === 'withdraw') {
            setAction('withdraw');
        }
    }, [customers, customerId, rawCustomerId]);

    const handleSubmit = () => {
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return showMessage('Įveskite teisingą teigiamą sumą.', 'error');
        }

        if (!customer) {
            return showMessage('Klientas nerastas.', 'error');
        }

        let updatedAmount = customer.amount;
        if (action === 'add') {
            updatedAmount += parsedAmount;
        } else {
            if (parsedAmount > customer.amount) {
                return showMessage('Nepakanka lėšų.', 'error');
            }
            updatedAmount -= parsedAmount;
        }

        const updatedCustomer = { ...customer, amount: updatedAmount };

        axios.put(`${SERVER_URL}/customers/${customer.id}`, updatedCustomer)
            .then(({ data }) => {
                setCustomers(c => c.map(cust =>
                    cust.id === customer.id ? { ...updatedCustomer, temp: true, preEdit: cust } : cust
                ));

                setEditCustomer(updatedCustomer);
                showMessage(data.message || 'Kliento informacija atnaujinta', 'success');
                window.location.href = '#customers';
            })
            .catch(error => {
                showMessage(error.response?.data?.message || 'Įvyko klaida atnaujinant klientą', 'error');
                console.error('Klaida:', error);
            });
    };

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
            <h1>{action === 'withdraw' ? 'Pinigų atėmimas' : 'Pinigų pridėjimas'}</h1>

            <div className='row'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Vardas, pavardė</th>
                            <th>Sąskaitos Nr.</th>
                            <th>Suma</th>
                            <th>Veiksmas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>#</th>
                            <td>{customer.name}</td>
                            <td>{customer.account}</td>
                            <td>
                                < div className="form">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                                </div> 
                            </td>
                            <td>
                                <button className="yellow" onClick={handleSubmit}>
                                    {action === 'withdraw' ? 'Atimti pinigus' : 'Pridėti pinigus'}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// export default function Edit({ customerId}) {

//     const { customers, setEditCustomer, setCustomers } = useContext(Customers);
//     const { params } = useContext(Router); // is router konteksto paimame parametrus
//     // naudojame pranesimu konteksta
//     const { showMessage } = useMessage()


//     const [name, setName] = useState('');
//     const [account, setAccount] = useState('');
//     const [amount, setAmount] = useState('');
//     const [customer, setCustomer] = useState(null);
//     const [action, setAction] = useState('add');

//     useEffect(_ => {
//         if (null == customers) {
//             return;
//         }
//         // Patikriname ar yra klientas
//         const customer = customers.find(customer => customer.id === customerId)
//         console.log(customer)
//         if (!customer) {
//             setCustomer(null)
//         } else {
//             setCustomer(customer)
//         }
//         // Gauti query params
//         const urlParams = new URLSearchParams(window.location.search);
//         const actionType = urlParams.get('action'); // "add" arba "withdraw"
//         if (actionType === 'withdraw') {
//             setAction('withdraw');
//         }

//     }, [customers, params[1]])



//     useEffect(_ => {
//         if (!customer) {
//             return;
//         }
//         // Jei klientas yra, tai nustatome reiksmes
//         setName(customer.name);
//         setAccount(customer.account);
//         setAmount('');
//     }, [customer, setName, setAccount, setAmount])


//     const save = () => {
//         //const { showMessage } = useMessage(); // Gauti showMessage funkciją iš konteksto

//         const parsedAmount = parseFloat(amount);
//         if (isNaN(parsedAmount) || parsedAmount <= 0) {
//             showMessage('Įveskite teisingą teigiamą sumą.', 'error');
//             return;
//         }

//         const updatedAmount = parseFloat(customer.amount) + parsedAmount;

//         const editedCustomer = {
//             name,
//             account,
//             amount: updatedAmount,
//             id: customer.id,
//         };

//         // Siunčiame duomenis į serverį
//         axios.put(`${SERVER_URL}/customers/${customer.id}`, editedCustomer)
//             .then(response => {
//                 // Atnaujiname customers sąrašą
//                 setCustomers(c => c.map(customer =>
//                     customer.id === editedCustomer.id ? { ...editedCustomer, temp: true, preEdit: customer } : customer
//                 ));

//                 // Rodome pranešimą
//                 showMessage(response.data.message || 'Kliento informacija atnaujinta', 'success');
//                 console.log(response.data.message)
//                 // Atnaujiname editCustomer
//                 setEditCustomer({ ...customer, amount: updatedAmount });

//                 // Peradresavimas į klientų sąrašą tik po sėkmingo atnaujinimo
//                 window.location.href = '#customers';
//             })
//             .catch(error => {
//                 showMessage(error.response?.data?.message || 'Įvyko klaida atnaujinant klientą', 'error');
//                 console.error('Klaida:', error);
//             });
//     };

    

//     if (!customers)
//         return (
//             <div>
//                 <TopNav />
//                 <h1>Loading...</h1>
//             </div>
//         )

//     if (!customer)
//         return (
//             <div>
//                 <TopNav />
//                 <h1>Customer not Found</h1>
//             </div>
//         )

//     return (
//         <div>
//             <TopNav />
//             <MessageAlert />
//             <h1>{action === 'withdraw' ? 'Pinigų atėmimas' : 'Pinigų pridėjimas'}</h1>
//             {/* <h1>{ updatedAmount === save ? 'Pinigu pridejimas' : 'Pinigu atemimas' }</h1> */}

//             <div className='row'>
//                 <table className="table ">
//                     <thead>
//                         <tr>
//                             <th scope="col">#</th>
//                             <th scope="col">Vardas, pavardė</th>
//                             <th scope="col">Sąskaitos Nr.</th>
//                             <th scope="col">Suma</th>
//                             <th scope="col">Pridėti</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <th scope="row">#</th>
//                             <td>
//                                 {name}
//                             </td>
//                             <td>
//                                 {account}
//                             </td>
//                             <td>
//                                 <div className="form">
//                                     <input type="text" value={amount} onChange={e => setAmount(e.target.value)} />
//                                 </div>
//                             </td>
//                             <td>
//                                 <div className="buttons">
//                                     <button className="yellow" onClick={save}  >Išsaugoti</button>
//                                 </div>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>

//     )
// }