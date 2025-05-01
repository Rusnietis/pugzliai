import { useContext, useState } from 'react';
import { Customers } from '../../Contexts/Customers';
//import * as v from '../../Validators/textInputs';
//import { MessagesContext } from '../../Contexts/Messages'
// const defaultInputs = {
//     name: '',
//     surname: '',
//     nickname: '',
//     born: ''
// }

export default function Edit() {

    const { editCustomer, setEditCustomer, setUpdateCustomer } = useContext(Customers)
    const [inputs, setInputs] = useState(editCustomer);
    // const { addMessage } = useContext(MessagesContext);
    // const [e, setE] = useState(new Map());
    console.log(editCustomer)
    //console.log(editCustomer)
    // useEffect(_ => {
    //     if (null !== editCustomer) {
    //         setInputs(editCustomer);
    //     }
    // }, [editCustomer])

    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const submit = _ => {

        setUpdateCustomer({ ...editCustomer, ...inputs, old: editCustomer });
        setEditCustomer(null);
    }

    //if (!editCustomer) return null;


    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Kliento atnaujinimas</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={_ => setEditCustomer(null)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Vardas:</label>
                            <b> {editCustomer.name}</b>
                            {/* <input type="text" className="form-control" id="name" value={inputs.name} onChange={handlerChange} /> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Pavarde:</label>
                            <b> {editCustomer.surname}</b>
                            {/* <input type="text" className="form-control" id="surname" value={inputs.surname} onChange={handlerChange} /> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nickname" className="form-label">Saskaitos Nr.</label>
                            <b> {editCustomer.account}</b>
                            {/* <input type="text" className="form-control" style={{borderColor: e.has('nickname') ? 'crimson' : null }} id="nickname" value={inputs.nickname} onChange={handlerChange} /> */}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nickname" className="form-label">Suma Eur: </label>
                            <b> {editCustomer.amount}</b>
                            {/* <input type="text" className="form-control" style={{borderColor: e.has('nickname') ? 'crimson' : null }} id="nickname" value={inputs.nickname} onChange={handlerChange} /> */}
                        </div>
                    </div>
                    <div className="modal-footer">

                        <button type="button" className="btn btn-success" onClick={submit} >Save</button>
                        <button type="button" className="btn btn-secondary" onClick={_ => setEditCustomer(null)} >Cancel Edit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}