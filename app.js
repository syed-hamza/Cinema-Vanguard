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
    database: 'cinema'
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

app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.get(/^\/movies(?:\/(\w+))?$/, (req, res) => {
    const name = req.params[0] || null; // Default value if "name" is not provided
    res.render('movies', { name });
  });
  app.get(/^\/companies(?:\/(\w+))?$/, (req, res) => {
    const name = req.params[0] || null; // Default value if "name" is not provided
    res.render('companies', { name });
  });
app.get(/^\/actors(?:\/(\w+))?$/, (req, res) => {
    const name = req.params[0] || null;
    res.render('actors',{name});
});
app.get(/^\/directors(?:\/(\w+))?$/, (req, res) => {
    const name = req.params[0] || null;
    res.render('directors',{name});
});
app.get(/^\/books(?:\/(\w+))?$/, (req, res) => {
    const name = req.params[0] || null;
    res.render('books',{name});
});
app.get(/^\/writers(?:\/(\w+))?$/, (req, res) => {
    const name = req.params[0] || null;
    res.render('writers',{name});
});
app.get('/movie/:name', (req, res) => {
    const name = req.params.name;
    res.render('movie',{name});
});
app.get('/actor/:id', (req, res) => {
    const id = req.params.id;
    res.render('actor',{id});
});
app.get('/director/:id', (req, res) => {
    const id = req.params.id;
    res.render('director',{id});
});
app.get('/writer/:id', (req, res) => {
    const id = req.params.id;
    res.render('writer',{id});
});

app.get('/update/:name', (req, res) => {
    const name = req.params.name;
    res.render('update',{name});
});

//sql
//movie details
app.get('/sqlgetmovie/:moviename', (req, res) => {
    const moviename = req.params.moviename;
    const query = `SELECT * FROM movie WHERE title = '${moviename}'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});
// movie search
app.get('/sqlmovies/:moviename?', (req, res) => {
    const moviename = req.params.moviename|| '';
    query = `SELECT * FROM movie WHERE title like '%${moviename}%'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});
app.get('/sqlbooks/:bookname?', (req, res) => {
    const bookname = req.params.bookname|| '';
    query = `SELECT * FROM book WHERE b_name like '%${bookname}%'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});
//actor search
app.get('/sqlactors/:actorname?', (req, res) => {
    const actorname = req.params.actorname|| '';
    query = `SELECT * FROM actor WHERE f_name like '%${actorname}%' or l_name like '%${actorname}%'`;   
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});
//director search
app.get('/sqldirectors/:directorname?', (req, res) => {
    const directorname = req.params.directorname|| '';
    query = `SELECT * FROM director WHERE f_name like '%${directorname}%' or l_name like '%${directorname}%'`;   
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});
//writers search
app.get('/sqlwriters/:writername?', (req, res) => {
    const writername = req.params.writername|| '';
    query = `SELECT * FROM writer WHERE f_name like '%${writername}%' or l_name like '%${writername}%'`;   
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});

//actor details
app.get('/sqlgetactor/:actorid', (req, res) => {
    const actorid = req.params.actorid;
    const query = `SELECT * FROM actor WHERE actor_id = '${actorid}'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});
app.get('/sqlimages/:id', (req, res) => {
    const id = req.params.id;
    query = `SELECT * FROM image_list WHERE id = '${id}'`;  // Use placeholders instead of string interpolation   
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});
app.get('/sqlblob/:path', (req, res) => {
    const path = req.params.path;
    query = `SELECT * FROM images WHERE id = '${path}'`;  // Use placeholders instead of string interpolation   
    connection.query(query, (err, results) =>{
        if (err) {
          console.error('Error fetching data from the database:', err);
          res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
          if (results.length > 0) {
            const imageData = results[0].image;
            // Sending image data as response
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(imageData, 'binary');
          } else {
            res.status(404).json({ error: 'Image not found' });
          }
        }
      });
    });
app.get('/sqlquery/:query', (req, res) => {
    const query = req.params.query;// Use placeholders instead of string interpolation   
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).json({ error: 'Error fetching data from the database' });
        } else {
            res.json(results);
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});