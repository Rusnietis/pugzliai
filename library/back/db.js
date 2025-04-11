const mysql = require('mysql');
const md5 = require('md5');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'library'
});


connection.connect(function(err) {
    if (err) throw err;
    console.log('Conected to the database!');
})

// Create users table

const createUsersTable = _ => {
    const sql = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        session CHAR(32) NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        role ENUM('admin', 'user', 'lib') NOT NULL DEFAULT 'user',
        password CHAR(32) NOT NULL
    )`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('Users table created or already exists!');
    });
}

// Create authors table
const createAuthorsTable = _ => {
    const sql = `CREATE TABLE IF NOT EXISTS authors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(200) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        surname VARCHAR(100) NOT NULL,
        nickname VARCHAR(100) NULL,
        born DATE NOT NULL
    )`;
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Authors table created');
    });
};

// Create books table
const createBooksTable = _ => {
    const sql = `CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(200) NOT NULL UNIQUE,
        ratings TEXT default '[]',
        rate DECIMAL(2,1) default 0,
        title VARCHAR(100) NOT NULL,
        pages INT(5) NOT NULL,
        genre VARCHAR(100) NOT NULL,
        author_id INT NOT NULL,
        FOREIGN KEY (author_id) REFERENCES authors(id)
    )`;
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Books table created');
    });
};

// Create heroes table
const createHeroesTable = _ => {
    const sql = `CREATE TABLE IF NOT EXISTS heroes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(200) NOT NULL UNIQUE,
        name VARCHAR(100) NOT NULL,
        good BOOLEAN NOT NULL DEFAULT 1,
        image VARCHAR(200) NULL,
        book_id INT NOT NULL,
        FOREIGN KEY (book_id) REFERENCES books(id)
    )`;
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Heroes table created');
    });
};

// Drop users table
const dropUsersTable = _ => {
    const sql = 'DROP TABLE IF EXISTS users';
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Users table dropped');
    });
};

// Drop authors table
const dropAuthorsTable = _ => {
    const sql = 'DROP TABLE IF EXISTS authors';
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Authors table dropped');
    });
};

// Drop books table
const dropBooksTable = _ => {
    const sql = 'DROP TABLE IF EXISTS books';
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Books table dropped');
    });
};

// Drop heroes table
const dropHeroesTable = _ => {
    const sql = 'DROP TABLE IF EXISTS heroes';
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Heroes table dropped');
    });
};

// Seed users table
const seedUsersTable = _ => {
    const sql = `INSERT INTO users (name, email, role, password) VALUES 
    ('Briedis', 'briedis@gmail.com', 'admin', '${md5('123')}'),
    ('Bebras', 'bebras@gmail.com', 'user', '${md5('123')}'),
    ('Barsukas', 'barsukas@gmail.com', 'lib', '${md5('123')}')
    `;
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Users table seeded');
    });
}

// Seed authors table
const seedAuthorsTable = _ => {
    const sql = `INSERT INTO authors (name, surname, nickname, born, url) VALUES 
    ('John', 'Tolkien', 'Tolkinas', '1892-01-03', 'john-tolkien'),
    ('Abrams', 'Rowling', NULL, '1965-07-31', 'abrams-rowling'),
    ('Stephen', 'King', NULL, '1947-09-21', 'stephen-king'),
    ('George', 'Martin', 'Georg', '1948-09-20', 'george-martin'),
    ('Kate', 'Martin','Cyborg', '1948-09-20', 'kate-martin')
    `;
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Authors table seeded');
    });
}

// Seed books table
const seedBooksTable = _ => {
    const sql = `INSERT INTO books (title, pages, genre, author_id, url) VALUES 
    ('Hobitas', 1256, 'Fantasy', 1, 'hobitas'),
    ('Harry Potter', 587, 'Fantasy', 2, 'harry-potter'),
    ('The Shining', 310, 'Horror', 3, 'the-shining'),
    ('A Game of Thrones', 562, 'Fantasy', 4, 'a-game-of-thrones'),
    ('A Clash of Kings', 865, 'Drama', 5, 'a-clash-of-kings'),
    ('A Storm of Swords', 987, 'Fantasy', 5, 'a-storm-of-swords'),
    ('A Feast for Crows', 654, 'Sci-fi', 3, 'a-feast-for-crows'),
    ('A Dance with Dragons', 789, 'Comedy', 5, 'a-dance-with-dragons'),
    ('The Winds of Winter', 1234, 'Fantasy', 2, 'the-winds-of-winter'),
    ('A Dream of Spring', 987, 'Fantasy', 5, 'a-dream-of-spring'),
    ('The Lord of the Rings', 1256, 'Sci-fi', 1, 'the-lord-of-the-rings'),
    ('The Silmarillion', 587, 'Fantasy', 4, 'the-silmarillion'),
    ('The Children of Hurin', 310, 'Drama', 2, 'the-children-of-hurin'),
    ('Unfinished Tales', 562, 'Fantasy', 1, 'unfinished-tales'),
    ('The History of Middle-earth', 865, 'Fantasy', 1, 'the-history-of-middle-earth')
    `;
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Books table seeded');
    });
}

// Seed heroes table
const seedHeroesTable = _ => {
    const sql = `INSERT INTO heroes (name, good, image, book_id, url) VALUES 
    ('Frodo Baggins', 1, 'images/01.jpg', 1, 'frodo-baggins'),
    ('Samwise Gamgee', 1, 'images/02.jpg', 15, 'samwise-gamgee'),
    ('Gandalf', 1, NULL, 1, 'gandalf'),
    ('Harry Potter', 0, 'images/03.jpg', 12, 'harry-potter'),
    ('Hermione Granger', 1, 'images/04.jpg', 12, 'hermione-granger'),
    ('Ron Weasley', 0, 'images/05.jpg', 2, 'ron-weasley'),
    ('Jack Torrance', 0, NULL, 3, 'jack-torrance'),
    ('Wendy Torrance', 1, 'images/06.jpg', 6, 'wendy-torrance'),
    ('Danny Torrance', 0, 'images/07.jpg', 3, 'danny-torrance'),
    ('Ned Stark', 1, 'images/08.jpg', 4, 'ned-stark'),
    ('Catelyn Stark', 0, 'images/09.jpg', 7, 'catelyn-stark'),
    ('Robb Stark', 1, 'images/10.jpg', 8, 'robb-stark'),
    ('Tyrion Lannister', 1, 'images/11.jpg', 5, 'tyrion-lannister'),
    ('Daenerys Targaryen', 1, 'images/12.jpg', 9, 'daenerys-targaryen'),
    ('Jon Snow', 1, 'images/13.jpg', 5, 'jon-snow'),
    ('Cersei Lannister', 0, 'images/14.jpg', 10, 'cersei-lannister'),
    ('Jaime Lannister', 0, 'images/15.jpg', 6, 'jaime-lannister')
    `;
    connection.query(sql, function(err) {
        if (err) throw err;
        console.log('Heroes table seeded');
    });
}

// Drop all tables
const dropAllTables = _ => {
    dropUsersTable();
    dropHeroesTable();
    dropBooksTable();
    dropAuthorsTable();
};

// Create all tables
const createAllTables = _ => {
    createUsersTable();
    createAuthorsTable();
    createBooksTable();
    createHeroesTable();
};

// Seed all tables
const seedAllTables = _ => {
    seedUsersTable();
    seedAuthorsTable();
    seedBooksTable();
    seedHeroesTable();
};

dropAllTables();
createAllTables();

connection.end();