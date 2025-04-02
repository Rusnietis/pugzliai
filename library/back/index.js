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
  database: 'library'
})
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }))
app.use(express.static('public'));
app.use(bodyParser.json());

connection.connect();

// files
const writeImage = imageBase64 => {
  if (!imageBase64) {
    return null;
  }
  let type;
  let image;
  if (imageBase64.indexOf('data:image/png;base64,') === 0) {
    type = 'png';
    image = Buffer.from(imageBase64.replace(/^data:image\/png;base64,/, ''), 'base64');
  } else if (imageBase64.indexOf('data:image/jpeg;base64,') === 0) {
    type = 'jpg';
    image = Buffer.from(imageBase64.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
  } else {
    res.status(500).send('Bad image format');
    return;
  }
  const filename = md5(uuidv4()) + '.' + type;
  fs.writeFileSync('public/images/' + filename, image);
  return filename;
};

const deleteImage = heroId => {
  let sql = 'SELECT image FROM heroes WHERE id = ?';
  connection.query(sql, [heroId], (err, results) => {
    if (err) {
      res.status
    } else {
      if (results[0].image) {
        fs.unlinkSync('public/' + results[0].image);
      }
    }
  });
};



// router  

app.get('/', (req, res) => {
  console.log('Buvo užklausta /');
  res.send('Labas Meškėnai!');
});

//statistika
app.get('/stats', (req, res) => {
  const sql = `
SELECT 'authors' AS name, COUNT(*) AS count, NULL as stats
FROM authors
UNION
SELECT 'books', COUNT(*), MAX(pages)
FROM books
UNION
SELECT 'heroes', COUNT(*), SUM(good)
FROM heroes
`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });


})


//paemimas is serverio

app.get('/authors', (req, res) => {
  const sql = 'SELECT * FROM authors';
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
  SELECT h.id, h.name, a.name As authorName, a.surname As authorSurname, good, book_id, title, h.image 
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
      res.json({
        success: true,
        id: result.insertId,
        uuid: req.body.id,
        message: { type: 'success', text: 'Nice! Author added' }
      });
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
      res.json({
        success: true,
        id: result.insertId,
        uuid: req.body.id,
        message: { type: 'success', text: 'Nice! Book added' }
      });
    }
  });
})

app.post('/heroes', (req, res) => {

  const filename = writeImage(req.body.image);

  const { name, good, book_id } = req.body;
  const sql = 'INSERT INTO heroes (name, good, book_id, image) VALUES (?, ?, ?, ?)';
  connection.query(sql, [name, good, book_id, filename !== null ? ('images/' + filename) : null], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: result.insertId,
        uuid: req.body.id,
        message: { type: 'success', text: 'Nice! Hero added' }
      });
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
      if (err.errno === 1451) {
        res.status(422).json({ message: { type: 'danger', text: 'You can not delete this author. There are books assigned to him.' } });
      } else {
        res.status(500).send(err);
      }
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: 'info', text: 'Bum! Author deleted' }
      });
    }
  });
});

app.delete('/books/:id', (req, res) => {
  // res.status(401).json({ status: 'login' });
  // return;
  let sql;
  sql = 'SELECT image FROM heroes WHERE book_id = ?';
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      results.forEach(hero => {
        if (hero.image) {
          fs.unlinkSync('public/' + hero.image);
        }
      });
    }
  });
  sql = 'DELETE FROM books WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: 'info', text: 'Bum! Book deleted! All heroes from this book gone' }
      });
    }
  });
});

app.delete('/heroes/:id', (req, res) => {
  // res.status(401).json({ status: 'login' });
  // return;
  deleteImage(req.params.id)
  sql = 'DELETE FROM heroes WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: 'info', text: 'Bum! Hero deleted' }
      });
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
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: 'success', text: 'Perfect! Author updated' }
      });
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
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: 'success', text: 'Nice! Book updated' }
      });
    }
  });
})

app.put('/heroes/:id', (req, res) => {

  if (req.body.del) {
    deleteImage(req.params.id)
  }
  const filename = writeImage(req.body.image);
  const { name, good, book_id } = req.body;
  let sql;
  let params = [];
  if (req.body.del || filename !== null) {
    sql = 'UPDATE heroes SET name = ?, good = ?, book_id = ?, image = ? WHERE id = ?';
    params = [name, good, book_id, filename !== null ? ('images/' + filename) : null, req.params.id];
  } else {
    sql = 'UPDATE heroes SET name = ?, good = ?, book_id = ? WHERE id = ?';
    params = [name, good, book_id, req.params.id];
  }

  connection.query(sql, params, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ 
        success: true,
         id: +req.params.id,
         message: { type: 'success', text: 'Perfect! Hero updated' }
        });
    }
  });
})




app.listen(port, () => {
  console.log(`KNYGŲ SERVERIS klauso ${port} porto.`);
});