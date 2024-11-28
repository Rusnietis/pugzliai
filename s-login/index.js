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
  database: 'forest2'
})
const app = express();
const port = 3001;

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

connection.connect();

const checkUserIsLogged = (user, res) => {
  if(user) {
    return true;
  } else {
    res.status(401).json({ message: 'Not logged in'});
  }

}

// router  

app.get('/', (req, res) => {
  console.log('Buvo užklausta /');
  res.send('Labas Meškėnai!');
});

const doAuth = (req, res, next) => {

  const token = req.query.token || req.body.token || '';

  if (token === '') {
    return next();
  }

  const sql = `
    SELECT users.name, users.id, users.role
    FROM sessions
    LEFT JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = ? AND sessions.time > ?
  `;
  const time = Date.now() - 1000 * 60 * 60 * 24;
  connection.query(sql, [token, time], (err, results) => {
    if (err) {
      res.status(500);
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
//paemimas is serverio
app.get('/fruits', (req, res) => {

  //console.log('Jo ateinam', req.user.name)

  if (!checkUserIsLogged(req.user, res)) {
    return;
  }

  const sql = 'SELECT * FROM fruits';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.json(results);
    }
  });
});
// irasinejimas i duomenu baze
app.post('/fruits', (req, res) => {
  const { name, color, form } = req.body;
  const sql = 'INSERT INTO fruits (name, color, form) VALUES ( ?, ?, ?)';
  connection.query(sql, [name, color, form], (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.json({ success: true, id: result.insertId, uuid: req.body.id });
    }
  })

})

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
  connection.query(sql, [username, md5(password)], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Server error 1' });
    } else {
      if (results.length > 0) {
        const token = md5(uuidv4());
        const sql = 'INSERT INTO sessions (id, user_id, time) VALUES (?, ?, ?)';
        connection.query(sql, [token, results[0].id, Date.now()], (err) => {
          if (err) {
            res.status(500);
          } else {
            res.json({ success: true, token, name: results[0].name, role: results[0].role, id: results[0].id });
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid name or password' });
      }
    }
  });

});


app.listen(port, () => {
  console.log(`FRUITŲ SERVERIS klauso ${port} porto.`);
});