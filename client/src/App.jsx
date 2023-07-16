import React from "react";
import './App.css';
//import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from "../src/components/Login.jsx"
import Register from "../src/components/Register.jsx"
import BookList from "../src/components/BookList.jsx"
import BookDetail from "../src/components/BookDetail"
import Admin from "../src/components/Admin.jsx"
import MyCart from "../src/components/MyCart.jsx";

import EliminateBook from "../src/components/adminComponents/EliminateBook.jsx"
import CreateBook from "../src/components/adminComponents/CreateBook.jsx"
import NewOrders from "../src/components/adminComponents/NewOrders.jsx"
import GatherDeliveryInfo from "../src/components/adminComponents/GatherDeliveryInfo.jsx"
import ReservedPublications from "../src/components/adminComponents/ReservedPublications.jsx"
import DueOrder from "../src/components/adminComponents/DueOrder.jsx"

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <button><Link to="/myCart">My Cart</Link></button>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route index exact path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/books" element={<BookList/>} />
          <Route path="/book/:id" element={<BookDetail/>} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/myCart" element={<MyCart/>}/>

          <Route path="/eliminateBook" element={<EliminateBook/>}/>
          <Route path="/createBook" element={<CreateBook/>}/>
          <Route path="/newOrders" element={<NewOrders/>}/>
          <Route path="/gatherDeliveryInfo" element={<GatherDeliveryInfo/>}/>
          <Route path="/reservedPublications" element={<ReservedPublications/>}/>
          <Route path="/dueOrder" element={<DueOrder/>}/>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
