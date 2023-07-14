-- 1. Register new Customer and create Access Card for them with all information.
--      Please, see the application at

-- 2. Check that information of new Order of Customer are correct and send confirmation email.
SELECT ordersID, rentalDate, dueDate, isbn, customerID
FROM Customer Cu JOIN Completes Com ON Cu.customerID = Com.customerID
    JOIN Orders O ON O.ordersID = Com.ordersID
    AND
    Publication P JOIN ContainsO CO ON P.isbn = CO.isbn
    JOIN O ON O.ordersID = CO.ordersID
WHERE 

-- 3. Gather all Delivery information and send it to Delivery company.

-- 4. Check the most reserved Publications to order new copies of those Publications.

-- 5. Check all orders which have passed the Due Date and the Publications that have not yet returned.