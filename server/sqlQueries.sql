-- 1. Register new Customer and create Access Card for them with all information.
--      Please, see the application at

-- 2. Check that information of new Order of Customer are correct and send confirmation email.
SELECT Orders.ordersID, Orders.rentalDate, Orders.dueDate, ContainsO.isbn, Completes.customerID
FROM Completes JOIN Orders  ON Orders.ordersID = Completes.ordersID
	JOIN ContainsO ON Orders.ordersID = ContainsO.ordersID
WHERE Orders.ordersID LIKE "%$input%" OR Completes.customerID LIKE "%$input%"

-- 3. Gather all Delivery information and send it to Delivery company.
SELECT Delivery.ordersID, Delivery.streetA, Delivery.cityA, Delivery.zipA, Delivery.country, Delivery.nameL, Delivery.streetL, Delivery.cityL, Delivery.zipL
FROM Delivery
WHERE Delivery.ordersID LIKE "%$input%"

-- 4. Check the most reserved Publications to order new copies of those Publications.
SELECT Publication.isbn, Publication.title, COUNT(*) AS reservation_count
FROM Publication INNER JOIN Reservation ON Publication.isbn = Reservation.isbn
GROUP BY Publication.isbn, Publication.title
ORDER BY reservation_count DESC;

-- 5. Check all orders which have passed the Due Date and the Publications that have not yet returned.
SELECT Orders.ordersID, Orders.rentalDate, Orders.dueDate, ReturnedOrders.returnDate, ContainsO.isbn
FROM Orders JOIN ContainsO ON Orders.ordersID = ContainsO.ordersID
	LEFT JOIN ReturnedOrders ON Orders.ordersID = ReturnedOrders.ordersID
WHERE Orders.dueDate < CURDATE() AND ReturnedOrders.ordersID IS NULL;