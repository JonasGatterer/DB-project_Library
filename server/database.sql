CREATE DATABASE library_project;

CREATE TABLE Person (
    ssn         VARCHAR PRIMARY KEY,
    firstName   CHAR NOT NULL,
    lastName    CHAR NOT NULL,
    birthDate   DATE NOT NULL,
    email       CHAR NOT NULL,
    phoneNumber CHAR NOT NULL,
    streetA     CHAR NOT NULL,
    cityA       CHAR NOT NULL,
    zipA        CHAR NOT NULL,
    country     CHAR NOT NULL
)

CREATE INDEX idx_email ON Person (email);
CREATE INDEX idx_phoneNumber ON Person (phoneNumber);

CREATE TABLE PersonMiddle (
    ssn         VARCHAR PRIMARY KEY
                REFERENCES Person(ssn),
    middleName  CHAR NOT NULL
)

CREATE TABLE Customer (
    customerID      VARCHAR PRIMARY KEY,
    accessCardID    VARCHAR KEY
                    REFERENCES AccessCard(accessCardID),
    ssn             VARCHAR KEY
                    REFERENCES Person(ssn)
)

CREATE TABLE AccessCard (
    accessCardID    VARCHAR PRIMARY KEY
                    REFERENCES Customer(accessCardID),
    issueDate       DATE NOT NULL,
    expiringDate    DATE NOT NULL,
    fineBalance     INT DEFAULT 0
)

CREATE TABLE Completes ( 
    orderID     VARCHAR PRIMARY KEY
                REFERENCES Order(orderID),
    customerID  VARCHAR
                REFERENCES Customer(customerID)
)

CREATE TABLE Extends (
    orderID     VARCHAR PRIMARY KEY
                REFERENCES Order(orderID)
                REFERENCES Completes(orderID),
    customerID  VARCHAR
                REFERENCES Customer(customerID)
)

CREATE TABLE Order (
    orderID     VARCHAR PRIMARY KEY
                REFERENCES Completes(orderID),
    rentalDate  DATE NOT NULL,
    dueDate     DATE NOT NULL,
    CHECK (orderID IN (SELECT orderID FROM ContainsO))
)

CREATE TABLE ReturnedOrder (
    orderID     VARCHAR PRIMARY KEY
                REFERENCES Order(orderID),
    returnDate  DATE NOT NULL
)

CREATE TABLE ContainsO (
    orderID     VARCHAR
                REFERENCES Order(orderID),
    isbn        VARCHAR
                REFERENCES Publication(isbn),
    PRIMARY KEY (orderID,isbn)
)

CREATE TABLE Reservation (
    reservationID   VARCHAR PRIMARY KEY,
    reservationDate DATE NOT NULL,
    queueN          INT NOT NULL,
    customerID      VARCHAR
                    REFERENCES Customer(customerID),
    isbn            VARCHAR
                    REFERENCES Publication(isbn)
)

CREATE TABLE Publication (
    isbn        VARCHAR PRIMARY KEY,
    title       CHAR NOT NULL,
    releaseDate DATE NOT NULL,
    editionN    INT NOT NULL,
    format      CHAR
                REFERENCES TypeP(format),
    crn         VARCHAR
                REFERENCES Publisher(crn),
    CHECK (isbn IN (SELECT isbn FROM HasAuthor)),
    CHECK (isbn IN (SELECT isbn FROM HasGenre)),
    CHECK (isbn IN (SELECT isbn FROM Stores))
)

CREATE TABLE Genre ( 
    nameG   CHAR PRIMARY KEY,
    CHECK (nameG IN (SELECT nameG FROM HasGenre))
)

CREATE TABLE HasGenre (
    nameG   CHAR
            REFERENCES Genre(nameG),
    isbn    VARCHAR
            REFERENCES Publication(isbn),
    PRIMARY KEY (nameG,isbn)
)

CREATE TABLE TypeP (
    format          CHAR PRIMARY KEY,
    accessMethod    BOOLEAN NOT NULL 
)

CREATE TABLE Publisher (
    crn     VARCHAR PRIMARY KEY,
    nameP   CHAR KEY,
    CHECK (crn IN (SELECT crn FROM Publication))
)

CREATE TABLE Author (
    nameA       CHAR,
    lastNameA   CHAR,
    birthDateA  DATE,
    PRIMARY KEY (nameA,lastNameA,birthDateA),
    CHECK (nameA,lastNameA,birthDateA IN (SELECT nameA,lastNameA,birthDateA FROM HasAuthor))
)

CREATE TABLE HasAuthor (
    nameA       CHAR,
    lastNameA   CHAR,
    birthDateA  DATE,
    isbn        VARCHAR
                REFERENCES Publication(isbn),
    PRIMARY KEY (nameA,lastNameA,birthDateA, isbn),
    FOREIGN KEY (nameA, lastNameA, birthDateA) REFERENCES Author(nameA, lastNameA, birthDateA)
)

CREATE TABLE Employee (
    badgeNumber VARCHAR PRIMARY,
    roleE       CHAR NOT NULL,
    ssn         VARCHAR KEY
                REFERENCES Person(ssn),
    nameL       CHAR,
    streetL     CHAR,
    cityL       CHAR,
    zipL        CHAR,
    FOREIGN KEY (nameL, streetL, cityL, zipL) REFERENCES LibraryLocation(nameL, streetL, cityL, zipL)   
)

CREATE TABLE LibraryLocation (
    nameL       CHAR,
    streetL     CHAR,
    cityL       CHAR,
    zipL        CHAR,
    PRIMARY KEY (nameL, streetL, cityL, zipL),
    CHECK (nameL, streetL, cityL, zipL IN (SELECT nameL, streetL, cityL, zipL FROM Stores)),
    CHECK (nameL, streetL, cityL, zipL IN (SELECT nameL, streetL, cityL, zipL FROM Employee)),
    CHECK (nameL, streetL, cityL, zipL IN (SELECT nameL, streetL, cityL, zipL FROM Delivery)) 
)

CREATE TABLE Stores (
    nameL       CHAR,
    streetL     CHAR,
    cityL       CHAR,
    zipL        CHAR,
    isbn        VARCHAR
                REFERENCES Publication(isbn),
    quantity    INT NOT NULL,
    PRIMARY KEY (nameL, streetL, cityL, zipL, isbn),
    FOREIGN KEY (nameL, streetL, cityL, zipL) REFERENCES LibraryLocation(nameL, streetL, cityL, zipL)
)

CREATE TABLE Delivery (
    trackingNumber  VARCHAR PRIMARY KEY,
    deliveryFee     DECIMAL NOT NULL,
    streetA         CHAR,
    cityA           CHAR,
    zipA            CHAR,
    country         CHAR,
    orderID         VARCHAR KEY
                    REFERENCES Order(orderID),
    shipmentDate    DATE NOT NULL,
    nameL           CHAR,
    streetL         CHAR,
    cityL           CHAR,
    zipL            CHAR,
    FOREIGN KEY (streetA, cityA, zipA, country) REFERENCES Person(streetA, cityA, zipA, country),
    FOREIGN KEY (nameL, streetL, cityL, zipL) REFERENCES LibraryLocation(nameL, streetL, cityL, zipL)
)
