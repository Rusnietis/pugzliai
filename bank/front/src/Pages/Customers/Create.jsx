import { useState, useContext } from 'react';
import { Customers } from '../../Contexts/Customers';
//import * as v from '../../Validators/textInputs';
// import { MessagesContext } from '../../Contexts/Messages';

const defaultInputs = {
    name: '',
    surname: '',
    nickname: '',
    born: ''
}

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);

    const { setStoreCustomer } = useContext(Customers);
    // const { addMessage } = useContext(MessagesContext);
    // const [e, setE] = useState(new Map());




    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const create = _ => {
        // const errors = new Map();
        // v.validate(inputs.name, 'name', errors, [v.required, v.string, v.lettersOnly, [v.min, 3], [v.max, 100]]);
        // v.validate(inputs.surname, 'surname', errors, [v.required, v.string, v.lettersOnly, [v.min, 3], [v.max, 100]]);
        // v.validate(inputs.nickname, 'nickname', errors, [v.sometimes, v.string, [v.min, 3], [v.max, 100]]);
        // v.validate(inputs.born, 'born', errors, [v.required, v.date]);

        // if (errors.size > 0) {
        //     // errors.forEach(err => addMessage({ type: 'danger', text: err }));
        //     // setE(errors);
        //     return;
        // }

        // return;
        setStoreCustomer(inputs);
        setInputs(defaultInputs);
    }

    return (

        <table class="table">
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
                            <input type="text" />
                        </div>
                    </td>
                    <td>
                        <div className="forms">
                            <input type="text" />
                        </div>
                    </td>
                    <td>
                        <h5>Gen. automatiškai</h5>
                    </td>
                    <td>
                        <h5>Gen. automatiškai</h5>
                    </td>
                    <td>
                        <button className="button-18">Pridėti klienta</button>

                    </td>

                </tr>

            </tbody>
        </table>

    )
}