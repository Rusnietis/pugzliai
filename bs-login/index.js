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

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));// nuskaitymas ir pavertimas i masyva
  // res.status(400).end();
  res.json(data); //issiuntimas i serveri
});

// app.post('/animals', (req, res) => {
//   const data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));// nuskaitymas ir pavertimas i masyva
//   const newAnimal = req.body;
//   newAnimal.id = uuidv4();
//   data.push(newAnimal);
//   fs.writeFileSync('./data/data.json', JSON.stringify(data));
//   res.json({ id: newAnimal.id,  message: 'Animal at home now', type: 'success' });
// });

// app.delete('/animals/:id', (req, res) => {

//   let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
//   const id = req.params.id;
//   data = data.filter(animal => animal.id !== id);
//   fs.writeFileSync('./data/data.json', JSON.stringify(data));
//   //res.status(204).end();
//   res.json({ message: 'Animal is free now', type: 'info' });

// });

// app.put('/animals/:id', (req, res) => {
//   let data = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));
//   const id = req.params.id;
//   const updateAnimal = req.body;
//   data = data.map(animal => animal.id !== id ? { ...updateAnimal, id } : animal);
//   fs.writeFileSync('./data/data.json', JSON.stringify(data));
//   res.json({ message: 'Animal is diferent now', type: 'info'  });

// });

// Login endpoint'as
app.post('/login', (req, res) => {

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Trūksta vartotojo vardo arba slaptažodžio' });
  }

  try {
    // Perskaitome vartotojus iš JSON failo
    const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));

    // Tikriname vartotojo vardą ir slaptažodį
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return res.status(401).json({ message: 'Netinkamas vartotojo vardas arba slaptažodis' });
    }

    res.status(200).json({ message: 'Prisijungimas sėkmingas', userId: user.id });
  } catch (error) {
    console.error('Klaida tvarkant vartotojus:', error);
    res.status(500).json({ message: 'Serverio klaida' });
  }

})



app.listen(port, () => {
  console.log(`Banko klientai klauso ${port} porto.`);
});