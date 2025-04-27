const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bank'
})
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

connection.connect();

// const checkUserIsLogged = (user, res) => {
//   if (user) {
//     return true;
//   } else {
//     res.status(401).json({ message: 'Not logged in' });
//   }

// }

// router  

app.get('/', (req, res) => {
  console.log('Buvo užklausta /');
  res.send('Labas Meškėnai!');
});

// const doAuth = (req, res, next) => {

//   const token = req.query.token || req.body.token || '';

//   if (token === '') {
//     return next();
//   }

//   const sql = `
//     SELECT users.name, users.id, users.role
//     FROM sessions
//     LEFT JOIN users ON sessions.user_id = users.id
//     WHERE sessions.id = ? AND sessions.time > ?
//   `;
//   const time = Date.now() - 1000 * 60 * 60 * 24;
//   connection.query(sql, [token, time], (err, results) => {
//     if (err) {
//       res.status(500);
//     } else {
//       if (results.length > 0) {
//         const user = results[0];
//         req.user = user;
//       }
//     }
//     return next();
//   });
// };

// app.use(doAuth);
// //paemimas is serverio
app.get('/customers', (req, res) => {

  //console.log('Jo ateinam', req.user.name)

  // if (!checkUserIsLogged(req.user, res)) {
  //   return;
  // }

  const sql = `
  SELECT * 
  FROM customers
  JOIN accounts ON customers.id = accounts.customer_id;
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.json(results);
      console.log(results)
    }
  });
});

// // irasinejimas i duomenu baze
app.post('/customers', (req, res) => {
  const { name, surname, account, amount } = req.body;

  const customerSql = 'INSERT INTO customers (name, surname) VALUES (?, ?)';
  connection.query(customerSql, [name, surname], (err, customerResult) => {
    if (err) {
      console.error('Klaida įrašant klientą:', err);
      return res.status(500).json({ error: 'Nepavyko įrašyti kliento.' });
    }

    const customer_id = customerResult.insertId;
    const accountSql = 'INSERT INTO accounts (customer_id, account, amount) VALUES (?, ?, ?)';
    connection.query(accountSql, [customer_id, account, amount], (err2, accountResult) => {
      if (err2) {
        console.error('Klaida įrašant sąskaitą:', err2);
        return res.status(500).json({ error: 'Nepavyko įrašyti sąskaitos.' });
      }

      res.json({
        success: true,
        customerId: customer_id,
        accountId: accountResult.insertId, 
        uuid: req.body.id
      });
    });
  });
});


// app.put('/fruits/:id', (req, res) => {

//   // if (!checkUserIsAuthorized(req.user, res, ['admin', 'user'])) {
//   //   return;
//   // }

//   const { name, color, form } = req.body;
//   const sql = 'UPDATE fruits SET name = ?, color = ?, form = ? WHERE id = ?';
//   connection.query(sql, [name, color, form, req.params.id], (err) => {
//     if (err) {
//       res.status(500);
//     } else {
//       res.json({ success: true, id: +req.params.id });
//     }
//   });
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
//   connection.query(sql, [username, md5(password)], (err, results) => {
//     if (err) {
//       res.status(500).json({ message: 'Server error 1' });
//     } else {
//       if (results.length > 0) {
//         const token = md5(uuidv4());
//         const sql = 'INSERT INTO sessions (id, user_id, time) VALUES (?, ?, ?)';
//         connection.query(sql, [token, results[0].id, Date.now()], (err) => {
//           if (err) {
//             res.status(500);
//           } else {
//             res.json({ success: true, token, name: results[0].name, role: results[0].role, id: results[0].id });
//           }
//         });
//       } else {
//         res.status(401).json({ message: 'Invalid name or password' });
//       }
//     }
//   });

// });


app.listen(port, () => {
  console.log(`BANKO SERVERIS klauso ${port} porto.`);
});