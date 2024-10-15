import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.scss';
import './buttons.scss';
import './App.scss';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import Messages from './Components/039/Messages';

const URL = 'http://localhost:3001/animals';



function App() {

  const [animalInput, setAnimalInput] = useState('');
  const [animalEditInput, setAnimalEditInput] = useState('');
  const [animals, setAnimals] = useState(null);
  const [storeAnimals, setStoreAnimals] = useState(null);
  const [updateAnimals, setUpdateAnimals] = useState(null);
  const [destroyAnimals, setDestroyAnimals] = useState(null);
  const [editStatus, setEditStatus] = useState(null);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((type, text) => {
      const id = uuidv4();
      setMessages(prevMessages => [{ id, type, text }, ...prevMessages]);
      setTimeout(_ => {
          setMessages(prevMessages => prevMessages.filter(m => m.id !== id));
      }, 3000);
  }, []);


  //1
  useEffect(_ => {
    axios.get(URL)
      .then(res => {
        console.log(res)
        setAnimals(res.data);
        setError(null);
      })
      .catch(err => {
        console.log(err)
        if (err.response) {
          setError(err.response.status + ' ' + err.response.statusText);
        }else {
          setError(err.message);
        }
      });
  }, []);

  useEffect(_ => {
    setAnimalEditInput(animals?.find(animal => animal.id === editStatus)?.name || '');
  }, [editStatus])
  //2

  useEffect(_ => {
    if (null !== storeAnimals) {
      axios.post(URL, storeAnimals)
        .then(res => {
          setAnimals(prevAnimals => [{ name: storeAnimals.name, id: res.data.id }, ...prevAnimals]);
          setAnimalInput('');
          setError(null);
          addMessage(res.data.type, res.data.message);
        })
        .catch(err => console.log(err));
    }
  }, [storeAnimals]);

  useEffect(_ => {
    if (null !== destroyAnimals) {
      axios.delete(`${URL}/{destroyAnimals.id}`)//perdavimas per parametra
        .then(res => {
          setAnimals(animals.filter(animal => animal.id !== destroyAnimals.id));
          setError(null);
          addMessage(res.data.type, res.data.message);
        })
        .catch(err => { 
          console.log(err);
          addMessage('danger', err.response ? err.response.status + ' ' + err.response.statusText : err.message) ;
        });
    }
  }, [destroyAnimals]);

  useEffect(_ => {
    if (updateAnimals) {
      axios.put(`${URL}/${updateAnimals.id}`, updateAnimals)
        .then(res => {
          setAnimals(animals.map(animal => animal.id === updateAnimals.id ? { ...animal, name: updateAnimals.name } : animal));
          setEditStatus(null);
          setError(null);
          addMessage(res.data.type, res.data.message);
        })
        .catch(err => {
          console.log(err)
        });
    }
  }, [updateAnimals]);

  const submit = _ => {
    setStoreAnimals({ name: animalInput });
  }

  const change = animal => {
    if (null === editStatus || editStatus !== animal.id) {
      setEditStatus(animal.id)
    }
    else {
      setUpdateAnimals({ name: animalEditInput, id: animal.id });
    }
  }



  return (
    <div className="App">
      <header className="App-header">
        <h1>React and Express full of Animals</h1>
        {
          animals && animals.length !== 0 && animals.map(animal => (
            <div key={animal.id} className="animal-line">
              <h3 style={{
                width: '200px',
                margin: '30px',
                display: editStatus === animal.id ? 'none' : 'block'
              }}>{animal.name}</h3>
              <div className="form animal-edit"
                style={{
                  width: '200px',
                  display: editStatus === animal.id ? 'block' : 'none'
                }}>
                <input type="text" value={animalEditInput} onChange={e => setAnimalEditInput(e.target.value)} />
              </div>
              <div className="buttons">
                <button className="red" onClick={_ => setDestroyAnimals(animal)} >Let go free</button>
                <button className="green" style={{ width: '90px' }} onClick={_ => change(animal)}>{editStatus === animal.id ? 'Submit' : 'Change'}</button>
              </div>
            </div>
          ))
        }
        {
          animals && !animals.length && <p>No Animals Found</p>
        }
        {
          !animals && (error ?<p style={{color: 'crimson'}}>{error}</p> : <p>Animals is loading...</p>)
        }

        <div className="form">
          <input type="text" placeholder="Enter Animal" value={animalInput} onChange={e => setAnimalInput(e.target.value)} />
        </div>
        <div className="buttons">
          <button className="green" onClick={submit} >Submit</button>
          <button className="red" onClick={_ => setAnimalInput('')}>Clear</button>
        </div>
      </header>
      <Messages messages ={messages}/>
    </div>
  );
}

export default App;
