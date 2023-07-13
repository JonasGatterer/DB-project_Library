import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  //const { id } = useParams();
  const params = useParams();
  return(
    <div>
      <p>BookDetail page</p>
      <p>Detail of book: {params.id}</p>
    </div>
  );
  // Book details component logic and UI for the specified book ID
};

export default BookDetails;
