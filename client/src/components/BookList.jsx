import React, { useEffect, useState } from 'react';
import {Link } from "react-router-dom";
import axios from 'axios';

const BookList = () => {
  const [publications, setPublications] = useState([]);

    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
        const response = await axios.get('http://localhost:5000/api/getPublications');
        setPublications(response.data);
        } catch (error) {
        console.error('Error fetching publications:', error);
        }
    };

  // booksData.js
  //old book list:
  /*
const list = [
  {id: 1, name: 'Book 1', description: 'Description of Book 1'},
  {id: 2, name: 'Book 2', description: 'Description of Book 2'},
  {id: 3, name: 'Book 3', description: 'Description of Book 3'},
  {id: 4, name: 'Book 4', description: 'Description of Book 4'},
  {id: 5, name: 'Book 5', description: 'Description of Book 5'},
];
*/

  //old logic:
  /*
  <div>
      <h2>Book List:</h2>
      {list.map((book) => (
        <div key={book.id}>
          <br></br>
          <Link to={`/book/${book.id}`}><h4>{book.name}</h4></Link>
          <p>{book.description}</p>
          <hr/>
        </div>
  </div>
  */

  // Book list component logic and UI
  return(
      <div>
          <h2>Publication List</h2>
          <table>
              <thead>
              <tr>
                  <th>ISBN</th>
                  <th>Title</th>
                  <th>Release Date</th>
                  <th>Edition</th>
                  <th>Action</th>
                  <th>Go to</th>
              </tr>
              </thead>
              <tbody>
              {publications.map((publication) => (
                  <tr key={publication.isbn}>
                  <td>{publication.isbn}</td>
                  <td>{publication.title}</td>
                  <td>{publication.releaseDate}</td>
                  <td>{publication.editionN}</td>
                  <td><Link to={`/book/${publication.isbn}`}>{publication.title}</Link></td>
                  {/*<td>
                      <button onClick={() => deletePublication(publication.isbn)}>Delete</button>
                  </td>*/}
                  </tr>
              ))}
                </tbody>
            </table>
      </div>
  );
};

export default BookList;
