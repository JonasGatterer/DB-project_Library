import React from 'react';
import {Link } from "react-router-dom";

const BookList = () => {
  // booksData.js
const list = [
  {id: 1, name: 'Book 1', description: 'Description of Book 1'},
  {id: 2, name: 'Book 2', description: 'Description of Book 2'},
  {id: 3, name: 'Book 3', description: 'Description of Book 3'},
  {id: 4, name: 'Book 4', description: 'Description of Book 4'},
  {id: 5, name: 'Book 5', description: 'Description of Book 5'},
];

  // Book list component logic and UI
  return(
    <div>
      <h2>Book List:</h2>
      {list.map((book) => (
        <div key={book.id}>
          <br></br>
          <Link to={`/book/${book.id}`}><h4>{book.name}</h4></Link>
          <p>{book.description}</p>
          <hr/>
        </div>
      ))}
    </div>
  );
};

export default BookList;
