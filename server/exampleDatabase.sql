CREATE DATABASE library_project;

CREATE TABLE Person (
    ssn         VARCHAR PRIMARY KEY,
    firstName   CHAR NOT NULL,
    lastName    CHAR NOT NULL,
    birthDate   DATE NOT NULL,
    email       CHAR NOT NULL UNIQUE,
    phoneNumber CHAR NOT NULL UNIQUE,
    streetA     CHAR NOT NULL,
    cityA       CHAR NOT NULL,
    zipA        CHAR NOT NULL,
    country     CHAR NOT NULL,
    UNIQUE (streetA,cityA, zipA, country)
);

CREATE INDEX idx_email ON Person (email);
CREATE INDEX idx_phoneNumber ON Person (phoneNumber);

CREATE TABLE PersonMiddle (
    ssn         VARCHAR PRIMARY KEY
                REFERENCES Person(ssn),
    middleName  CHAR NOT NULL
);

CREATE TABLE Customer (
    customerID      VARCHAR PRIMARY KEY,
    accessCardID    VARCHAR NOT NULL UNIQUE,
    ssn             VARCHAR NOT NULL UNIQUE
);

CREATE TABLE AccessCard (
    accessCardID    VARCHAR PRIMARY KEY,
    issueDate       DATE NOT NULL,
    expiringDate    DATE NOT NULL,
    fineBalance     INT DEFAULT 0
);

CREATE TABLE Completes (
    ordersID    VARCHAR PRIMARY KEY,
    customerID  VARCHAR
);

CREATE TABLE Extends (
    ordersID    VARCHAR PRIMARY KEY,
    customerID  VARCHAR
);

CREATE TABLE Orders (
    ordersID    VARCHAR PRIMARY KEY,
    rentalDate  DATE NOT NULL,
    dueDate     DATE NOT NULL
);

CREATE TABLE ReturnedOrders (
    ordersID    VARCHAR PRIMARY KEY,
    returnDate  DATE NOT NULL
);

CREATE TABLE ContainsO (
    ordersID    VARCHAR,
    isbn        VARCHAR,
    PRIMARY KEY (ordersID, isbn)
);

CREATE TABLE Reservation (
    reservationID   VARCHAR PRIMARY KEY,
    reservationDate DATE NOT NULL,
    queueN          INT NOT NULL,
    customerID      VARCHAR,
    isbn            VARCHAR
);

CREATE TABLE Publication (
    isbn        VARCHAR PRIMARY KEY,
    title       CHAR NOT NULL,
    releaseDate DATE NOT NULL,
    editionN    INT NOT NULL,
    format      CHAR,
    crn         VARCHAR
);

CREATE TABLE Genre (
    nameG   CHAR PRIMARY KEY
);

CREATE TABLE HasGenre (
    nameG   CHAR,
    isbn    VARCHAR,
    PRIMARY KEY (nameG, isbn)
);

CREATE TABLE TypeP (
    format          CHAR PRIMARY KEY,
    accessMethod    BOOLEAN NOT NULL 
);

CREATE TABLE Publisher (
    crn     VARCHAR PRIMARY KEY,
    nameP   CHAR NOT NULL
);

CREATE INDEX idx_nameP ON Publisher(nameP);

CREATE TABLE Author (
    nameA       CHAR,
    lastNameA   CHAR,
    birthDateA  DATE,
    PRIMARY KEY (nameA,lastNameA,birthDateA)
);

CREATE TABLE HasAuthor (
    nameA       CHAR,
    lastNameA   CHAR,
    birthDateA  DATE,
    isbn        VARCHAR,
    PRIMARY KEY (nameA,lastNameA,birthDateA, isbn)
);

CREATE TABLE Employee (
    badgeNumber VARCHAR PRIMARY KEY,
    roleE       CHAR NOT NULL,
    ssn         VARCHAR NOT NULL,
    nameL       CHAR,
    streetL     CHAR,
    cityL       CHAR,
    zipL        CHAR
);

CREATE INDEX idx_ssn ON Employee(ssn);

CREATE TABLE LibraryLocation (
    nameL       CHAR,
    streetL     CHAR,
    cityL       CHAR,
    zipL        CHAR,
    PRIMARY KEY (nameL, streetL, cityL, zipL) 
);

CREATE TABLE Stores (
    nameL       CHAR,
    streetL     CHAR,
    cityL       CHAR,
    zipL        CHAR,
    isbn        VARCHAR,
    quantity    INT NOT NULL,
    PRIMARY KEY (nameL, streetL, cityL, zipL, isbn)
);

CREATE TABLE Delivery (
    trackingNumber  VARCHAR PRIMARY KEY,
    deliveryFee     DECIMAL NOT NULL,
    streetA         CHAR,
    cityA           CHAR,
    zipA            CHAR,
    country         CHAR,
    ordersID        VARCHAR NOT NULL,
    shipmentDate    DATE NOT NULL,
    nameL           CHAR,
    streetL         CHAR,
    cityL           CHAR,
    zipL            CHAR
);

CREATE INDEX idx_ordersID ON Delivery(ordersID);


-- Foreign Keys
-- Add foreign key constraint to Customer table
ALTER TABLE Customer
    ADD CONSTRAINT fk_customer_accessCard
    FOREIGN KEY (accessCardID) REFERENCES AccessCard(accessCardID) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_customer_person
    FOREIGN KEY (ssn) REFERENCES Person(ssn) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to AccessCard table
ALTER TABLE AccessCard
    ADD CONSTRAINT fk_accessCard_customer
    FOREIGN KEY (accessCardID) REFERENCES Customer(accessCardID) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Completes
    ADD CONSTRAINT fk_completes_orders
    FOREIGN KEY (ordersID) REFERENCES Orders (ordersID) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_completes_customer
    FOREIGN KEY (customerID) REFERENCES Customer (customerID) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to Extends table
ALTER TABLE Extends
    ADD CONSTRAINT fk_extends_orders
    FOREIGN KEY (ordersID) REFERENCES Orders (ordersID) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_extends_customer
    FOREIGN KEY (customerID) REFERENCES Customer (customerID) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to Orders table
ALTER TABLE Orders
    ADD CONSTRAINT fk_orders_completes
    FOREIGN KEY (ordersID) REFERENCES Completes (ordersID) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to ReturnedOrders table
ALTER TABLE ReturnedOrders
    ADD CONSTRAINT fk_returnedorders_orders
    FOREIGN KEY (ordersID) REFERENCES Orders (ordersID) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to ContainsO table
ALTER TABLE ContainsO
    ADD CONSTRAINT fk_containso_orders
    FOREIGN KEY (ordersID) REFERENCES Orders (ordersID) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_containso_publication
    FOREIGN KEY (isbn) REFERENCES Publication (isbn) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to Reservation table
ALTER TABLE Reservation
    ADD CONSTRAINT fk_reservation_customer
    FOREIGN KEY (customerID) REFERENCES Customer (customerID) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_reservation_publication
    FOREIGN KEY (isbn) REFERENCES Publication (isbn) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to Publication table
ALTER TABLE Publication
    ADD CONSTRAINT fk_publication_typep
    FOREIGN KEY (format) REFERENCES TypeP (format) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_publication_publisher
    FOREIGN KEY (crn) REFERENCES Publisher (crn) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to HasGenre table
ALTER TABLE HasGenre
    ADD CONSTRAINT fk_hasgenre_genre
    FOREIGN KEY (nameG) REFERENCES Genre (nameG) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_hasgenre_publication
    FOREIGN KEY (isbn) REFERENCES Publication (isbn) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to HasAuthor table
ALTER TABLE HasAuthor
    ADD CONSTRAINT fk_hasauthor_publication
    FOREIGN KEY (isbn) REFERENCES Publication(isbn) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_hasauthor_author
    FOREIGN KEY (nameA, lastNameA, birthDateA) REFERENCES Author(nameA, lastNameA, birthDateA) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to Employee table
ALTER TABLE Employee
    ADD CONSTRAINT fk_employee_person
    FOREIGN KEY (ssn) REFERENCES Person(ssn) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_employee_library
    FOREIGN KEY (nameL, streetL, cityL, zipL) REFERENCES LibraryLocation(nameL, streetL, cityL, zipL) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to Stores table
ALTER TABLE Stores
    ADD CONSTRAINT fk_stores_publication
    FOREIGN KEY (isbn) REFERENCES Publication(isbn) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_stores_library
    FOREIGN KEY (nameL, streetL, cityL, zipL) REFERENCES LibraryLocation(nameL, streetL, cityL, zipL) ON DELETE CASCADE ON UPDATE CASCADE;

-- Add foreign key constraint to Delivery table
ALTER TABLE Delivery
    ADD CONSTRAINT fk_delivery_orders
    FOREIGN KEY (ordersID) REFERENCES Orders(ordersID),
    ADD CONSTRAINT fk_delivery_person
    FOREIGN KEY (streetA, cityA, zipA, country) REFERENCES Person(streetA, cityA, zipA, country) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT fk_delivery_library
    FOREIGN KEY (nameL, streetL, cityL, zipL) REFERENCES LibraryLocation(nameL, streetL, cityL, zipL) ON DELETE CASCADE ON UPDATE CASCADE;


-- Inclusions
-- Add foreign check constraint to Order table
ALTER TABLE Orders
    ADD CONSTRAINT check_containsO
    CHECK (ordersID IN (SELECT ordersID FROM ContainsO));
    
-- Add foreign check constraint to Publication table
ALTER TABLE Publication
    ADD CONSTRAINT check_publication_hasauthor
    CHECK (isbn IN (SELECT isbn FROM HasAuthor)),
    ADD CONSTRAINT check_publication_hasgenre
    CHECK (isbn IN (SELECT isbn FROM HasGenre)),
    ADD CONSTRAINT check_publication_stores
    CHECK (isbn IN (SELECT isbn FROM Stores));

-- Add foreign check constraint to Genre table
ALTER TABLE Genre
    ADD CONSTRAINT check_genre_hasgenre
    CHECK (nameG IN (SELECT nameG FROM HasGenre));

-- Add foreign check constraint to Publisher table
ALTER TABLE Publisher
    ADD CONSTRAINT check_publisher
    CHECK (crn IN (SELECT crn FROM Publication));

-- Add foreign check constraint to Author table
ALTER TABLE Author
    ADD CONSTRAINT check_author
    CHECK ((nameA, lastNameA, birthDateA) IN (SELECT nameA, lastNameA, birthDateA FROM HasAuthor));

-- Add foreign check constraint to LibraryLocation table
ALTER TABLE LibraryLocation
    ADD CONSTRAINT check_library_stores
    CHECK ((nameL, streetL, cityL, zipL) IN (SELECT nameL, streetL, cityL, zipL FROM Stores)),
    ADD CONSTRAINT check_library_employee
    CHECK ((nameL, streetL, cityL, zipL) IN (SELECT nameL, streetL, cityL, zipL FROM Employee)),
    ADD CONSTRAINT check_library_delivery
    CHECK ((nameL, streetL, cityL, zipL) IN (SELECT nameL, streetL, cityL, zipL FROM Delivery));