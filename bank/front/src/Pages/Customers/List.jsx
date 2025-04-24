import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';

export default function List() {

    const { customers, setDeleteCustomer, setEditCustomer } = useContext(Customers);

    console.log(customers)

    return (
        <>
            {
                customers.map(customer => (
                    <div key={customer.id}>
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
                                        <h4>{customer.name} {customer.surname}</h4>
                                    </div>
                                    <div className="card-body">
                                        <p>Saskaita: {customer.acount}</p>
                                        <p>Saskaitoje yra: {customer.amount} Eur</p>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="button"
                                            disabled={customer.temp ? true : false}
                                            className="btn btn-danger"
                                            onClick={_ => setDeleteCustomer(customer)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            disabled={customer.temp ? true : false}
                                            className="btn btn-primary m-3"
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
