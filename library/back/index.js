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
  database: 'library'
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

//paemimas is serverio

app.get('/authors', (req, res) => {
  const sql = 'SELECT * FROM authors';
  console.log
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });

})

app.get('/books', (req, res) => {
  const sql = `
  SELECT b.id, title, pages, genre, name, surname, author_id 
  FROM books as b
  LEFT JOIN authors as a
  ON b.author_id = a.id
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });

})

app.get('/heroes', (req, res) => {
  const sql = `
  SELECT h.id, h.name, a.name As authorName, a.surname As authorSurname, good, book_id, title 
  FROM heroes as h
  LEFT JOIN books as b
  ON h.book_id = b.id
  LEFT JOIN authors as a
  ON b.author_id = a.id
  ORDER BY h.id DESC
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });

})



// irasinejimas i duomenu baze
app.post('/authors', (req, res) => {

  // res.status(401).json({ status: 'login' });
  // return;

  const { name, surname, nickname, born } = req.body;
  console.log(req.body)
  const sql = 'INSERT INTO authors (name, surname, nickname, born) VALUES (?, ?, ?, ?)';
  connection.query(sql, [name, surname, nickname, born], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: result.insertId, uuid: req.body.id });
    }
  });
})

app.post('/books', (req, res) => {
  const { title, pages, genre, author_id } = req.body;
  const sql = 'INSERT INTO books (title, pages, genre, author_id) VALUES (?, ?, ?, ?)';
  connection.query(sql, [title, pages, genre, author_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: result.insertId, uuid: req.body.id });
    }
  });
})

app.post('/heroes', (req, res) => {
  const { name, good, book_id } = req.body;
  const sql = 'INSERT INTO heroes (name, good, book_id) VALUES (?, ?, ?)';
  connection.query(sql, [name, good, book_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: result.insertId, uuid: req.body.id });
    }
  });


})



// trynimas is duomenu bazes
app.delete('/authors/:id', (req, res) => {

  // res.status(401).json({ status: 'login' });
  // return;

  const sql = 'DELETE FROM authors WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});

app.delete('/books/:id', (req, res) => {

  // res.status(401).json({ status: 'login' });
  // return;

  const sql = 'DELETE FROM books WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});

app.delete('/heroes/:id', (req, res) => {
  // res.status(401).json({ status: 'login' });
  // return;
  const sql = 'DELETE FROM heroes WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});


// atnaujinimas

app.put('/authors/:id', (req, res) => {

  // res.status(403).send('no access');
  const { name, surname, nickname, born } = req.body;
  const sql = 'UPDATE authors SET name = ?, surname = ?, nickname = ?, born = ? WHERE id = ?';
  connection.query(sql, [name, surname, nickname, born, req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
})

app.put('/books/:id', (req, res) => {

  const { title, pages, genre, author_id } = req.body;
  const sql = 'UPDATE books SET title = ?, pages = ?, genre = ?, author_id = ? WHERE id = ?';
  connection.query(sql, [title, pages, genre, author_id, req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
})

app.put('/heroes/:id', (req, res) => {

  const { name, good, book_id } = req.body;
  const sql = 'UPDATE heroes SET name = ?, good = ?, book_id = ? WHERE id = ?';
  connection.query(sql, [name, good, book_id, req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
})




app.listen(port, () => {
  console.log(`KNYGŲ SERVERIS klauso ${port} porto.`);
});