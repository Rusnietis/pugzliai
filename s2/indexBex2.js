const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const fs = require('node:fs');
const { type } = require('node:os');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.json());

// // router

app.get('/customers', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));// nuskaitymas ir pavertimas i masyva
  //res.status(400).end();
 res.json(data); //issiuntimas i serveri
});

app.post('/customers', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));// nuskaitymas ir pavertimas i masyva
  const newCustomer = req.body;// I nauja klienta idedame nauja varda(klienta pvz. - Jonas)
  newCustomer.id = uuidv4();// prie kliento pridedame ID
  data.push(newCustomer);// su papildytais duomenimis irasome i faila
  fs.writeFileSync('./data/data.json', JSON.stringify(data));
  res.json({id: newCustomer.id,  message: 'Klientas pridėtas', type: 'success'}); // graziname nauja objekta i reacta/narsykle
  //res.json({ id: newAnimal.id,  message: 'Animal at home now', type: 'success' });
});

app.delete('/customers/:id', (req, res) => {

  let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
  const id = req.params.id;
  data = data.filter(customer => customer.id !== id);
  fs.writeFileSync('./data/data.json', JSON.stringify(data));
  // res.json({status: 'ok'});
  //res.status(204).end();
  res.json({ message: 'Klientas ištrintas', type: 'info' });

});

app.put('/customers/:id', (req, res) => {
  let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8')); // Perskaitome esamus klientų duomenis
  const id = req.params.id; // Gauname kliento ID iš URL
  const updateCustomer = req.body; // Gauname naujus duomenis iš užklausos kūno

  // Atnaujiname konkretų klientą pagal jo ID
  data = data.map(customer => 
    customer.id === id ? { ...customer, ...updateCustomer } : customer
  );

  // Įrašome atnaujintus duomenis į failą
  fs.writeFileSync('./data/data.json', JSON.stringify(data, null, 2)); // `null, 2` suteikia formatavimą, kad JSON failas būtų lengviau skaitomas

  // Grąžiname atsakymą su patvirtinimu
  res.json({ id, message: 'Klientas atnaujintas', type: 'info' });
});

// app.put('/customers/:id', (req, res) => {
//   let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
//   const id = req.params.id;
//   const updateCustomer = req.body;
//   data = data.map(customer => customer.id === id ? { ...customer,...updateCustomer, id } : customer);
//   fs.writeFileSync('./data/data.json', JSON.stringify(data));
//   res.json({id: newCustomer.id, message: 'Klientas atnaujintas', type: 'info'  });

// });


app.listen(port, () => {
  console.log(`Klientai klauso ${port} porto.`);
});