import { useContext, useState } from 'react';
import { Customers } from '../../Contexts/Customers';
import { SERVER_URL } from '../../Constants/main';


export default function List() {
  const [amounts, setAmounts] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const {
    customers,
    setDeleteCustomer,
    setEditCustomer,
    setUpdateAmount,
    setIsBlocked
  } = useContext(Customers);

  //console.log(customers)

  // Blokavimas / atblokavimas
  const handleToggleBlock = (customer) => {
    setIsBlocked({
      customer_id: customer.customer_id,
      is_blocked: customer.is_blocked ? 0 : 1,
      old: { ...customer }
    });
  };

  // Input value keitimas
  const handleChange = (e) => {
    const { id, value } = e.target;
    setAmounts(prev => ({
      ...prev,
      [id]: value === '' ? '' : Number(value)
    }));
  };

  // Pridėti pinigus
  const addMoney = (customer) => {
    const amount = amounts[customer.customer_id] || 0;

    if (amount > 1000) {
      // jeigu daugiau nei 1000, išsaugom veiksmą ir rodome modalą
      setPendingAction({ customer, amount });
      setShowModal(true);
      return;
    }

    // normalus veikimas
    setUpdateAmount({
      customer_id: customer.customer_id,
      change: amount,
      old: { ...customer }
    });
    setAmounts(prev => ({ ...prev, [customer.customer_id]: '' }));
  };

  // Patvirtinti modalą
  const handleConfirm = () => {
    if (pendingAction) {
      setUpdateAmount({
        customer_id: pendingAction.customer.customer_id,
        change: pendingAction.amount,
        old: { ...pendingAction.customer }
      });
      setAmounts(prev => ({ ...prev, [pendingAction.customer.customer_id]: '' }));
    }
    setShowModal(false);
    setPendingAction(null);
  };

  // Atimti pinigus
  const subtractMoney = (customer) => {
    const amount = amounts[customer.customer_id] || 0;
   
    setUpdateAmount({
      customer_id: customer.customer_id,
      change: -amount,
      old: { ...customer }
    });
    setAmounts(prev => ({ ...prev, [customer.customer_id]: '' }));
  };


  const safeCustomers = Array.isArray(customers) ? customers : [];

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
              style={{ opacity: customer.temp ? 0.5 : 1 }}
            >
              <div className="card-header">
                <h5>Informacija apie klientą</h5>
              </div>

              <div className="card-body customer-card">
                {
                  customer.is_blocked && (
                    <p className="blocked-msg">
                      Klientas užblokuotas. Jokie veiksmai negalimi.
                    </p>
                  )
                }

                <div className="customer-info">
                  <div className="info-left">
                    <h4>{customer.name} {customer.surname}</h4>
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
                    <div
                      className={`modal fade ${showModal ? 'show' : ''}`}
                      style={{ display: showModal ? 'block' : 'none'}}
                      tabIndex="-1"
                      role="dialog"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Patvirtinimas</h5>
                            <button
                              type="button" className="btn-close" aria-label="Close"
                              onClick={() => setShowModal(false)}
                            >
                            </button>
                          </div>
                          <div className="modal-body">
                            <p>
                              Įvedėte sumą <strong>{pendingAction?.amount}</strong> klientui{' '}
                              <strong>{pendingAction?.customer.name}</strong>, kuri viršija 1000.
                              Ar tikrai norite tęsti?
                            </p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleConfirm}
                            >
                              Patvirtinti
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => setShowModal(false)}
                            >
                              Atšaukti
                            </button>
                          </div>
                        </div>
                      </div>
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
                  className="button-18 red"
                  style={{ marginRight: '10px' }}
                  onClick={() => setDeleteCustomer(customer)}
                >
                  Ištrinti
                </button>

                <button
                  type="button"
                  disabled={customer.temp || customer.is_blocked}
                  className="button-18 blue"
                  style={{ marginRight: '10px' }}
                  onClick={() => setEditCustomer(customer)}
                >
                  Redaguoti
                </button>

                <button
                  className="button-18"
                  style={{
                    backgroundColor: customer.is_blocked ? "orange" : "green",
                    color: "white",
                  }}
                  onClick={() => handleToggleBlock(customer)}
                >
                  {customer.is_blocked ? "Atblokuoti" : "Blokuoti"}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}