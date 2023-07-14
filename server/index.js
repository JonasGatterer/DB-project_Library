const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js")

//start server with "nodemon index" in server folder
//start app with "npm start" in client folder

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post('/api/newBook', async (req, res) => {
    try {
        const { isbn, title, releaseDate, editionN, format, crn } = req.body;
        const newBookResult = await pool.query(
            'INSERT INTO Publication (isbn, title, releaseDate, editionN, format, crn) VALUES ($1, $2, $3, $4, $5, $6)',
            [isbn, title, releaseDate, editionN, format, crn]
        );
  
        res.sendStatus(201); // Send HTTP status code 201 (Created) to indicate successful creation
    } catch (error) {
        console.error('Error creating new book:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});
  
// Endpoint to create a new genre association for a book
app.post('/api/hasGenre', async (req, res) => {
    try {
        const { nameG, isbn } = req.body;
        const hasGenreResults = await pool.query('INSERT INTO HasGenre (nameG, isbn) VALUES ($1, $2)', [nameG, isbn]);
  
        res.sendStatus(201); // Send HTTP status code 201 (Created) to indicate successful creation
    } catch (error) {
        console.error('Error creating genre association:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});
  
// Endpoint to create a new author
app.post('/api/newAuthor', async (req, res) => {
    try {
        const { nameA, lastNameA, birthDateA } = req.body;
        const authorResults = await pool.query('INSERT INTO Author (nameA, lastNameA, birthDateA) VALUES ($1, $2, $3)', [nameA, lastNameA, birthDateA]);
        res.sendStatus(201); // Send HTTP status code 201 (Created) to indicate successful creation
    } catch (error) {
        console.error('Error creating new author:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});
  
// Endpoint to create a new author association for a book
app.post('/api/hasAuthor', async (req, res) => {
    try {
        const { isbn, nameA, lastNameA, birthDateA } = req.body;
        const hasAuthorResults = await pool.query('INSERT INTO HasAuthor (nameA, lastNameA, birthDateA, isbn) VALUES ($1, $2, $3, $4)', [nameA, lastNameA, birthDateA, isbn]);
        res.sendStatus(201); // Send HTTP status code 201 (Created) to indicate successful creation
    } catch (error) {
        console.error('Error creating author association:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});
  
// Endpoint to create a new store
app.post('/api/stores', async (req, res) => {
    try {
        const { nameL, streetL, cityL, zipL, isbn, quantity } = req.body;
        const storesResults = await pool.query('INSERT INTO Stores (nameL, streetL, cityL, zipL, isbn, quantity) VALUES ($1, $2, $3, $4, $5, $6)', [nameL, streetL, cityL, zipL, isbn, quantity]);
        res.sendStatus(201); // Send HTTP status code 201 (Created) to indicate successful creation
    } catch (error) {
        console.error('Error creating new store:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});

// Endpoint login
app.post('/api/login', async (req, res) => {
    try {
        const { ssn, accessCardID } = req.body;
        const loginResult = await pool.query("SELECT * FROM Person p JOIN AccessCard ac ON p.ssn = ac.ssn WHERE p.ssn = $1 AND ac.accessCardID = $2",
        [ssn, accessCardID]);
  
      // Check if the query returned any results
      if (loginResult.rows.length === 1) {
        // Authentication successful
        res.status(200).json({ message: 'Authentication successful' });
      } else {
        // Authentication failed
        res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Endpoint person
app.post('api/persons', async (req, res) => {
    try {
      const { ssn, firstName, lastName, middleName, birthDate, email, phoneNumber, street, city, zip, country } = req.body;
      const newPerson = await pool.query("INSERT INTO Person (ssn, firstName, lastName, middleName, birthDate, email, phoneNumber, streetA, cityA, zipA, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [ssn, firstName, lastName, middleName, birthDate, email, phoneNumber, street, city, zip, country]);
      res.status(201).json({ message: 'Person created successfully' });

    } catch (error) {
      console.error('Error creating person:', error);
      res.status(500).json({ error: 'Failed to create person' });
    }
});
  
// Endpoint access card
app.post('api/access-cards', async (req, res) => {
    try {
        const { accessCardID, issueDate, expiringDate, fineBalance } = req.body;
        const newAccessCard = await pool.query("INSERT INTO AccessCard (accessCardID, issueDate, expiringDate, fineBalance) VALUES ($1, $2, $3, $4)",
        [accessCardID, issueDate, expiringDate, fineBalance]);
        res.status(201).json({ message: 'Access card created successfully' });
    } catch (error) {
      console.error('Error creating access card:', error);
      res.status(500).json({ error: 'Failed to create access card' });
    }
});


//EXAMPLE of insert
app.post("/todos", async(req, res) => {
    try{
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo(description) VALUES ($1)",
        [description]);
        //add "RETURNING *" to return all the inserted things immediately
        
        res.json(newTodo)
    } catch (err) {
        console.error(err.message);
    }
})
//EXAMPLE of get
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message)
    }
})
//EXAMPLE of getting a specific todo
app.get("/todos/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const {todo} = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        
        res.json(todo.rows)
    } catch (err) {
        console.error(err.message)
    }
})
//EXAMPLE update ??? do we need this ???
//EXAMPLE delete ??? do we need this ???

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});
