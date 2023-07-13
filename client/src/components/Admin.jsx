import React from "react";
import {Link} from 'react-router-dom';

const Admin = () => {
    /*do we need a site for "check quantity"?*/

    return(
        <div>
            <div>Admin page</div>
            <ul>
                <li>eliminate <Link to="/eliminateBook"><button type="submit">Eliminate books</button></Link></li>
                <li>create <Link to="/createBook"><button type="submit">Create books</button></Link></li>
                <li>check quantity</li>
                <li>Check that information of new Order of Customer are correct and send a confirmation email.<Link to="/newOrders"><button type="submit">Check orders</button></Link></li>
                <li>Gather all Delivery information and send it to Delivery company.<Link to="/gatherDeliveryInfo"><button type="submit">Gather delivery info</button></Link></li>
                <li>Check the most reserved Publications to order new copies of those Publications.<Link to="/reservedPublications"><button type="submit">Most reserved publications</button></Link></li>
                <li>Check all orders which have passed the Due Date and the Publications that have not yet returned.<Link to="/dueOrder"><button type="submit">Due orders</button></Link></li>
            </ul>
        </div>
    );
};

export default Admin;