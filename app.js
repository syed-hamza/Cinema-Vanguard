//by bubu
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const mysql = require('mysql'); 
const app = express();
const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Regal@301',
    database: 'test'
});
// Configure Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('views'));
// Serve static files (e.g., CSS, JavaScript, images) from a 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/movies', (req, res) => {
    res.render('movies');
});
app.get('/actors', (req, res) => {
    res.render('actors');
});

app.get('/movie/:name', (req, res) => {
    const name = req.params.name;
    res.render('movie',{name});
});

//sql
app.get('/sqlmovies', (req, res) => {
    const query = 'SELECT name FROM movie';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            const names = results.map(result => result.name);
            res.json(names);
        }
    });
});
app.get('/sqlgetmovie/:moviename', (req, res) => {
    const moviename = req.params.moviename;
    const query = `SELECT * FROM movie WHERE name = '${moviename}'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});

app.get('/sqlactors', (req, res) => {
    const query = 'SELECT name FROM actor';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            const names = results.map(result => result.name);
            res.json(names);
        }
    });
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});