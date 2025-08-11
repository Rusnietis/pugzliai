import { useContext, useState } from 'react';
import { Customers } from '../../Contexts/Customers';
import { SERVER_URL } from '../../Constants/main';

export default function List() {

    const [amounts, setAmounts] = useState({});

    const { customers, setDeleteCustomer, setEditCustomer, setUpdateCustomer } = useContext(Customers);

    console.log(customers)

    const handleAmountChange = (e, customerId) => {
        setAmounts(prev => ({ ...prev, [customerId]: e.target.value }));
    };

    const handleToggleBlock = (customer) => {
        const updated = {
            ...customer,
            is_blocked: customer.is_blocked ? 0 : 1,
            old: { ...customer },
            id: customer.customer_id
        };
        setUpdateCustomer(updated);
    };

    const handleAddMoney = (customer) => {
        const rawAmount = parseFloat(amounts[customer.customer_id]);

        if (customer.is_blocked) {
            alert("Šis klientas užblokuotas. Veiksmas negalimas.");
            return;
        }

        if (isNaN(rawAmount) || rawAmount <= 0) {
            alert("Įveskite teisingą sumą.");
            return;
        }

        const updated = {
            ...customer,
            amount: parseFloat(customer.amount) + rawAmount,
            old: { ...customer }
        };

        setUpdateCustomer(updated);

        // Išvalom įvesties lauką
        setAmounts(prev => ({ ...prev, [customer.customer_id]: '' }));
    };

    if (!customers || customers.length === 0) {
        return <h3 className='mt-5' style={{display: 'flex', justifyContent: 'center', color: 'red'}}> Klientu nerasta/ serverio klaida</h3>;
    }

    return (
        <>
            {console.log(customers)}
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
                                            {
                                                customer.is_blocked ? (
                                                    <p style={{ color: 'red' }}>Klientas užblokuotas. Jokie veiksmai negalimi.</p>
                                                ) : null
                                            }
                                            <div className="col-5">

                                                <h4>{customer.name} {customer.surname}</h4>
                                                <p>Saskaita: {customer.account}</p>
                                                <p>Saskaitoje yra: {customer.amount} Eur</p>

                                                <label htmlFor="amount" className="form-label">Operacijos su pinigais</label>
                                                <div className="money">
                                                    <input type="number"
                                                        min="0"
                                                        step="0.01"
                                                        placeholder="Suma €"
                                                        value={amounts[customer.customer_id] || ''}
                                                        onChange={(e) => handleAmountChange(e, customer.customer_id)} className="form-control" id="amount" style={{ width: '100px' }} />
                                                    <button
                                                        type="button"
                                                        disabled={customer.temp || customer.is_blocked}
                                                        className="button-18 green"
                                                        onClick={() => handleAddMoney(customer)}

                                                    >
                                                        Pridėti
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={customer.temp || customer.is_blocked}
                                                        className="button-18 orange"
                                                    >
                                                        Atimti
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-7">
                                                {customer?.image && <img src={customer?.image} alt={customer?.name} className="img-fluids" />}
                                                {!customer?.image && <img src={SERVER_URL + '/images/broken-image.jpg'} alt="broken-image" className="img-fluids" />}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            type="button"

                                            disabled={customer.temp || customer.is_blocked}
                                            className="button-18 red"
                                            onClick={_ => setDeleteCustomer(customer)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            //disabled={customer.temp ? true : false}
                                            disabled={customer.temp || customer.is_blocked}
                                            className="button-18 m-2"
                                            onClick={_ => setEditCustomer(customer)}
                                        >
                                            Edit
                                        </button>

                                        <button className="button-18"
                                            onClick={_ => handleToggleBlock(customer)}
                                            style={{
                                                backgroundColor: customer.is_blocked ? 'orange' : 'green',
                                                color: 'white'
                                            }}
                                        >
                                            {customer.is_blocked ? 'Atblokuoti' : 'Blokuoti'}
                                        </button>
                                    </div>
                                </div>
                        }

                    </div>
                ))
            }
            {/* </div> */}
        </>
    )
}  