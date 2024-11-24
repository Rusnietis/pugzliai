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

// router

app.get('/', (req, res) => {
  console.log('Buvo užklausta /');
  res.send('Labas Meškėnai!');
});

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
            res.json({ success: true, token, name: results[0].name, role: results[0].role, id: results[0].id});
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