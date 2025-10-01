const mysql = require('mysql');
const md5 = require('md5');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'donations'
});


connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the database!');
});


// Create users table
const createWritersTable = _ => {
    const sql = `CREATE TABLE IF NOT EXISTS writers (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  surname VARCHAR(100) NOT NULL,
  created_at DATE NOT NULL
)`;
    connection.query(sql, function (err) {
        if (err) throw err;
        console.log('Writers table created');
    });
};

const createStoriesTable = _ => {
    const sql = `CREATE TABLE IF NOT EXISTS stories (
    id CHAR(36) PRIMARY KEY,
  writer_id CHAR(36) NOT NULL,
  title VARCHAR(200) NOT NULL,
  short_description VARCHAR(255),   -- 👈 čia trumpas aprašymas
  story TEXT NOT NULL,
  goal DECIMAL(10,2),
  image TEXT,
  FOREIGN KEY (writer_id) REFERENCES writers(id) ON DELETE CASCADE
 
)`;
    connection.query(sql, function (err) {
        if (err) throw err;
        console.log('Stories table created');
    });
};


// // Create authors table
// const createAuthorsTable = _ => {
//     const sql = `CREATE TABLE IF NOT EXISTS authors (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         url VARCHAR(200) NOT NULL UNIQUE,
//         name VARCHAR(100) NOT NULL,
//         surname VARCHAR(100) NOT NULL,
//         nickname VARCHAR(100) NULL,
//         born DATE NOT NULL
//     )`;
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Authors table created');
//     });
// };

// // Create books table
// const createBooksTable = _ => {
//     const sql = `CREATE TABLE IF NOT EXISTS books (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         url VARCHAR(200) NOT NULL UNIQUE,
//         ratings TEXT default '[]',
//         rate DECIMAL(2,1) default 0,
//         title VARCHAR(100) NOT NULL,
//         pages INT(5) NOT NULL,
//         genre VARCHAR(100) NOT NULL,
//         author_id INT NOT NULL,
//         FOREIGN KEY (author_id) REFERENCES authors(id)
//     )`;
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Books table created');
//     });
// };

// // Create heroes table
// const createHeroesTable = _ => {
//     const sql = `CREATE TABLE IF NOT EXISTS heroes (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         url VARCHAR(200) NOT NULL UNIQUE,
//         name VARCHAR(100) NOT NULL,
//         good BOOLEAN NOT NULL DEFAULT 1,
//         image VARCHAR(200) NULL,
//         book_id INT NOT NULL,
//         FOREIGN KEY (book_id) REFERENCES books(id)
//     )`;
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Heroes table created');
//     });
// };

// // Drop users table
// const dropUsersTable = _ => {
//     const sql = 'DROP TABLE IF EXISTS users';
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Users table dropped');
//     });
// };

// // Drop authors table
// const dropAuthorsTable = _ => {
//     const sql = 'DROP TABLE IF EXISTS authors';
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Authors table dropped');
//     });
// };

// // Drop books table
// const dropBooksTable = _ => {
//     const sql = 'DROP TABLE IF EXISTS books';
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Books table dropped');
//     });
// };

// // Drop heroes table
// const dropHeroesTable = _ => {
//     const sql = 'DROP TABLE IF EXISTS heroes';
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Heroes table dropped');
//     });
// };

// // Seed users table
// const seedUsersTable = _ => {
//     const sql = `INSERT INTO users (name, email, role, password) VALUES 
//     ('Briedis', 'briedis@gmail.com', 'admin', '${md5('123')}'),
//     ('Bebras', 'bebras@gmail.com', 'user', '${md5('123')}'),
//     ('Barsukas', 'barsukas@gmail.com', 'lib', '${md5('123')}')
//     `;
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Users table seeded');
//     });
// }

// // Seed authors table
// const seedAuthorsTable = _ => {
//     const sql = `INSERT INTO authors (name, surname, nickname, born, url) VALUES 
//     ('Jadzelel', 'Vladze', 'Jadzike', '2025-02-12', 'jadzele1-vladze'),
//     ('Jonas', 'Plonytis', 'Klevelis', '2020-01-01', 'jonas-plonytis'),
//     ('Zose', 'Zosyte', 'Zuzi', '2022-05-02', 'zose-zosyte'),
//     ('Petras', 'Petraitis', 'Piete', '2025-03-04', 'petras-petraitis')
//     `;
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Authors table seeded');
//     });
// }

// // Seed books table
// const seedBooksTable = _ => {
//     const sql = `INSERT INTO books (title, pages, genre, author_id, url) VALUES 
//     ('Vandenynai', 555, 'Pažintine', 1, 'vandenynai'),
//     ('Jura', 133, 'Moksline', 2, 'jura'),
//     ('Bedugne', 133, 'Tragedija', 3, 'bedugne'),
//     ('Upes', 444, 'Pažintine', 4, 'upe')
//     `;
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Books table seeded');
//     });
// }

// // Seed heroes table
// const seedHeroesTable = _ => {
//     const sql = `INSERT INTO heroes (name, good, image, book_id, url) VALUES 
//     ('Ryklys', 0, 'images/a09b89024a837b1e4aac714409d72aad.png', 1, 'ryklys'),
//     ('Delfinas', 1, 'images/71f5161ab55642fa37dbc92647d90333.jpg', 2, 'delfinas'),
//     ('Bebras', 1, 'images/a6c746932f16a39dd7ca8241dc9cdff3.png', 3, 'bebras'),
//     ('Barsukas', 0, 'images/b79adbc296fe6fe4bda35eae4b7d99a5.jpg', 4, 'barsukas'),
//     ('Briedis', 1, 'images/6b1aba3424e1f7396cb4f7c438383bdc.jpg', 2, 'briedis'),
//     ('Dobby', 1, 'images/65572fc2b95f3f925898def6b3095a98.jpg', 2, 'dobby')
//     `;
//     connection.query(sql, function (err) {
//         if (err) throw err;
//         console.log('Heroes table seeded');
//     });
// }

// // Drop all tables
// const dropAllTables = _ => {
//     dropUsersTable();
//     dropHeroesTable();
//     dropBooksTable();
//     dropAuthorsTable();
// };

// //Create all tables
// const createAllTables = _ => {
//     createUsersTable();
//     createAuthorsTable();
//     createBooksTable();
//     createHeroesTable();
// };

// // Seed all tables
// const seedAllTables = _ => {
//     seedUsersTable();
//     seedAuthorsTable();
//     seedBooksTable();
//     seedHeroesTable();
// };


// dropAllTables();
//createAllTables();
// seedAllTables();
createWritersTable();
createStoriesTable();


connection.end();