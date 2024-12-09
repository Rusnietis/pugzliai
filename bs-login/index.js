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


// // router

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  res.json(data);
});

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
  res.json(data);
});

const doAuth = (req, res, next) => {

  const token = req.query.token || req.body.token || '';
  console.log('token', token)
  return next();
}

app.use(doAuth)

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

      fs.writeFile('./data/customers.json', JSON.stringify(customers, null, 3), (err) => {
          if (err) {
              return res.status(500).json({ error: 'Nepavyko įrašyti kliento duomenų.' });
          }

          res.status(201).json({ message: 'Klientas pridėtas sėkmingai!', customer: newCustomer });
      });
  });
});


// Prisijungimas
app.post('/login', (req, res) => {
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