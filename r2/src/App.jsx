import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'
import './form.scss';
import './buttons.scss';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
//import Messages from './Components/039/Messages';

const URL = 'http://localhost:3001/customers';



function App() {

  const [customerInput, setCustomerInput] = useState({
    vardas: '',
    saskaita: '',
    amount: 0
  });
  const [customers, setCustomers] = useState([])
  const [storeCustomers, setStoreCustomers] = useState(null);
  // //   const [animalEditInput, setAnimalEditInput] = useState('');
  // //   const [animals, setAnimals] = useState(null);

  // //   const [updateAnimals, setUpdateAnimals] = useState(null);
  const [destroyCustomers, setDestroyCustomers] = useState(null);
  // //   const [editStatus, setEditStatus] = useState(null);
  // //   const [error, setError] = useState(null);
  // //   const [messages, setMessages] = useState([]);

  //   const addMessage = useCallback((type, text) => {
  //       const id = uuidv4();
  //       setMessages(prevMessages => [{ id, type, text }, ...prevMessages]);
  //       setTimeout(_ => {
  //           setMessages(prevMessages => prevMessages.filter(m => m.id !== id));
  //       }, 3000);
  //   }, []);

  useEffect(_ => {
    axios.get(URL)
      .then(res => setCustomers(res.data))
      .catch(err => console.log(err))
  }, []);

  //   //1
  //   useEffect(_ => {
  //     axios.get(URL)
  //       .then(res => {
  //         console.log(res)
  //         setAnimals(res.data);
  //         setError(null);
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         if (err.response) {
  //           setError(err.response.status + ' ' + err.response.statusText);
  //         }else {
  //           setError(err.message);
  //         }
  //       });
  //   }, []);

  //   useEffect(_ => {
  //     setAnimalEditInput(animals?.find(animal => animal.id === editStatus)?.name || '');
  //   }, [editStatus])
  //   //2

  useEffect(_ => {
    if (null !== storeCustomers) {
      axios.post(URL, storeCustomers)
        .then(res => {
          setCustomers(prevCustomers => [{ name: storeCustomers.name, id: res.data.id, ...storeCustomers }, ...prevCustomers]);
          setCustomerInput({
            vardas: '',
            saskaita: '',
            amount: 0
          });
          //setError(null);
          //addMessage(res.data.type, res.data.message);
        })
        .catch(err => console.log(err));
    }
  }, [storeCustomers]);

    useEffect(_ => {
      if (null !== destroyCustomers) {
        axios.delete(`${URL}/{destroyCustomers.id}`)//perdavimas per parametra
          .then(_ => {
            setCustomers(customers.filter(customer => customer.id !== destroyCustomers.id));
            //setError(null);
            //addMessage(res.data.type, res.data.message);
          })
          .catch(err => { 
            console.log(err);
            //addMessage('danger', err.response ? err.response.status + ' ' + err.response.statusText : err.message) ;
          });
      }
    }, [destroyCustomers]);

  //   useEffect(_ => {
  //     if (updateAnimals) {
  //       axios.put(`${URL}/${updateAnimals.id}`, updateAnimals)
  //         .then(res => {
  //           setAnimals(animals.map(animal => animal.id === updateAnimals.id ? { ...animal, name: updateAnimals.name } : animal));
  //           setEditStatus(null);
  //           setError(null);
  //           addMessage(res.data.type, res.data.message);
  //         })
  //         .catch(err => {
  //           console.log(err)
  //         });
  //     }
  //   }, [updateAnimals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInput({
      ...customerInput,   // Išlaikome kitus laukus
      [name]: value       // Atnaujiname tik tą lauką, kuris buvo keičiamas
    });
  };

  const submit = _ => {

    setStoreCustomers(customerInput);
  }

  //   const change = animal => {
  //     if (null === editStatus || editStatus !== animal.id) {
  //       setEditStatus(animal.id)
  //     }
  //     else {
  //       setUpdateAnimals({ name: animalEditInput, id: animal.id });
  //     }
  //   }



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
                    {/* <input type="text" placeholder="Enter Animal" value={animalInput} onChange={e => setAnimalInput(e.target.value)} /> */}
                  </div>
                </td>
                <td>
                  <div className="form">
                    <input type="text" name="saskaita" value={customerInput.saskaita} onChange={handleInputChange} />
                    {/* <input type="text" name="saskaita" value={customerInput.saskaita || ''} onChange={e => setCustomerInput(e.target.value)} /> */}
                  </div>
                </td>
                <td></td>
                <td>
                  <div className="buttons">
                    <button className="green" onClick={submit} >Submit</button>
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
                {customers.map(customer =>
                  <tr key={customer.id} >

                    <th scope="row">#</th>
                    <td>{customer.vardas}</td>
                    <td>{customer.saskaita}</td>
                    <td>{customer.amount}</td>
                    <td><button className="red" onClick={_=>setDestroyCustomers(customer)}>Ištrinti</button></td>
                    <td>
                      <div className="form">
                        <input type="number" />
                      </div>
                    </td>
                    <td>
                      <div className="buttons">
                        <button className="green" >Pridėti pinigus</button>
                        <button className="blue" >Nuimti pinigus</button>
                      </div>

                    </td>
                  </tr>

                )}
                {/* <tr>
                  <th></th>
                  <td></td>
                  <td></td>
                  <td><input type="number"/></td>

                </tr> */}
              </tbody>
            </table>
          }
          {
            customers && !customers.length && <p>No Customers Found</p>
          }
          {
            !customers && <p>Customers is loading...</p>
          }
        </div>

      </header >

    </div >
  );
}

export default App;