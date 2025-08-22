import { useState, useContext, useRef } from 'react';
import { Customers } from '../../Contexts/Customers';
import generateInvoiceNumber from '../../Functions/generate'
import useImage from '../../Hooks/useImage';
//import * as v from '../../Validators/textInputs';
// import { MessagesContext } from '../../Contexts/Messages';

// const defaultInputs = {
//     customer: {
//         name: '',
//         surname: '',
//         image: null
//     },
//     account: {
//         account: generateInvoiceNumber(),
//         amount: '0'
//     }
// }

const defaultInputs = {
    name: '',
    surname: '',
    image: null,
    account: generateInvoiceNumber(),
    amount: '0'
}

export default function Create() {

    const [inputs, setInputs] = useState(defaultInputs);

    const { setStoreCustomer } = useContext(Customers); 
    // const { addMessage } = useContext(MessagesContext);
    const { image, readImage, setImage } = useImage();
    const imageInput = useRef()

    // const handlerChange = e => {
    //     const { id, value } = e.target;

    //     if (id === 'name' || id === 'surname') {
    //         setInputs(prev => ({
    //             ...prev,
    //             customer: {
    //                 ...prev.customer,
    //                 [id]: value
    //             }
    //         }));
    //     }
    // };


    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const create = _ => {

        setStoreCustomer({ ...inputs, image });
        setInputs(defaultInputs);
        imageInput.current.value = null;
        setImage(null);

    };

    // const create = () => {

    //     console.log('inputs', inputs)
    //     // const customerData = {
    //     //     name: inputs.customer.name,
    //     //     surname: inputs.customer.surname,
    //     //     image: image || null
    //     // };

    //     // const accountData = {
    //     //     account: inputs.account.account,
    //     //     amount: inputs.account.amount
    //     // };

    //     // const nestedData = {
    //     //     name: inputs.customer.name,
    //     //     surname: inputs.customer.surname,
    //     //     image: image || null,
    //     //     account: inputs.account.account,
    //     //     amount: inputs.account.amount
    //     // };

    //     // setStoreCustomer(nestedData);
    //     setInputs(defaultInputs);
    //     // imageInput.current.value = null;
    //     // setImage(null);
    // };

    //console.log(setStoreCustomer)

    return (
        <div className="card mt-2">
      <div className="card-header">
        <h3>Sukurti klientą</h3>
      </div>

      <div className="card-body">
        <div className="form-group">
          <label htmlFor="name">Vardas</label>
          <input
            type="text"
            id="name"
            value={inputs.name}
            onChange={handlerChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Pavardė</label>
          <input
            type="text"
            id="surname"
            value={inputs.surname}
            onChange={handlerChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Nuotrauka</label>
          <input
            ref={imageInput}
            type="file"
            id="image"
            onChange={readImage}
          />
        </div>

        {image && (
          <div className="form-group">
            <img src={image} alt={inputs.name} className="preview" />
          </div>
        )}

        <div className="form-group">
          <p className="attention">
            <b>
              Pastaba. Kliento sąskaitos numeris ir pradinė suma sugeneruojama
              automatiškai!
            </b>
          </p>
        </div>
      </div>

      <div className="card-footer">
        <button className="button-18 blue" onClick={create}>
          Pridėti klientą
        </button>
      </div>
    </div>
  );
}



    
