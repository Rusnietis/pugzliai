const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const fs = require('fs');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const { error } = require('console');
const { inflateRawSync } = require('zlib');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'donations'
})
const app = express();
const port = 3001;

//const port = 80;

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));
// app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }))
app.use(express.static('public'));
app.use(bodyParser.json());

connection.connect();

//files
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

// const deleteImage = heroId => {
//   let sql = 'SELECT image FROM heroes WHERE id = ?';
//   connection.query(sql, [heroId], (err, results) => {
//     if (err) {
//       res.status
//     } else {
//       if (results[0].image) {
//         fs.unlinkSync('public/' + results[0].image);
//       }
//     }
//   });
// };

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
  const token = req.cookies.donateSession || '';

  //console.log('token', token)
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
      res.status(500).json({ message: 'Server error On Auth' });
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
            res.cookie('donateSession', token, { maxAge: 1000 * 60 * 60 * 24 * 365, httpOnly: true });
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
  const token = req.cookies.bankSession || '';
  const sql = 'UPDATE users SET session = NULL WHERE session = ?';
  connection.query(sql, [token], (err) => {
    if (err) {
      res.status(500).json({ message: { type: 'danger', text: 'Server error On Logout' } });
    } else {
      res.clearCookie('donateSession');
      res.json({ message: { type: 'success', text: 'Goodbye!' } });
    }
  });
})


// routs

app.get('/', (req, res) => {
  console.log('Buvo uzklausta /');
  res.send('Labas Bebrai')
})

app.get('/writers', (req, res) => {

  const sql = 'SELECT * FROM writers';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.json(results);
    }
  })
}
)

app.get("/stories", (req, res) => {

  // if (!checkUserIsAuthorized(req.user, res, ['user', 'animal'])) {
  //   return;
  // }

  const sql = `
  SELECT s.id, s.writer_id, s.title, s.short_description, s.story, s.goal, s.image, s.status, s.collected
  FROM stories s
  LEFT JOIN writers w ON s.writer_id = w.id
  ORDER BY 
  CASE 
   WHEN collected >= goal THEN 2
   ELSE 1
   END,
   collected ASC

  `;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Klaida gaunant duomenis iš stories", error: err });
    }

    res.json(results);
  });
});

app.get('/donors', (req, res) => {
  const sql = 'SELECT * FROM donors';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.json(results);
    }
  })
})


app.post("/writers", (req, res) => {
  const filename = writeImage(req.body.image);
  console.log('filename', filename)
  const { name, surname, createdAt, title, shortDescription, story, image, goal } = req.body;
  console.log('POST', req.body)
  const writerId = uuidv4();
  const storyId = uuidv4();

  const sql1 = `INSERT INTO writers (id, name, surname, created_at) VALUES (?, ?, ?, ?)`;
  connection.query(sql1, [writerId, name, surname, createdAt], (err1, results1) => {
    if (err1) {
      return res.status(500).json({ message: 'Klaida įrašant į writers lentelę', error: err1 });
    }

    const sql2 = `INSERT INTO stories (id, writer_id, title, short_description, story, goal, image)
              VALUES (?, ?, ?, ?, ?, ?,?)`;
    connection.query(sql2, [storyId, writerId, title, shortDescription, story, goal, filename ? 'images/' + filename : null], (err2, results2) => {
      if (err2) {
        return res.status(500).json({ message: 'Klaida įrašant į stories lentelę', error: err2 });
      }

      const storyId = results2.insertId; // naujai sugeneruotas story id

      res.json({
        succsess: true,
        writerId,
        storyId: results2.insertId, // id iš stories lentelės
        name,
        surname,
        createdAt,
        title,
        shortDescription,
        story,
        image: filename ? `/images/${filename}` : null,
        goal
      });
    });

  });
});

app.post('/donors', (req, res) => {
  const { name, amount, story_id, date } = req.body;
  console.log('POST Donor', req.body);

  // 1️⃣ Patikriname ar istorija dar nesurinko tikslo
  const sqlCheck = `SELECT goal, collected FROM stories WHERE id = ?`;
  connection.query(sqlCheck, [story_id], (err, result) => {
    if (err || result.length === 0) {
      return res.status(400).json({ message: 'Istorija nerasta arba klaida', error: err });
    }

    const story = result[0];
    const newCollected = Number(story.collected || 0) + Number(amount);

    // Jei tikslas jau pasiektas — neleidžiam aukoti
    if (story.collected >= story.goal) {
      return res.status(403).json({ message: 'Tikslas jau pasiektas — daugiau aukoti negalima' });
    }

    // 2️⃣ Įrašome donorą
    const sqlInsert = `INSERT INTO donors (name, amount, story_id, date) VALUES (?, ?, ?, ?)`;
    connection.query(sqlInsert, [name, amount, story_id, date], (err2, results) => {
      if (err2) {
        return res.status(500).json({ message: 'Klaida įrašant donorą', error: err2 });
      }

      // 3️⃣ Atnaujiname surinktą sumą
      const sqlUpdateCollected = `UPDATE stories SET collected = ? WHERE id = ?`;
      connection.query(sqlUpdateCollected, [newCollected, story_id], (err3) => {
        if (err3) {
          return res.status(500).json({ message: 'Klaida atnaujinant surinktą sumą', error: err3 });
        }

        // 4️⃣ 👇 Ir čia įdedi tavo klausiamą vietą — jei pasiekė tikslą, keičiam statusą
        if (newCollected >= story.goal) {
          const sqlUpdateStatus = `UPDATE stories SET status = 'finished' WHERE id = ?`;
          connection.query(sqlUpdateStatus, [story_id], (err4) => {
            if (err4) {
              console.error('Klaida keičiant statusą:', err4);
            }
            // galima tiesiog tęsti net jei klaida čia, nes neesminė
          });
        }

        // 5️⃣ Sėkmingas atsakymas
        res.json({
          success: true,
          donorId: results.insertId,
          name,
          amount,
          story_id,
          date,
          newCollected
        });
      });
    });
  });
});

// User registracija

app.post('/users', (req, res) => {
  const name = req.body.name || req.body.userName || req.body.username;
  const { password } = req.body
  //console.log('user', req.body)
  const sql = 'INSERT INTO users (name, password, role) VALUES (?, ?, ?)';
  connection.query(sql, [name, md5(password), 'animal'], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true });
    }
  });

});

//User CRUD

app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);

    }
    
  });
});

app.delete('/users/:id', (req, res) => {

  const sql = 'DELETE FROM users WHERE id = ?';
   connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({success: true, id: +req.params.id });

    }
    
  });
})

app.put('/users/:id', (req, res) => {
  const { role } = req.body;
  const sql = 'UPDATE users SET role = ? WHERE id = ?';
  connection.query(sql, [role, req.params.id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    } else {
      res.json({ success: true, id: +req.params.id });
    }
  });
});


app.listen(port, () => {
  console.log(`AUKOTOJU SERVERIS klauso ${port} porto.`);
});