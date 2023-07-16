import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const BookDetails = () => {
  //const { id } = useParams();
  //const params = useParams();

  const params = useParams();
  const [book, setBook] = useState('');
  const [stores, setStores] = useState('');
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

    const fetchStoreDetails = async () => {
      try {
        const storesResponse = await axios.post(`http://localhost:5000/api/getStores`, {
          isbn: params.id,
        });
        setStores(storesResponse.data);
      } catch (error) {
        console.error('Error fetching store details:', error);
      }
    }
    fetchStoreDetails();
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
        customerID: '5',
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
      const storesResponse = await axios.post(`http://localhost:5000/api/getStores`, {
        isbn: params.id,
      });
      const numberOfPublications = storesResponse.data.quantity;
      const numOfPub = parseInt(numberOfPublications, 10);

      if (numOfPub > 0) {
        alert('Reservation is only possible if there are no copies of the given Publication left!');
        return;
      }


      const response = await axios.post(`http://localhost:5000/api/createReservation`, {
        customerID: '5',
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
          <p><strong>ISBN: </strong> {book.isbn}</p>
          <p><strong>Title: </strong> {book.title}</p>
          <p><strong>Release Date: </strong> {getDate(book.releasedate)}</p>
          <p><strong>Edition: </strong> {book.editionn}</p>
          <p><strong>Store location: </strong>{stores.namel}, {stores.streetl}, {stores.cityl}, {stores.zipl}</p>
          <p><strong>Quantity: </strong>{stores.quantity}</p>
          <button onClick={() => createOrder()}>Order Book</button>
          <button onClick={() => createReservation()}>Make a reservation</button>
    </div>
  );
  // Book details component logic and UI for the specified book ID
};

export default BookDetails;
