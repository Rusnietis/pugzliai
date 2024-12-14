const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const fs = require('node:fs');
const { type } = require('node:os');
const app = express();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { URLSearchParams } = require('node:url');


const port = 3001;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());

const SECRET_KEY = 'aP*8!d19f_@#cKw!37D$&(*Ng02q31!abY';


let user;

// const checkUserIsLogged = (user, res) => {
//   if (user) {
//     return true;
//   } else {
//     res.status(401).json({ message: 'Not logged in'});
//   }
// }
// Funkcija, skirta nuskaityti vartotojus iš JSON failo
const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync('./data/users.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Klaida skaitant vartotojų duomenis:', err);
    return [];
  }
};


// // router

app.get('/', (req, res) => {
  console.log('Buvo uzklausta/')
  // const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  //res.json(data);
  res.send('Labas Bebrai')
});




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

// const doAuth = (req, res, next) => {
//   // Gauti tokeną iš HTTP antraščių, query parametrų arba body
//   const token = req.headers['authorization']?.split(' ')[1] || req.body.token || req.query.token;
//   console.log(req.body.token)
//   if (!token) {
//     return res.status(401).json({ message: 'Trūksta tokeno.' });
//   }

//   // Patikriname tokeną
//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Netinkamas arba pasibaigusio galiojimo tokenas.' });
//     }

//     // Tokenas yra teisingas - pridedame vartotojo informaciją prie užklausos objekto
//     req.user = decoded;
//     next(); // Pereiname prie kito maršruto
//   });
// };

app.use(doAuth)

app.get('/users', (req, res) => {
  // if(!checkUserIsLogged(req.user, res)) {
  //   return;
  // }

  try {
    const data = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Nepavyko nuskaityti vartotojų duomenų.' });
  }
});

app.get('/customers', (req, res) => {
  // Tikriname, kad vartotojas yra autentifikuotas
  console.log('jo ateinam', req.user);  // Tai rodo autentifikuoto vartotojo informaciją (pvz., username)
  
  try {
    // Nuskaitykite klientų duomenis iš JSON failo
    const data = JSON.parse(fs.readFileSync('./data/customers.json', 'utf8'));
    
    // Grąžiname duomenis kaip JSON atsakymą
    res.json(data);
  } catch (error) {
    // Klaida nuskaitant failą
    console.error('Klaida nuskaitant klientų duomenis:', error);
    res.status(500).json({ message: 'Klaida nuskaitant klientų duomenis' });
  }
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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Vartotojo vardas ir slaptažodis yra privalomi.' });
  }

  // Nuskaitykite vartotojus iš JSON failo
  const users = readUsersFromFile();

  // Ieškome vartotojo pagal vardą ir slaptažodį
  const user = users.find(u => u.username === username && u.password === md5(password));

  if (user) {
    // Generuojame tokeną
    const token = md5(uuidv4());

    // Grąžiname sėkmingą atsakymą su tokenu ir vartotojo duomenimis
    res.json({
      message: 'Prisijungimas sėkmingas',
      token,
      username: user.username

    });
  } else {
    res.status(401).json({ message: 'Netinkamas vartotojo vardas arba slaptažodis.' });
  }
});

// app.post('/login', (req, res) => {
//   console.log('Patikrinam, kas ateina login:', req.body);  // Patikrinam, kas ateina
//   const { username, password } = req.body;

//   if (!username || !password) {
//       return res.status(400).json({ error: 'Nurodykite vartotojo vardą ir slaptažodį.' });
//   }

//   fs.readFile('./data/users.json', 'utf8', (err, data) => {
//       if (err) {
//           console.error('Klaida skaitant vartotojų duomenis:', err);
//           return res.status(500).json({ error: 'Serverio klaida skaitant vartotojų duomenis.' });
//       }

//       try {
//           const users = JSON.parse(data);

//           const user = users.find(u => u.username === username && u.password === md5(password));

//           if (user) {
//               const token = jwt.sign(
//                   { username: user.username },
//                   SECRET_KEY,
//                   { expiresIn: '1h' }
//               );

//               console.log('Generuojamas token:', token);

//               res.status(200).json({
//                   message: 'Prisijungimas sėkmingas!',
//                   token,
//                   username: user.username,
//               });
//           } else {
//               console.warn('Netinkamas vartotojo vardas arba slaptažodis.');
//               res.status(401).json({ error: 'Netinkamas vartotojo vardas arba slaptažodis.' });
//           }
//       } catch (parseError) {
//           console.error('Klaida parsinguojant vartotojų duomenis:', parseError);
//           res.status(500).json({ error: 'Klaida apdorojant vartotojų duomenis.' });
//       }
//   });
// });



// Serverio paleidimas
app.listen(port, () => {
  console.log(`Banko klientai klauso ${port} porto.`);
});