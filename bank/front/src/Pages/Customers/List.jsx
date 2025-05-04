import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';
import { SERVER_URL } from '../../Constants/main';

export default function List() {

    const { customers, setDeleteCustomer, setEditCustomer } = useContext(Customers);

    console.log(customers)

    return (
        <>
            {
                customers.map(customer => (

                    <div key={customer.customer_id}>

                        {
                            customer.deleted
                                ?
                                <div className="alert alert-danger mt-2" role="alert">
                                    {customer.name} {customer.surname} has been deleted
                                </div>
                                :

                                <div className="card mt-2" style={{
                                    opacity: customer.temp ? 0.5 : 1
                                }}>
                                    <div className="card-header">
                                        <h5>Informacija apie klientą</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-5">
                                                <h4>{customer.name} {customer.surname}</h4>
                                                <p>Saskaita: {customer.account}</p>
                                                <p>Saskaitoje yra: {customer.amount} Eur</p>
                                            </div>
                                            <div className="col-7">
                                                {customer?.image && <img src={customer?.image} alt={customer?.name} className="img-fluids"/>}
                                                {!customer?.image && <img src={SERVER_URL + '/images/broken-image.jpg'} alt="broken-image" className="img-fluids"/>}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="button"
                                            disabled={customer.temp ? true : false}
                                            className="button-18" style={{ background: 'red' }}
                                            onClick={_ => setDeleteCustomer(customer)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            disabled={customer.temp ? true : false}
                                            className="button-18 m-2"
                                            onClick={_ => setEditCustomer(customer)}
                                        >
                                            Edit
                                        </button>

                                    </div>
                                </div>
                        }

                    </div>
                ))
            }
        </>
    )
}
