import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EliminateBook = () => {
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

    const deletePublication = async (isbn) => {
        try {
          await axios.delete(`http://localhost:5000/api/deletePublication/${isbn}`);
          fetchPublications();
        } catch (error) {
          console.error('Error deleting publication:', error);
        }
    };

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
                </tr>
                </thead>
                <tbody>
                {publications.map((publication) => (
                    <tr key={publication.isbn}>
                    <td>{publication.isbn}</td>
                    <td>{publication.title}</td>
                    <td>{publication.releaseDate}</td>
                    <td>{publication.editionN}</td>
                    <td>
                        <button onClick={() => deletePublication(publication.isbn)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default EliminateBook;