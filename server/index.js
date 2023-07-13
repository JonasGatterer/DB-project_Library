const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js")

//start server with "nodemon index" in server folder
//start svelte app with "npm start" in client folder

//middleware
app.use(cors());
app.use(express.json());

//routes
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
