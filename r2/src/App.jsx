import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import './form.scss';
import './buttons.scss';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Messages from './Components/039/Messages';
// Banko versija 2, versija su Express serveriu
const URL = 'http://localhost:3001/customers';

function App() {

  const [customerInput, setCustomerInput] = useState({
    vardas: '',
    saskaita: '',
    amount: 0
  });
  const [customers, setCustomers] = useState([])
  const [storeCustomers, setStoreCustomers] = useState(null);
  const [adjustAmounts, setAdjustAmounts] = useState({});
  const [updateCustomers, setUpdateCustomers] = useState(null);
  const [destroyCustomers, setDestroyCustomers] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);



  const addMessage = useCallback((type, text) => {
    const id = uuidv4();
    setMessages(prevMessages => [{ id, type, text }, ...prevMessages]);
    setTimeout(_ => {
      setMessages(prevMessages => prevMessages.filter(m => m.id !== id));
    }, 3000);
  }, []);

  useEffect(_ => {
    axios.get(URL)
      .then(res => {
        console.log(res)
        setCustomers(res.data);
        setError(null);
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          setError(err.response.status + ' ' + err.response.statusText);
        } else {
          setError(err.message);
        }
      });
  }, []);

  useEffect(() => {
    if (storeCustomers) {
      axios.post(URL, storeCustomers)
        .then(res => {
          setCustomers(prevCustomers => sortCustomersByLastName([
            { id: res.data.id, ...storeCustomers },
            ...prevCustomers
          ]));
          // setCustomers(prevCustomers => [
          //   { id: res.data.id, ...storeCustomers },
          //   ...prevCustomers
          // ]);
          setCustomerInput({ vardas: '', saskaita: '', amount: 0 });
          setError(null);
          addMessage('success', 'Klientas sėkmingai pridėtas');
        })
        .catch(err => console.log(err));
    }
}, [storeCustomers, addMessage]);

  useEffect(res => {
    if (destroyCustomers) {
      axios.delete(`${URL}/${destroyCustomers.id}`)
        .then(res => {
          setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== destroyCustomers.id));
          setError(null);
          addMessage(res.data.type, res.data.message);
        })
        .catch(err => {
          console.log(err)
          addMessage('danger', err.response ? err.response.status + ' ' + err.response.statusText : err.message);
        });
    }
  }, [destroyCustomers, addMessage]);

  useEffect(() => {
    if (updateCustomers) {
      axios.put(`${URL}/${updateCustomers.id}`, updateCustomers)
        .then((res) => {
          setCustomers(prevCustomers => 
            prevCustomers.map(customer => 
              customer.id === updateCustomers.id ? { ...customer, ...updateCustomers } : customer
            )
          );
          setError(null);
          addMessage(res.data.type, res.data.message);
        })
        .catch(err => {
          console.log(err);
          setError("Nepavyko atnaujinti kliento.");
        });
    }
  }, [updateCustomers, addMessage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInput({
      ...customerInput,   // Išlaikome kitus laukus
      [name]: value       // Atnaujiname tik tą lauką, kuris buvo keičiamas
    });
  };

  const handleAdjustAmountChange = (id, value) => {
    setAdjustAmounts(prevAdjustAmounts => ({
      ...prevAdjustAmounts,
      [id]: value // Priskiriame tik tam tikram `id` kliento sumą
    }));
  };

  const handleAddAmount = (id) => {
    const updatedCustomer = customers.find(customer => customer.id === id);
    if (!updatedCustomer) return;

    const newAmount = updatedCustomer.amount + (adjustAmounts[id] || 0); // Nauja suma

    // Atnaujiname kliento sąrašą
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === id ? { ...customer, amount: newAmount } : customer
      )
    );

    // Siunčiame atnaujintą klientą į serverį
    setUpdateCustomers({ ...updatedCustomer, amount: newAmount });
  };

  const handleSubtractAmount = (id) => {
    const updatedCustomer = customers.find(customer => customer.id === id);
    if (!updatedCustomer) return;

    const newAmount = Math.max(updatedCustomer.amount - (adjustAmounts[id] || 0), 0); // Nauja suma

    // Atnaujiname kliento sąrašą
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === id ? { ...customer, amount: newAmount } : customer
      )
    );

    // Siunčiame atnaujintą klientą į serverį
    setUpdateCustomers({ ...updatedCustomer, amount: newAmount });
  };

  const submit = () => {
    if (customerInput.vardas && customerInput.saskaita) {
      setStoreCustomers({ ...customerInput, name: customerInput.vardas });
    } else {
      addMessage('info', 'Užpildykite visus laukus');
    }
  };

  const sortCustomersByLastName = (customers) => {
    return [...customers].sort((a, b) => {
      const lastNameA = a.vardas.trim().split(' ').slice(-1)[0];
      const lastNameB = b.vardas.trim().split(' ').slice(-1)[0];
      return lastNameA.localeCompare(lastNameB);
    });
  };

  const handleDeleteCustomer = (customer) => {
    if (customer.amount > 0) {
      addMessage('info', 'Sąskaitoje yra pinigų, todėl kliento ištrinti negalima');
      return;
    }
    setDestroyCustomers(customer); // Jei balansas 0, pradeda trynimo procesą
  };

  return (
    <div className="App">
      <header className="App-header">

        <div><h1>Bankas Express</h1></div>

        <span><h3>Naujo kliento sukurimas</h3></span>

        <div className='row'>
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Vardas, pavardė</th>
                <th scope="col">Sąskaitos Nr.</th>
                <th scope="col">Suma</th>
                <th scope="col">Pridėti</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">#</th>
                <td>
                  <div className="form">
                    <input type="text" name="vardas" placeholder="Vardas, pavardė"
                      value={customerInput.vardas} onChange={handleInputChange}
                    />
                  </div>
                </td>
                <td>
                  <div className="form">
                    <input type="text" name="saskaita" value={customerInput.saskaita} onChange={handleInputChange} />
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="buttons">
                    <button className="yellow" onClick={submit} >Pridėti</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span><h3>Banko klientu sarasas</h3></span>
        <div className="row-1">
          {
            customers && customers.length !== 0 &&
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Vardas, pavardė</th>
                  <th scope="col">Sąskaitos Nr.</th>
                  <th scope="col">Suma Eur</th>
                  <th scope="col"></th>
                  <th scope="col">Įvesti suma</th>
                  <th scope="col">Op. su pinigais</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(customers) && customers.map(customer =>
                  <tr key={customer.id} >
                    <th scope="row">#</th>
                    <td>{customer.vardas}</td>
                    <td>{customer.saskaita}</td>
                    <td>{customer.amount}</td>
                    <td><button className="red" onClick={() => handleDeleteCustomer(customer)}>Ištrinti</button></td>
                    <td>
                      <div className="form">
                        <input
                          type="number"
                          value={adjustAmounts[customer.id] || ''} // Parenkame individualią reikšmę pagal id
                          onChange={(e) => handleAdjustAmountChange(customer.id, Number(e.target.value))}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="buttons">
                        <button className="green" onClick={() => handleAddAmount(customer.id)}>Pridėti pinigus</button>
                        <button className="blue" onClick={() => handleSubtractAmount(customer.id)}>Nuimti pinigus</button>
                      </div>

                    </td>
                  </tr>

                )}
              </tbody>
            </table>
          }
          {
            customers && !customers.length && <p>No Customers Found</p>
          }
          {
            !customers && (error ? <p style={{ color: 'crimson' }}>{error}</p> : <p>Customers is loading...</p>)
            //!customers &&  <p>Customers is loading...</p>
          }
        </div>

      </header >
      <Messages messages={messages} />
    </div >
  );
}

export default App;