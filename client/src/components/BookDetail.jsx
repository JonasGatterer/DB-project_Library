import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const BookDetails = () => {
  //const { id } = useParams();
  //const params = useParams();

  const params = useParams();
  const [book, setBook] = useState('');
  const navigate = useNavigate();
  //const [orderID, setOrderID] = useState(null); // State variable to hold the order ID
  const [reservationID, setReservationID] = useState(null);

  /*
  useEffect(() => {
    fetchBookDetails();
  }, [isbn]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${isbn}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };*/

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${params.id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [params.id]);

  const createOrder = async () => {
    try {
      // Create the order in the Orders table and retrieve the order ID
      const orderResponse = await axios.post('http://localhost:5000/api/createOrder', {
        rentalDate: getCurrentDate(),
        dueDate: getDueDate(),
      });
      //const createdOrderID = await orderResponse.data.orderID;
      //setOrderID(createdOrderID); // Set the order ID state variable
      //console.log(orderResponse);
      // Insert into Completes table
      await axios.post('http://localhost:5000/api/createCompletes', {
        ordersID: orderResponse.data.orderID,
        customerID: '2',
      });

      // Insert into ContainsO table
      await axios.post('http://localhost:5000/api/createContainsO', {
        ordersID: orderResponse.data.orderID,
        isbn: params.id,
      });

      alert(`The book ${params.id} was successfully ordered!`);
      navigate('/books');

    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const createReservation = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/createReservation`, {
        customerID: '2',
        isbn: params.id,
      });
      setReservationID(response.data.reservationID);

      alert(`The book ${params.id} was successfully reserved!`);
      navigate('/books');

    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDueDate = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return(
    <div>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Release Date:</strong> {book.releaseDate}</p>
          <p><strong>Edition:</strong> {book.editionN}</p>
          <button onClick={() => createOrder()}>Order Book</button>
          <button onClick={() => createReservation()}>Make a reservation</button>
    </div>
  );
  // Book details component logic and UI for the specified book ID
};

export default BookDetails;
