const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const fs = require('fs');
const md5 = require('md5');
const { v4: uuidv4 } = require('uuid');
const { error } = require('console');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'donations'
})
const app = express();
const port = 3001;

//const port = 80;

// app.use(cors(
//   {
//     origin: 'http://localhost:3000',
//     credentials: true,
//   }
// ));
app.use(cors());
//app.use(cookieParser());
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

// const checkUserIsAuthorized = (user, res, roles) => {
//   if (user && roles.includes(user.role)) {
//     return true;
//   } else if (user && roles.includes('self:' + user.id)) {
//     return true;
//   } else if (user) {
//     res.status(401).json({
//       message: 'Not authorized',
//       type: 'role'
//     });
//   } else {
//     res.status(401).json({
//       message: 'Not logged in',
//       type: 'login'
//     });
//   }
// }

// const doAuth = (req, res, next) => {
//   const token = req.cookies.libSession || '';

//   //console.log('token', token)
//   if (token === '') {
//     return next();
//   }
//   const sql = `
//     SELECT name, id, role
//     FROM users
//     WHERE session = ?
//   `;
//   connection.query(sql, [token], (err, results) => {
//     if (err) {
//       res.status(500).json({ message: 'Server error On Auth' });
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
})

app.get("/stories", (req, res) => {
  const sql = `
  SELECT s.id, s.writer_id, s.title, s.short_description, s.story, s.goal, s.image, s.status, s.collected
  FROM stories s
  LEFT JOIN writers w ON s.writer_id = w.id
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
  const sql = `INSERT INTO donors (name, amount, story_id, date) VALUES (?, ?, ?, ?)`;

  connection.query(sql, [name, amount, story_id, date], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Klaida įrašant donorą', error: err });
    }

    const donorId = results.insertId;

    const sql2 = `UPDATE stories SET collected = IFNULL(collected, 0) + ? WHERE id = ?`;
    connection.query(sql2, [amount, story_id], (err2) => {
      if (err2) {
        return res.status(500).json({ message: 'Klaida atnaujinant stories', error: err2 });
      }

      // ✅ FRONTUI GRAŽINAME PILNĄ OBJEKTĄ
      res.json({
        id: donorId,
        name,
        amount,
        story_id,
        date
      });
    });
  });
});



app.listen(port, () => {
  console.log(`AUKOTOJU SERVERIS klauso ${port} porto.`);
});