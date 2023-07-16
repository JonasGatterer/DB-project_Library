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

    const getDate = (newDate) => {
        const date = newDate ? new Date(newDate) : null;
    
        if(date){
          const year = date.toISOString().slice(0, 4);
          const month = date.toISOString().slice(5, 7);
          const day = date.toISOString().slice(8, 10);
          return(year + "-" + month + "-" + day);
        }else{
          console.log('Invalid date');
        }
    }

    return(
        <div>
            <h2>Delete Publications</h2>
            <table>
                <thead>
                <tr>
                    |<th>ISBN</th>
                    |<th>Title</th>
                    |<th>Release Date</th>
                    |<th>Edition</th>
                    |<th>Action</th>|
                </tr>
                </thead>
                <tbody>
                {publications.map((publication) => (
                    <tr key={publication.isbn}>
                    |<td>{publication.isbn}</td>
                    |<td>{publication.title}</td>
                    |<td>{getDate(publication.releasedate)}</td>
                    |<td>{publication.editionn}</td>
                    |<td>
                        <button onClick={() => deletePublication(publication.isbn)}>Delete</button>
                    </td>|
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default EliminateBook;