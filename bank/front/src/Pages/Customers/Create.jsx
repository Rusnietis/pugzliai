import { useState, useContext } from 'react';
import { Customers } from '../../Contexts/Customers';
import generateInvoiceNumber from '../../Functions/generate'
//import * as v from '../../Validators/textInputs';
// import { MessagesContext } from '../../Contexts/Messages';

const defaultInputs = {
    name: '',
    surname: '',
    acount: generateInvoiceNumber(),
    amount: '0'
}

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);

    const { setStoreCustomer } = useContext(Customers);
    // const { addMessage } = useContext(MessagesContext);
   

   


   

    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const create = _ => {

        setStoreCustomer(inputs);
        setInputs(defaultInputs);
    }

    //console.log(create)

    return (

        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Vardas</th>
                    <th scope="col">Pavarde</th>
                    <th scope="col">Saskaitos Nr.</th>
                    <th scope="col">Suma EUR</th>
                    <th scope="col">Veksmai su klientu</th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">#</th>
                    <td>
                        <div className="forms">
                            <input type="text"  value={inputs.name} id='name' onChange={handlerChange}  />
                        </div>
                    </td>
                    <td>
                        <div className="forms">
                            <input type="text"  value={inputs.surname} id='surname' onChange={handlerChange} />
                        </div>
                    </td>
                    <td>
                        <h5>Gen. automatiškai</h5>
                    </td>
                    <td>
                        <h5>Gen. automatiškai</h5>
                    </td>
                    <td>
                        <button className="button-18" onClick={create}>Pridėti klienta</button>

                    </td>

                </tr>

            </tbody>
        </table>

    )
}