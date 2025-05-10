import { useContext, useState, useRef, useEffect } from 'react';
import { Customers } from '../../Contexts/Customers';
import useImage from '../../Hooks/useImage';
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
    const [deleteImage, setDeleteImage] = useState(false);
    const { image, readImage, setImage } = useImage();
    const imageInput = useRef()

    useEffect(_ => {
        setImage(editCustomer?.image)
    }, [setImage, editCustomer])



    // const { addMessage } = useContext(MessagesContext);
    // const [e, setE] = useState(new Map());
    console.log(editCustomer)
    //console.log(editCustomer)
    useEffect(_ => {
        if (image && image !== editCustomer.image) {
            setDeleteImage(true);
        }
    }, [image])

    const handlerChange = e => {
        setInputs(prev => ({ ...prev, [e.target.id]: e.target.value })); // 
    }

    const submit = _ => {

        // const imageToServer = image !== editCustomer.image ? image : null;

        setUpdateCustomer({ ...editCustomer, ...inputs, old: editCustomer, id: editCustomer.customer_id, del: deleteImage, image: image });
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
                            <label htmlFor="amount" className="form-label">Suma Eur: </label>
                            <b> {editCustomer.amount}</b>
                            {/* <input type="text" className="form-control" style={{borderColor: e.has('nickname') ? 'crimson' : null }} id="nickname" value={inputs.nickname} onChange={handlerChange} /> */}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                <span>Nuotrauka</span>
                                <h6 style={{cursor: 'pointer', marginLeft: '10px', display: image ? 'inline-block' : 'none'}} onClick={_ => {
                                    setDeleteImage(true);
                                    setImage(null);
                                    imageInput.current.value = null;
                                }}
                                >Ištrinti</h6>
                            </label>
                            <input ref={imageInput} type="file" className="form-control" onChange={readImage} />
                        </div>
                        {
                            image &&
                            <div className="mb-3">
                                <img src={image} alt={editCustomer.name} className="img-fluids" />
                            </div>
                        }
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