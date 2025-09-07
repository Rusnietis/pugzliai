const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mysql = require('mysql');
const fs = require('fs');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const { type } = require('os');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bank'
})
const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000',     // 👈 leidžiam frontendui
  credentials: true,
  // methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  // allowedHeaders: ['Content-Type']     // 👈 leidžiam JSON ir kitus custom headerius
}));
app.use(cookieParser());
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

const checkUserIsAuthorized = (user, res, roles) => {
  if (user && roles.includes(user.role)) {
    return true;
  } else if (user && roles.includes('self:' + user.id)) {
    return true;
  } else if (user) {
    res.status(401).json({
      message: 'Not authorized',
      type: 'role'
    });
  } else {
    res.status(401).json({
      message: 'Not logged in',
      type: 'login'
    });
  }
}

const doAuth = (req, res, next) => {
  const token = req.cookies.bankSession || '';

  if (token === '') {
    return next();
  }

  const sql = `
    SELECT name, id, role
    FROM users
    WHERE session = ?
  `;
  connection.query(sql, [token], (err, results) => {
    if (err) {
      res.status(500).json({message: { type: 'danger', text: 'Server error On Auth' } });
    } else {
      if (results.length > 0) {
        const user = results[0];
        req.user = user;
      }
    }
    return next();
  });
};

app.use(doAuth);

//login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
  connection.query(sql, [username, md5(password)], (err, results) => {
    if (err) {
      res.status(500);
    } else {
      if (results.length > 0) {
        const token = md5(uuidv4());
        const sql = 'UPDATE users SET session = ? WHERE id = ?'
        connection.query(sql, [token, results[0].id], (err) => {
          if (err) {
            res.status(500).json({ message: 'Server error On Login' });
          } else {
            res.cookie('bankSession', token, { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true });
            res.json({
              success: true,
              name: results[0].name,
              role: results[0].role,
              id: results[0].id,
              message: { type: 'success', text: 'Jus sekmingai prisijungete' }

            });
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid name or password' });
      }
    }
  });
});

//logout 

app.post('/logout', (req, res) => {
  console('logout',res.data)
  const token = req.cookies.bankSession || '';
  const sql = 'UPDATE users SET session = NULL WHERE session = ?';
  connection.query(sql, [token], (err) => {
    if (err) {
      res.status(500).json({ message: { type: 'danger', text: 'Server error On Logout' } });
    } else {
      res.clearCookie('bankSession');
      res.json({ message: { type: 'success', text: 'Goodbye!' } });
    }
  });
})

// router  

app.get('/', (req, res) => {
  console.log('Buvo užklausta /');
  res.send('Labas Meškėnai!');
});


//statistika
app.get('/home-stats', (req, res) => {

  //res.cookie('KlientoCookis', '***Valio***')

  if (!checkUserIsAuthorized(req.user, res, ['admin' ,'user', 'animal'])) {
    return;
  }

  const sql = `
  SELECT 'customers' AS name, COUNT(*) AS count, SUM(image IS NULL) AS image, SUM(is_blocked = 0) AS is_blocked
  FROM customers
  UNION ALL
  SELECT 'accounts', SUM(amount), SUM(taxes), AVG(amount)
  FROM accounts
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Klaida gaunant statistiką:', err);
      return res.status(500).json({ error: 'Nepavyko gauti statistikos.' });
    }

    // const stats = {};
    // results.forEach(row => {
    //   stats[row.type] = row.count || 0;
    // });

    res.json(results);
  });
})

app.get('/customer-stats', (req, res) => {
  const sql = `
  SELECT 'customers' AS name, COUNT(*) AS count, SUM(image IS NULL) AS image, SUM(is_blocked = 0) AS is_blocked
  FROM customers
  UNION ALL
  SELECT 'accounts', SUM(amount), SUM(taxes), AVG(amount)
  FROM accounts
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Klaida gaunant statistiką:', err);
      return res.status(500).json({ error: 'Nepavyko gauti statistikos.' });
    }

    // const stats = {};
    // results.forEach(row => {
    //   stats[row.type] = row.count || 0;
    // });

    res.json(results);
  });
})

//paemimas is serverio
app.get('/customers', (req, res) => {
  const { isBlocked, amountType, sort } = req.query;

  let sql = `
    SELECT 
      c.id AS customer_id,
      c.name,
      c.surname,
      IFNULL(c.image,'') AS image,
      c.is_blocked,
      IFNULL(a.account,'') AS account,
      IFNULL(a.amount,0) AS amount
    FROM customers c
    LEFT JOIN accounts a ON c.id = a.customer_id
  `;

  const params = [];
  const conditions = [];

  // --- Filtravimas pagal blokavimą ---
  if (isBlocked !== undefined) {
    conditions.push("c.is_blocked = ?");
    params.push(Number(isBlocked));
  }

  // --- Filtravimas pagal sąskaitos tipą ---
  if (amountType) {
    if (amountType === "positive") conditions.push("a.amount > 0");
    if (amountType === "negative") conditions.push("a.amount < 0");
    if (amountType === "zero") conditions.push("a.amount = 0");
  }

  // --- WHERE dalis ---
  if (conditions.length > 0) {
    sql += " WHERE " + conditions.join(" AND ");
  }

  // --- Sortavimas ---
  if (sort) {
    const validFields = ["surname", "amount"];
    if (validFields.includes(sort)) {
      sql += ` ORDER BY ${sort === "surname" ? "c.surname" : "a.amount"} ASC`;
      // Jei norisi DESC, galime perduoti papildomą parametą order
    }
  }

  // --- Užklausa į DB ---
  connection.query(sql, params, (err, results) => {
    if (err) {
      console.error("Klaida gaunant klientus:", err);
      return res.status(500).json({ error: "Nepavyko gauti klientų." });
    }
    res.json(results);
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
        image: filename ? `/images/${filename}` : null,
        message: { type: 'success', text: 'Klientas sėkmingai įrašytas' }
      });
    });
  });
});

// Kliento atnaujinimas
app.put('/customers/:id', (req, res) => {
  //console.log('Gavau ID:', req.body);
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
      res.json({
        success: true,
        id: +req.params.id,

      })
    }
  })

})

// pinigu pridejimas ir atemimas
app.patch('/customers/:id/amount', (req, res) => {
  const { change } = req.body;
  //console.log('atėjo į patch /customers/:id/amount', req.params.id, change);

  // atnaujinam accounts lentelę
  const sql = 'UPDATE accounts SET amount = amount + ? WHERE customer_id = ?';
  connection.query(sql, [change, req.params.id], (err) => {
    if (err) {
      console.error('Klaida atnaujinant sąskaitos sumą:', err);
      return res.status(500).json({ error: 'Nepavyko atnaujinti sąskaitos sumos.' });
    }

    // paimam atnaujintą klientą + account info
    const getSql = `
      SELECT c.id AS customer_id, c.name, a.amount, a.account
      FROM customers c
      JOIN accounts a ON c.id = a.customer_id
      WHERE c.id = ?                          
    `;
    connection.query(getSql, [req.params.id], (err, results) => {
      if (err) {
        console.error('Klaida gaunant klientą:', err);
        return res.status(500).json({ error: 'Nepavyko gauti atnaujinto kliento.' });
      }

      res.json({
        result: results[0],
        message: { type: 'success', text: 'Sąskaitos likutis sėkmingai atnaujintas' }
      }); // grąžinam klientą su nauja amount reikšme
    });
  });
});

//kliento blokavimas
app.patch('/customers/:id/is_blocked', (req, res) => {
  const { is_blocked } = req.body;
  const sql = 'UPDATE customers SET is_blocked = ? WHERE id = ?';
  connection.query(sql, [is_blocked, req.params.id], (err) => {
    if (err) {
      console.error('Klaida atnaujinant kliento blokavimo būseną:', err);
      return res.status(500).json({ error: 'Nepavyko atnaujinti kliento blokavimo būsenos.' });
    }

    const getSql = `
      SELECT c.id AS customer_id, c.name, c.surname, c.image, c.is_blocked, a.amount, a.account
      FROM customers c
      JOIN accounts a ON c.id = a.customer_id
      WHERE c.id = ?                          
    `;
    connection.query(getSql, [req.params.id], (err, results) => {
      if (err) {
        console.error('Klaida gaunant klientą:', err);
        return res.status(500).json({ error: 'Nepavyko gauti atnaujinto kliento.' });
      }

      // 👇 čia užtikrinam, kad `image` visada būtų tik relative path
      if (results[0]?.image && results[0].image.startsWith('http')) {
        results[0].image = results[0].image.replace(/^https?:\/\/[^/]+\//, '');
      }

      res.json(results[0]);
    });
  });
});

// nuskaiciuoti mokescius nuo visu klientu ir irasyti i taxes stulpeli
app.patch('/customers/taxes', (req, res) => {
  const { change } = req.body; // pvz. -5 €

  const sql = `
    UPDATE accounts
    SET amount = amount + ?, 
        taxes = IFNULL(taxes, 0) + ?
  `;

  connection.query(sql, [change, -change], (err) => {
    if (err) {
      console.error('Nepavyko pritaikyti mokesčių:', err);
      return res.status(500).json({ error: 'Nepavyko pritaikyti mokesčių' });
    }
    // Gražinam visus atnaujintus klientus
    const sqlAll = `
      SELECT c.id AS customer_id, c.name, c.surname, c.image, c.is_blocked,
             a.amount, a.account, a.taxes
      FROM customers c
      JOIN accounts a ON c.id = a.customer_id
    `;
    connection.query(sqlAll, (err2, results) => {
      if (err2) {
        console.error('Nepavyko gauti klientų:', err2);
        return res.status(500).json({ error: 'Nepavyko gauti klientų' });
      }
      res.json({
        results,
        message: { type: 'success', text: 'Mokesčiai sėkmingai nuskaičiuoti' }
      });
    });
  });
});

app.delete('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  if (customerId.amount !== 0) {
    return res.status(400).json({ message: { type: 'danger', text: "Negalima ištrinti sąskaitos, joje dar yra pinigų" } });
  }
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

      res.json({
        success: true,
        id: +customerId,
        message: { type: 'success', text: 'Klientas sėkmingai ištrintas' }
      });
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