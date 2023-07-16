import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyCart = () => {
    const [reservations, setReservations] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchReservations();
        fetchOrders();
    }, []);
    
    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getReservations', {
                params: { customerID: '5' } // Replace '2' with the appropriate customerID
            });
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };
    
    const fetchOrders = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/getOrders', {
                params: { customerID: '5' } // Replace '2' with the appropriate customerID
            });
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const customerID = '5';

    const deleteReservation = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/deleteReservation/${customerID}`);
            fetchReservations(); // Refresh the reservations list after deletion
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };
    
    const deleteOrder = async (ordersIDD) => {
        try {
            const ordersID = ordersIDD;
            await axios.delete(`http://localhost:5000/api/deleteOrder/${ordersID}`);
            fetchOrders(); // Refresh the orders list after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
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
/*
    <ul>
                {reservations.map((reservation) => (
                <li key={reservation.reservationID}>
                    ISBN: {reservation.isbn} | Reservation Date: {reservation.reservationDate} | Queue Number: {reservation.queueN}
                </li>
                ))}
            </ul>*/
    
    return(
        <div>
            <h2>Cart</h2>
            <h3>Reservations:</h3>
            <table>
                <tr>
                    |<th>ISBN</th>
                    |<th>Title</th>
                    |<th>Queue number</th>
                    |<th>Reservation Date</th>
                    |<th>    </th>|
                </tr>
                {reservations.map((reservation) => (
                    <tr key={reservation.isbn}>
                        |<td>{reservation.isbn}</td>
                        |<td>{reservation.title}</td>
                        |<td>{reservation.queuen}</td>
                        |<td>{getDate(reservation.reservationdate)}</td>
                        |<td>
                            <button onClick={() => deleteReservation()}>Delete</button>
                        </td>|
                    </tr>
                ))}
            </table>
            <br />
            <br />
            <h3>Your Orders:</h3>
            <table>
                <tr>
                    |<th>ISBN</th>
                    |<th>Title</th>
                    |<th>Rental Date</th>
                    |<th>Due Date</th>
                    |<th>   </th>|
                </tr>
                    {orders.map((order) => (
                        <tr key={order.isbn}>
                            |<td>{order.isbn}</td>
                            |<td>{order.title}</td>
                            |<td>{getDate(order.rentaldate)}</td>
                            |<td>{getDate(order.duedate)}</td>
                            |<td>
                                <button onClick={() => deleteOrder(order.ordersid)}>Delete</button>
                            </td>|
                        </tr>
                    ))}
            </table>
        </div>
    )
}

export default MyCart;