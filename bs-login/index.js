const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const fs = require('node:fs');
const { type } = require('node:os');
const app = express();
const md5 = require('md5');
const jwt = require('jsonwebtoken');


const port = 3001;

app.use(cors());
app.use(express.static('public'));

app.use(bodyParser.json());

const SECRET_KEY = 'aP*8!d19f_@#cKw!37D$&(*Ng02q31!abY';
//const secretKey = '6a868f78-38d7-4d63-86dd-3607fae6c2e7';

//  const secretKey = uuidv4();
// console.log('Generated secret key:', secretKey);
let user;

// // router

app.get('/', (req, res) => {
  console.log('Buvo uzklausta/')
  // const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  //res.json(data);
  res.send('Labas Bebrai')
});

// const doAuth = (req, res, next) => {
//   const token = req.query.token || req.body.token || '';
//   // console.log('Full request query:', req.query); // Spausdinkite pilną query objektą
//   // console.log('Received token:', req.query.token); // Patikrinkite token vertę
//   // console.log('Received token:', token);

//   if (!token) {
//     console.log('Token is missing');
//     return res.status(401).json({ error: 'Token is required' });
//   }

//   console.log('Secret key:', secretKey); // Patikrinkite raktą prieš tikrinimą

//   if (!secretKey) {
//     console.error('Secret key is missing or undefined');
//     return res.status(500).json({ error: 'Server configuration error' });
//   }

//   try {
//     const decoded = jwt.verify(token, secretKey);
//     req.user = decoded;
//     console.log('Decoded JWT:', decoded);
//     next();
//   } catch (error) {
//     console.log('JWT validation error:', error.message);
//     return res.status(403).json({ error: 'Invalid token', details: error.message });
//   }
// };

const doAuth = (req, res, next) => {
  //console.log('Full request:', req);  // Patikrinkite visus parametrus

  const token = req.query.token || req.body.token || '';
  console.log('Received token:', req.query.token);  // Patikrinkite, kas pasiekiama

  if (token === '') {
    return next();
  }
  console.log('token', token)
  return next();
}

app.use(doAuth)

app.get('/users', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Nepavyko nuskaityti vartotojų duomenų.' });
  }
});


app.get('/customers', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
  res.json(data);
});

// Naujo kliento pridėjimas
app.post('/customers', (req, res) => {
  const { name, account, amount } = req.body;

  if (!name || !account || !amount) {
    return res.status(400).json({ error: 'Prašome nurodyti visus kliento duomenis.' });
  }

  fs.readFile('./data/customers.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Nepavyko nuskaityti klientų duomenų.' });
    }

    const customers = JSON.parse(data);
    const newCustomer = {
      id: customers.length + 1,
      name,
      account,
      amount
    };

    customers.push(newCustomer);

    fs.writeFile('./data/customers.json', JSON.stringify(customers, null, 4), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Nepavyko įrašyti kliento duomenų.' });
      }

      res.status(201).json({ message: 'Klientas pridėtas sėkmingai!', customer: newCustomer });
    });
  });
});


// Prisijungimas
app.post('/login', (req, res) => {
  console.log('Patikrinam, kas ateina:', req.body);  // Patikrinam, kas ateina
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Nurodykite vartotojo vardą ir slaptažodį.' });
  }

  fs.readFile('./data/users.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Serverio klaida skaitant vartotojų duomenis.' });
    }

    const users = JSON.parse(data);

    const user = users.find(u => u.username === username && u.password === md5(password));

    if (user) {
      const token = jwt.sign(
        { username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
      //console.log('tokenas',token)
      res.status(200).json({
        message: 'Prisijungimas sėkmingas!',
        token,
        username
      });
    } else {
      res.status(401).json({ error: 'Netinkamas vartotojo vardas arba slaptažodis.' });
    }
  });
});

// Serverio paleidimas
app.listen(port, () => {
  console.log(`Banko klientai klauso ${port} porto.`);
});