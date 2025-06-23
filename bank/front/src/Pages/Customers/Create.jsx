import { useState, useContext, useRef } from 'react';
import { Customers } from '../../Contexts/Customers';
import generateInvoiceNumber from '../../Functions/generate'
import useImage from '../../Hooks/useImage';
//import * as v from '../../Validators/textInputs';
// import { MessagesContext } from '../../Contexts/Messages';

const defaultInputs = {
    customer: {
        name: '',
        surname: '',
        image: null
    },
    account: {
        account: generateInvoiceNumber(),
        amount: '0'
    }
}

// const defaultInputs = {
//     name: '',
//     surname: '',
//     account: generateInvoiceNumber(),
//     amount: '0'
// }

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);

    const { setStoreCustomer } = useContext(Customers); 
    // const { addMessage } = useContext(MessagesContext);
    const { image, readImage, setImage } = useImage();
    const imageInput = useRef()

    const handlerChange = e => {
        const { id, value } = e.target;

        if (id === 'name' || id === 'surname') {
            setInputs(prev => ({
                ...prev,
                customer: {
                    ...prev.customer,
                    [id]: value
                }
            }));
        }
    };


    // const handlerChange = e => {
    //     setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    // }

    // const create = _ => {

    //     setStoreCustomer({ ...inputs, image });
    //     setInputs(defaultInputs);
    //     imageInput.current.value = null;
    //     setImage(null);

    // };

    const create = () => {
        // const customerData = {
        //     name: inputs.customer.name,
        //     surname: inputs.customer.surname,
        //     image: image || null
        // };

        // const accountData = {
        //     account: inputs.account.account,
        //     amount: inputs.account.amount
        // };

        const nestedData = {
            name: inputs.customer.name,
            surname: inputs.customer.surname,
            image: image || null,
            account: inputs.account.account,
            amount: inputs.account.amount
        };

        setStoreCustomer(nestedData);
        setInputs('');
        imageInput.current.value = null;
        setImage(null);
    };

    //console.log(setStoreCustomer)

    return (
        <div className="card mt-2 ">
            <div className="card-header">
                <h3>Sukurti klienta</h3>
            </div>
            <div className="card-body">

                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Vardas</label>
                    <input type="text" className="form-control" value={inputs.name} id="name" onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="surname" className="form-label">Pavardė</label>
                    <input type="text" className="form-control" value={inputs.surname} id="surname" onChange={handlerChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Nuotrauka</label>
                    <input ref={imageInput} type="file" className="form-control" id="image" onChange={readImage} />
                </div>
                {
                    image &&
                    <div className="mb-3">
                        <img src={image} alt={inputs.name} className="img-fluids" />
                    </div>
                }
                <div className="mb-3">
                    <p className="atention"><b>Pastaba. Kliento sąskaitos numeris ir pradinė suma sugeneruojama automatiškai!</b></p>
                </div>
            </div>
            <div className="card-footer">
                <button className="button-18" onClick={create}>Pridėti klienta</button>
            </div >
        </div>



    )
}