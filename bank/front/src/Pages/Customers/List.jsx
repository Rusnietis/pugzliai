import { useContext, useState } from 'react';
import { Customers } from '../../Contexts/Customers';
import { SERVER_URL } from '../../Constants/main';

export default function List() {

  const [amounts, setAmounts] = useState({});

  const { customers, setDeleteCustomer, setEditCustomer, setUpdateCustomer, setUpdateAmount } = useContext(Customers);

  //console.log(customers)

  const handleToggleBlock = (customer) => {
    const updated = {
      ...customer,
      is_blocked: customer.is_blocked ? 0 : 1,
      old: { ...customer },
      id: customer.customer_id
    };
    setUpdateCustomer(updated);
  };

  const handleChange = e => {
    const { id, value } = e.target;
    setAmounts(prev => ({
      ...prev,
      [id]: value === '' ? '' : Number(value)
    }));
  };

  const addMoney = (customer) => {
    const amount = amounts[customer.customer_id] || 0;
    //console.log('List: siunčiam į context', customer.customer_id, amount); // 👈 čia
    setUpdateAmount({
      customer_id: customer.customer_id,
      change: amount,
      old: { ...customer }
    });
    //istrinam input
    setAmounts('')
  };

  // atimti pinigus
  const subtractMoney = (customer) => {
    const amount = amounts[customer.customer_id] || 0;
    console.log('List: siunčiam į context', customer.customer_id, -amount); // 👈 čia
    setUpdateAmount({
      customer_id: customer.customer_id,
      change: -amount,
      old: { ...customer }
    });
    //istrinam input
    setAmounts('')
  }

  return (
    <>
      {customers.map((customer) => (
        <div key={customer.customer_id}>
          {customer.deleted ? (
            <div className="alert alert-danger">
              {customer.name} {customer.surname} buvo ištrintas
            </div>
          ) : (
            <div
              className="card mt-2"
              style={{
                opacity: customer.temp ? 0.5 : 1,
              }}
            >
              <div className="card-header">
                <h5>Informacija apie klientą</h5>
              </div>

              <div className="card-body customer-card">
                {
                  customer.is_blocked ? (
                    <p className="blocked-msg">
                      Klientas užblokuotas. Jokie veiksmai negalimi.
                    </p>
                  ) : null
                }

                <div className="customer-info">
                  <div className="info-left">
                    <h4>
                      {customer.name} {customer.surname}
                    </h4>
                    <p>Sąskaita: {customer.account}</p>
                    <p>Sąskaitoje yra: {customer.amount} €</p>

                    <label htmlFor={`amount-${customer.customer_id}`}>
                      Operacijos su pinigais
                    </label>
                    <div className="money">
                      <input
                        id={customer.customer_id}
                        type="number"
                        placeholder="Suma €"
                        value={amounts[customer.customer_id] || ''}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        disabled={customer.temp || customer.is_blocked}
                        className="button-18 green"
                        onClick={() => addMoney(customer)}
                      >
                        Pridėti
                      </button>
                      <button
                        type="button"
                        disabled={customer.temp || customer.is_blocked}
                        className="button-18 orange"
                        onClick={() => subtractMoney(customer)}
                      >
                        Atimti
                      </button>
                    </div>
                  </div>

                  <div className="info-right">
                    {customer?.image ? (
                      <img
                        src={customer?.image}
                        alt={customer?.name}
                        className="preview"
                      />
                    ) : (
                      <img
                        src={SERVER_URL + "/images/broken-image.jpg"}
                        alt="broken"
                        className="preview"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button
                  type="button"
                  disabled={customer.temp || customer.is_blocked}
                  className="button-18 red" style={{ marginRight: '10px' }}
                  onClick={(_) => setDeleteCustomer(customer)}
                >
                  Ištrinti
                </button>

                <button
                  type="button"
                  disabled={customer.temp || customer.is_blocked}
                  className="button-18 blue" style={{ marginRight: '10px' }}
                  onClick={(_) => setEditCustomer(customer)}
                >
                  Redaguoti
                </button>

                <button
                  className="button-18"
                  style={{
                    backgroundColor: customer.is_blocked ? "orange" : "green",
                    color: "white",
                  }}
                  onClick={_ => handleToggleBlock(customer)}
                >
                  {customer.is_blocked ? "Atblokuoti" : "Blokuoti"}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  )
}  