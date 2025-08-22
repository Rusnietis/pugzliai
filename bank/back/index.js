const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
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
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));
app.use(bodyParser.json());

connection.connect();

// files

const writeImage = imageBase64 => {
  if (!imageBase64) {
    return null
  };
  let type;
  let image;
  if (imageBase64.indexOf('data:image/png;base64,') === 0) {
    type = 'png';
    image = Buffer.from(imageBase64.replace(/^data:image\/png;base64,/, ''), 'base64');
  } else if (imageBase64.indexOf('data:image/jpeg;base64,') === 0) {
    type = 'jpg';
    image = Buffer.from(imageBase64.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
  } else {
    return null;
  }
  const filename = md5(uuidv4()) + '.' + type;
  fs.writeFileSync('public/images/' + filename, image);
  return filename
}

const deleteImage = (customer_Id) => {
  return new Promise((resolve, reject) => {
    const sqlSelect = 'SELECT image FROM customers WHERE id = ?';
    connection.query(sqlSelect, [customer_Id], (err, results) => {
      if (err) {
        console.error('Klaida tikrinant paveikslėlį:', err);
        return reject('DB klaida');
      }

      if (results.length === 0) {
        return reject('Klientas nerastas');
      }

      const imagePath = results[0].image;
      if (imagePath) {
        try {
          fs.unlinkSync('public/' + imagePath);
        } catch (e) {
          console.warn('Nepavyko ištrinti paveikslėlio:', e.message);
          // Nesustabdom proceso, nes paveikslėlis gali būti jau trintas
        }
      }

      resolve();
    });
  });
};


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
  SELECT 
      customers.id AS customer_id,
      customers.name,
      customers.surname,
      customers.image,
      customers.is_blocked,
      accounts.id AS account_id,
      accounts.account,
      accounts.amount
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
  const filename = writeImage(req.body.image);
  const { name, surname, account, amount } = req.body;

  const amountNumber = parseFloat(amount) || 0;

  const customerSql = `
    INSERT INTO customers (name, surname, image, is_blocked)
    VALUES (?, ?, ?, 0)
  `;
  connection.query(customerSql, [name, surname, filename ? 'images/' + filename : null], (err, customerResult) => {
    if (err) {
      console.error('Klaida įrašant klientą:', err);
      return res.status(500).json({ error: 'Nepavyko įrašyti kliento.' });
    }

    const customer_id = customerResult.insertId;

    const accountSql = `
      INSERT INTO accounts (customer_id, account, amount)
      VALUES (?, ?, ?)
    `;
    connection.query(accountSql, [customer_id, account, amountNumber], (err2, accountResult) => {
      if (err2) {
        console.error('Klaida įrašant sąskaitą:', err2);
        return res.status(500).json({ error: 'Nepavyko įrašyti sąskaitos.' });
      }

      res.json({
        success: true,
        account_id: accountResult.insertId,
        uuid: req.body.id,
        image: filename ? `/images/${filename}` : null
      });
    });
  });
});

// Kliento atnaujinimas
app.put('/customers/:id', (req, res) => {
  console.log('Gavau ID:', req.body);
  if (req.body.del) {
    deleteImage(req.params.id, res);
  }
  const filename = writeImage(req.body.image);
  const { name, surname, customer_id, is_blocked } = req.body;
  //console.log('kas ateina', req.body)
  let sql;
  let params;
  if (req.body.del || filename !== null) {
    sql = 'UPDATE customers SET name = ?, surname = ?, is_blocked = ?, image = ? WHERE id = ?';
    params = [name, surname, is_blocked, filename !== null ? ('images/' + filename) : null, req.params.id];
  } else {
    sql = 'UPDATE customers SET name = ?, surname = ?, is_blocked = ?  WHERE id = ?';
    params = [name, surname, is_blocked, req.params.id];
  }

  connection.query(sql, params, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'DB update error' });
    } else {
      res.json({ success: true, id: +req.params.id })
    }
  })

})

app.patch('/customers/:id/amount', (req, res) => {
  const { change } = req.body;
  console.log('atėjo į patch /customers/:id/amount', req.params.id, change);

  const sql = 'UPDATE accounts SET amount = amount + ? WHERE customer_id = ?';
  connection.query(sql, [change, req.params.id], (err) => {
    if (err) {
      console.error('Klaida atnaujinant sąskaitos sumą:', err);
      return res.status(500).json({ error: 'Nepavyko atnaujinti sąskaitos sumos.' });
    }

    // Paimam atnaujintą klientą iš DB
    const getSql = `
      SELECT c.*, a.amount, a.account
      FROM customers c
      JOIN accounts a ON c.customer_id = a.customer_id
      WHERE c.customer_id = ?
    `;
    connection.query(getSql, [req.params.id], (err, results) => {
      if (err) {
        console.error('Klaida gaunant klientą:', err);
        return res.status(500).json({ error: 'Nepavyko gauti atnaujinto kliento.' });
      }

      res.json(results[0]); // 👈 grąžinam visą klientą su nauja amount reikšme
    });
  });
});

app.put('/accounts/:id', (req, res) => {
  console.log('atėjo į /accounts/:id');
  console.log('id', req.body)
  const { account, amount, customer_id } = req.body;

  const sql = 'UPDATE accounts SET account = ?, amount = ?, customer_id = ? WHERE id = ?';
  connection.query(sql, [account, amount, customer_id, req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        // message: { type: 'success', text: 'Nice! Book updated' }
      });
    }
  });
})


app.delete('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    await deleteImage(customerId); // Laukiam paveikslėlio trynimo
    const sqlDelete = 'DELETE FROM customers WHERE id = ?';
    connection.query(sqlDelete, [customerId], (err2, result) => {
      if (err2) {
        console.error('DB klaida:', err2);
        return res.status(500).json({ error: 'Nepavyko ištrinti kliento' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Klientas nerastas' });
      }

      res.json({ success: true, id: +customerId });
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});




// app.delete('/customers/:id', (req, res) => {
//   console.log('Gaunamas ID trynimui:', req.params.id);
//   let sql = 'SELECT image FROM customers WHERE id = ?';
//   connection.query(sql, [req.params.id], (err, results) => {
//     if (err) {
//       res.status
//     } else {
//       if (results[0].image) {
//         fs.unlinkSync('public/' + results[0].image)
//       }
//     }
//   });

//   const customerId = req.params.id;
//   sql = 'DELETE FROM customers WHERE id = ?';
//   connection.query(sql, [customerId], (err, result) => {
//     if (err) {
//       console.error('DB klaida:', err);
//       return res.status(500).json({ error: 'Nepavyko ištrinti kliento' });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Klientas nerastas' });
//     }

//     res.json({ success: true, id: +customerId });
//   });
// });

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