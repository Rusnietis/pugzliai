import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';

export default function Delete() {

    const { deleteCustomer, setDeleteCustomer, setDestroyCustomer } = useContext(Customers)
    //console.log(deleteCustomer)

    const submit = _ => {
        console.log('DELETE SUBMIT:', deleteCustomer);
        setDestroyCustomer(deleteCustomer);
        setDeleteCustomer(null);
    }

    if (!deleteCustomer) return null;

    console.log('DELETE COMPONENT: deleteCustomer:', deleteCustomer);

    return (
        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm delete</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={_ => setDeleteCustomer(null)}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure to delete {deleteCustomer.name} {deleteCustomer.surname} ?</p>
                    </div>
                    <div className="modal-footer">

                        <button type="button" className="btn btn-danger" onClick={_ => submit(deleteCustomer)} >Delete</button>
                        <button type="button" className="btn btn-secondary" onClick={_ => setDeleteCustomer(null)} >Cancel Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}