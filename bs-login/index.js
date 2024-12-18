const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const fs = require('node:fs');
const { type } = require('node:os');
const app = express();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
//const { URLSearchParams } = require('node:url');


const port = 3001;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

const SECRET_KEY = 'aP*8!d19f_@#cKw!37D$&(*Ng02q31!abY';


let user;

const checkUserIsLogged = (user, res) => {
  if (user) {
    return true;
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
}



// // router

app.get('/', (req, res) => {
  console.log('Buvo uzklausta/')
  // const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  //res.json(data);
  res.send('Labas Bebrai')
});


// const doAuth = (req, res, next) => {
//   //console.log('Full request:', req);  // Patikrinkite visus parametrus

//   const token = req.query.token || req.body.token || '';
//   console.log('Received token:', req.query.token);  // Patikrinkite, kas pasiekiama

//   if (token === '') {
//     return next();
//   }
//   console.log('token', token)
//   return next();
// }


const doAuth = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.body.token || req.query.token;

  console.log('Authorization header:', req.headers['authorization']);
  console.log('Request body:', req.body);
  console.log('Query params:', req.query);
  console.log('Extracted token:', token);

  if (!token) {
    console.warn('Tokenas nerastas.');
    return res.status(401).json({ message: 'Trūksta tokeno.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Token tikrinimo klaida:', err.name, err.message);
      return res.status(401).json({ message: 'Netinkamas arba pasibaigusio galiojimo tokenas.' });
    }

    console.log('Tokenas teisingas, vartotojas:', decoded);
    req.user = decoded; // Dekoduojamas vartotojas
    next();
  });
};


//app.use(doAuth)

// app.get('/users', (req, res) => {
//   // if(!checkUserIsLogged(req.user, res)) {
//   //   return;
//   // }

//   try {
//     const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ error: 'Nepavyko nuskaityti vartotojų duomenų.' });
//   }
// });

app.get('/customers', doAuth, (req, res) => {

  if (!checkUserIsLogged(req.user, res)) {
    return
  }
  const data = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));// nuskaitymas ir pavertimas i masyva
  //res.status(400).end();
  res.json(data); //issiuntimas i serveri
});


// Naujo kliento pridėjimas
app.post('/customers', (req, res) => {
  const { name, account, amount } = req.body;
  console.log('114',req.body)

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

      res.status(201).json({ message: 'Klientas pridėtas sėkmingai!', customer: newCustomer, uuid: req.body.id });
    });

    console.log(customers)
  });
});


// Prisijungimas

app.post('/login', (req, res) => {
  //console.log('Patikrinam, kas ateina login:', req.body);  // Patikrinam, kas ateina
  const { username, password } = req.body;
  console.log('Patikrinam, kas ateina login:', req.body);
  if (!username || !password) {
    return res.status(400).json({ error: 'Nurodykite vartotojo vardą ir slaptažodį.' });
  }

  fs.readFile('./data/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Klaida skaitant vartotojų duomenis:', err);
      return res.status(500).json({ error: 'Serverio klaida skaitant vartotojų duomenis.' });
    }

    try {
      const users = JSON.parse(data);

      const user = users.find(u => u.username === username && u.password === md5(password));

      if (user) {
        const token = jwt.sign(
          { username: user.username },
          SECRET_KEY,
          { expiresIn: '24h' }
        );

        console.log('Generuojamas token:', token);

        res.status(200).json({
          message: 'Prisijungimas sėkmingas!',
          token,
          username: user.username,
        });
      } else {
        console.warn('Netinkamas vartotojo vardas arba slaptažodis.');
        res.status(401).json({ error: 'Netinkamas vartotojo vardas arba slaptažodis.' });
      }
    } catch (parseError) {
      console.error('Klaida parsinguojant vartotojų duomenis:', parseError);
      res.status(500).json({ error: 'Klaida apdorojant vartotojų duomenis.' });
    }
  });
});



// Serverio paleidimas
app.listen(port, () => {
  console.log(`Banko klientai klauso ${port} porto.`);
});