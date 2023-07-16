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
// Endpoint to Delete a reservation
app.delete('/api/deleteReservation/:customerID', async (req, res) => {
    try {
        const { customerID } = req.params;
        await pool.query('DELETE FROM Reservation WHERE customerID = $1', [customerID]);
        res.sendStatus(200); // Send HTTP status code 200 (OK) if the deletion is successful
    } catch (error) {
        console.error('Error deleting reservation:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});
  
// Endpoint to Delete an order
app.delete('/api/deleteOrder/:ordersID', async (req, res) => {
    try {
        const { ordersID } = req.params;
        await pool.query('DELETE FROM Orders WHERE ordersID = $1', [ordersID]);
        res.sendStatus(200); // Send HTTP status code 200 (OK) if the deletion is successful
    } catch (error) {
        console.error('Error deleting order:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});

// Endpoint of getting the stores items
app.post('/api/getStores', async (req, res) => {
    try {
        const { isbn } = req.body;
        const result = await pool.query('SELECT quantity, nameL, streetL, cityL, zipL FROM Stores WHERE isbn = $1', [isbn]);
        if (result.rows.length === 0) {
          return res.sendStatus(404); // Send HTTP status code 404 (Not Found) if the book is not found in the stores
        }
        res.json(result.rows[0]); // Send the retrieved quantity as JSON response
    } catch (error) {
        console.error('Error fetching store details:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});

// Endpont of getting all reservations
app.get('/api/getReservations', async (req, res) => {
    try {
        const { customerID } = req.query;
        const result = await pool.query(
            'SELECT p.isbn, p.title, r.queuen, r.reservationdate FROM Reservation r JOIN Publication p ON r.isbn = p.isbn WHERE customerID = $1',
            [customerID]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});

//Endpoint of getting all orders
app.get('/api/getOrders', async (req, res) => {
    try {
        const { customerID } = req.query;
        const result = await pool.query(
            `SELECT o.ordersID, o.rentalDate, o.dueDate, p.title, p.isbn
            FROM Orders o
            INNER JOIN ContainsO co ON o.ordersID = co.ordersID
            INNER JOIN Publication p ON co.isbn = p.isbn
            INNER JOIN Completes cm ON cm.customerID = $1
            WHERE cm.ordersID = co.ordersID`,
            [customerID]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});

// Endpoint to create a reservation
app.post('/api/createReservation', async (req, res) => {
    try {
      //const isbn = req.params.isbn;
        const { customerID, isbn } = req.body;
        const existingReservations = await pool.query(
            'SELECT COUNT(*) AS count FROM Reservation WHERE isbn = $1',
            [isbn]
        );
        const count = Number(existingReservations.rows[0].count); // Convert count to a number
        const queueN = count + 1;
        //const queueN = existingReservations.rows[0].count + 1;
        //console.log(queueN);
        //console.log(existingReservations.rows[0].count);
  
        const reservationResult = await pool.query(
            'INSERT INTO Reservation (reservationDate, queueN, customerID, isbn) VALUES (CURRENT_DATE, $1, $2, $3) RETURNING reservationID',
            [queueN, customerID, isbn]
        );
        const reservationID = reservationResult.rows[0].reservationid;
        res.json({ reservationID });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.sendStatus(500);
    }
});

// Endpoint to create an order
app.post('/api/createOrder', async (req, res) => {
    try {
        const { rentalDate, dueDate } = req.body;
        const orderResult = await pool.query(
            'INSERT INTO Orders (rentalDate, dueDate) VALUES ($1, $2) RETURNING ordersID',
            [rentalDate, dueDate]
        );
        const orderID = orderResult.rows[0].ordersid;
        res.json({ orderID });
    } catch (error) {
        console.error('Error creating order:', error);
        res.sendStatus(500);
    }
});
  
// Entpoint to complete an order
app.post('/api/createCompletes', async (req, res) => {
    try {
        const { ordersID, customerID } = req.body;
        await pool.query('INSERT INTO Completes (ordersID, customerID) VALUES ($1, $2)', [ordersID, customerID]);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error completing order:', error);
        res.sendStatus(500);
    }
});
  
  // Endpoint to contain an order
app.post('/api/createContainsO', async (req, res) => {
    try {
        const { ordersID, isbn } = req.body;
        await pool.query('INSERT INTO ContainsO (ordersID, isbn) VALUES ($1, $2)', [ordersID, isbn]);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error containing order:', error);
        res.sendStatus(500);
    }
});

// Endpoint to fetch the details of a single book by ISBN
app.get('/api/books/:isbn', async (req, res) => {
    try {
        const isbn = req.params.isbn;
        const result = await pool.query('SELECT isbn, title, releaseDate, editionN FROM Publication WHERE isbn = $1', [isbn]);
        if (result.rows.length === 0) {
            return res.sendStatus(404); // Send HTTP status code 404 (Not Found) if the book is not found
        }
        res.json(result.rows[0]); // Send the retrieved book details as JSON response
    } catch (error) {
        console.error('Error fetching book details:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});

// Endpoint to fetch all publications
app.get('/api/getPublications', async (req, res) => {
    try {
        const result = await pool.query('SELECT isbn, title, releaseDate, editionN FROM Publication');
        res.json(result.rows); // Send the retrieved publications as JSON response
    } catch (error) {
        console.error('Error fetching publications:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});
  
// Endpoint to delete a publication by ISBN
app.delete('/api/deletePublication/:isbn', async (req, res) => {
    try {
        const { isbn } = req.params;
        await pool.query('DELETE FROM Publication WHERE isbn = $1', [isbn]);
        res.sendStatus(204); // Send HTTP status code 204 (No Content) to indicate successful deletion
    } catch (error) {
        console.error('Error deleting publication:', error);
        res.sendStatus(500); // Send HTTP status code 500 (Internal Server Error) for error handling
    }
});

//Endpoint to create a new book
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
        const loginResult = await pool.query("SELECT * FROM Customer WHERE ssn = $1 AND accessCardID = $2",
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
app.post('/api/persons', async (req, res) => {
    try {
      const { ssn, firstName, lastName, birthDate, email, phoneNumber, streetA, cityA, zipA, country } = req.body;
      const newPerson = await pool.query("INSERT INTO Person (ssn, firstName, lastName, birthDate, email, phoneNumber, streetA, cityA, zipA, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [ssn, firstName, lastName, birthDate, email, phoneNumber, streetA, cityA, zipA, country]);
      res.status(201).json({ message: 'Person created successfully' });

    } catch (error) {
      console.error('Error creating person:', error);
      res.status(500).json({ error: 'Failed to create person' });
    }
});
  
// Endpoint access card
app.post('/api/access-cards', async (req, res) => {
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

// Endpoint customer
app.post('/api/customer', async (req, res) => {
    try {
        const {accessCardID, ssn} = req.body
        const newCustomer = await pool.query("INSERT INTO Customer (accessCardID, ssn) VALUES ($1, $2)",
        [accessCardID, ssn]);
        res.status(201).json({ message: 'Customer created successfully'});
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
})


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
