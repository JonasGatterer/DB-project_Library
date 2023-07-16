INSERT INTO Genre (nameG) Values('Novel');
INSERT INTO Genre (nameG) Values('Fantasy');
INSERT INTO Genre (nameG) Values('Other');


INSERT INTO TypeP (format, accessMethod) Values('Book', FALSE);
INSERT INTO TypeP (format, accessMethod) Values('Science Paper', FALSE);
INSERT INTO TypeP (format, accessMethod) Values('E-Book', TRUE);


INSERT INTO Publisher (crn, nameP) Values('1', 'Bloomsbury');
INSERT INTO Publisher (crn, nameP) Values('2', 'Harper Collins');
INSERT INTO Publisher (crn, nameP) Values('3', 'Macmillan');


INSERT INTO LibraryLocation (nameL, streetL, cityL, zipL) Values('Biblioteca Bolzano', 'Piazza Università', 'Bolzano', '39100');
INSERT INTO LibraryLocation (nameL, streetL, cityL, zipL) Values('Biblioteca Bressanone', 'Viale Ratisbona', 'Bressanone', '39042');
INSERT INTO LibraryLocation (nameL, streetL, cityL, zipL) Values('Biblioteca Brunico', 'Via Enrico Fermi', 'Brunico', '39031');


INSERT INTO Publication (isbn, title, releaseDate, editionN, format, crn)
VALUES
  ('111222333', 'Harry Potter', '1997-06-26', 1, 'Book', '1'),
  ('444555666', 'Great Gatsby', '1925-04-10', 3, 'Book', '2'),
  ('777888999', 'Mockingbird', '1960-07-11', 1, 'Book', '3'),
  ('123456789', '1984', '1949-06-08', 1, 'Book', '1'),
  ('987654321', 'Pride Prejudice', '1813-01-28', 5, 'Book', '2'),
  ('135792468', 'The Catcher Rye', '1951-07-16', 1, 'Book', '3'),
  ('246813579', 'Brave New World', '1932-06-01', 2, 'Book', '1'),
  ('369258147', 'The Hobbit', '1937-09-21', 1, 'Book', '2'),
  ('951753846', 'Moby-Dick', '1851-10-18', 6, 'Book', '3'),
  ('864209753', 'Lord of Rings', '1954-07-29', 2, 'Book', '1');


INSERT INTO Author (nameA, lastNameA, birthDateA)
VALUES
  ('J. K.', 'Rowling', '1965-07-31'),
  ('F. Scott', 'Fitzgerald', '1896-09-24'),
  ('Harper', 'Lee', '1926-04-28'),
  ('George', 'Orwell', '1903-06-25'),
  ('Jane', 'Austen', '1775-12-16'),
  ('J. D.', 'Salinger', '1919-01-01'),
  ('Aldous', 'Huxley', '1894-07-26'),
  ('J. R. R.', 'Tolkien', '1892-01-03'),
  ('Herman', 'Melville', '1819-08-01');


INSERT INTO HasGenre (nameG, isbn)
VALUES
  ('Fantasy', '111222333'),
  ('Novel', '444555666'),
  ('Novel', '777888999'),
  ('Other', '123456789'),
  ('Novel', '987654321'),
  ('Novel', '135792468'),
  ('Other', '246813579'),
  ('Fantasy', '369258147'),
  ('Other', '951753846'),
  ('Fantasy', '864209753');
  

INSERT INTO HasAuthor (nameA, lastNameA, birthDateA, isbn)
VALUES
  ('J. K.', 'Rowling', '1965-07-31', '111222333'),
  ('F. Scott', 'Fitzgerald', '1896-09-24', '444555666'),
  ('Harper', 'Lee', '1926-04-28', '777888999'),
  ('George', 'Orwell', '1903-06-25', '123456789'),
  ('Jane', 'Austen', '1775-12-16', '987654321'),
  ('J. D.', 'Salinger', '1919-01-01', '135792468'),
  ('Aldous', 'Huxley', '1894-07-26', '246813579'),
  ('J. R. R.', 'Tolkien', '1892-01-03', '369258147'),
  ('Herman', 'Melville', '1819-08-01', '951753846'),
  ('J. R. R.', 'Tolkien', '1892-01-03', '864209753');
  

INSERT INTO Stores (nameL, streetL, cityL, zipL, isbn, quantity)
VALUES
  ('Biblioteca Bolzano', 'Piazza Università', 'Bolzano', '39100', '111222333', 1),
  ('Biblioteca Bolzano', 'Piazza Università', 'Bolzano', '39100', '444555666', 5),
  ('Biblioteca Bolzano', 'Piazza Università', 'Bolzano', '39100', '777888999', 3),
  ('Biblioteca Bolzano', 'Piazza Università', 'Bolzano', '39100', '123456789', 7),
  ('Biblioteca Bressanone', 'Viale Ratisbona', 'Bressanone', '39042', '987654321', 2),
  ('Biblioteca Bressanone', 'Viale Ratisbona', 'Bressanone', '39042', '135792468', 4),
  ('Biblioteca Bressanone', 'Viale Ratisbona', 'Bressanone', '39042', '246813579', 6),
  ('Biblioteca Brunico', 'Via Enrico Fermi', 'Brunico', '39031', '369258147', 8),
  ('Biblioteca Brunico', 'Via Enrico Fermi', 'Brunico', '39031', '951753846', 10),
  ('Biblioteca Brunico', 'Via Enrico Fermi', 'Brunico', '39031', '864209753', 0);


INSERT INTO Person (ssn, firstName, lastName, birthDate, email, phoneNumber, streetA, cityA, zipA, country)
VALUES
  ('123456789', 'John', 'Doe', '1985-07-15', 'john.doe@example.com', '5551234567', 'Main Street', 'Anytown', '12345', 'United States'),
  ('987654321', 'Jane', 'Smith', '1990-03-25', 'jane.smith@example.com', '5559876543', 'First Avenue', 'Sometown', '54321', 'United States'),
  ('789456123', 'Michael', 'Johnson', '1988-11-10', 'michael.johnson@example.com', '5557894561', 'Oak Street', 'Cityville', '67890', 'United States'),
  ('456123789', 'Emily', 'Brown', '1995-09-03', 'emily.brown@example.com', '5554561237', 'Elm Road', 'Villagetown', '34567', 'United States'),
  ('321654987', 'David', 'Wilson', '1992-05-18', 'david.wilson@example.com', '5553216549', 'Maple Avenue', 'Townsville', '90123', 'United States'),
  ('111111111', 'John', 'Sanders', '1990-05-15', 'john.sanders@example.com', '5551111111', 'Round Street', 'Exampletown', '12345', 'Canada'),
  ('222222222', 'Jane', 'Walker', '1985-10-20', 'jane.walker@example.com', '5552222222', 'Third Street', 'Anytown', '12345', 'United States');


INSERT INTO AccessCard (accessCardID, issueDate, expiringDate, fineBalance)
VALUES
  ('12345', '2023-07-14', '2024-07-14', 0),
  ('54321', '2023-06-30', '2024-06-30', 0),
  ('98765', '2023-08-01', '2024-08-01', 0),
  ('67890', '2023-07-01', '2024-07-01', 0),
  ('90123', '2023-07-20', '2024-07-20', 0);


INSERT INTO Customer (accessCardID, ssn)
VALUES
  ('12345', '123456789'),
  ('54321', '987654321'),
  ('98765', '789456123'),
  ('67890', '456123789'),
  ('90123', '321654987');


INSERT INTO Orders (rentalDate, dueDate)
VALUES
  ('2023-07-15', '2023-08-15'),
  ('2023-07-16', '2023-08-16'),
  ('2023-07-17', '2023-08-17'),
  ('2023-07-18', '2023-08-18'),
  ('2023-07-19', '2023-08-19');


INSERT INTO Completes (ordersID, customerID)
VALUES
  ('22', '5'),
  ('23', '6'),
  ('24', '6'),
  ('25', '5'),
  ('26', '9');


INSERT INTO ContainsO (ordersID, isbn)
VALUES
  ('22', '987654321'),
  ('23', '246813579'),
  ('24', '444555666'),
  ('25', '951753846'),
  ('26', '864209753');


INSERT INTO Reservation (reservationDate, queueN, customerID, isbn) 
VALUES
  ('2023-07-10', '1', '5', '111222333'),
  ('2023-07-12', '2', '8', '111222333'),
  ('2023-07-14', '3', '7', '111222333');


INSERT INTO Delivery (trackingNumber, deliveryFee, streetA, cityA, zipA, country, ordersID, shipmentDate, nameL, streetL, cityL, zipL) 
VALUES
  ('123', '50', 'Main Street', 'Anytown', '12345', 'United States', '22', '2023-07-20', 'Biblioteca Bolzano', 'Piazza Università', 'Bolzano', '39100'),
  ('456', '40', 'First Avenue', 'Sometown', '54321', 'United States', '23', '2023-07-19', 'Biblioteca Bressanone', 'Viale Ratisbona', 'Bressanone', '39042'),
  ('789', '60', 'Maple Avenue', 'Townsville', '90123', 'United States', '26', '2023-07-16', 'Biblioteca Brunico', 'Via Enrico Fermi', 'Brunico', '39031');


INSERT INTO ReturnedOrders (ordersID, returnDate)
VALUES
  ('24', '2023-07-17');


INSERT INTO Extends (ordersID, customerID)
VALUES
  ('25', '5');


INSERT INTO PersonMiddle (ssn, middleName)
VALUES 
  ('789456123', 'James');


INSERT INTO Employee (badgeNumber, roleE, ssn, nameL, streetL, cityL, zipL)
VALUES 
  ('123', 'Librarian', '111111111', 'Biblioteca Bolzano', 'Piazza t', 'Bolzano', '39100'),
  ('456', 'Librarian', '222222222', 'Biblioteca Bressanone', 'Viale Ratisbona', 'Bressanone', '39042');
