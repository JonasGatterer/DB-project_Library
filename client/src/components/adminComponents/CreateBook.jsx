import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from "react-router-dom";

const CreateBook = () => {
    const [isbn, setIsbn] = useState('');
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [editionN, setEditionN] = useState('');
    const [format, setFormat] = useState(''); //chosen from typep
    const [crn, setCrn] = useState(''); //chosen from Publisher
    const [nameG, setGenre] = useState('');
    const [nameA, setAuthorName] = useState('');
    const [lastNameA, setAuthorLastName] = useState('');
    const [birthDateA, setAuthorDoB] = useState('');
    const [nameL, setNameL] = useState('');
    const [streetL, setStreetL] = useState('');
    const [cityL, setCityL] = useState('');
    const [zipL, setZipL] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    const [publisher, setPublisher] = useState('');
    const publisherOptions = ['Bloomsbury', 'Harper Collins', 'Macmillan'];
    //const publisherOptions = ['1', '2', '3'];

    const typePOptions = ['Book', 'Science Paper', 'E-Book'];

    const [library, setLibrary] = useState('')
    const libOptions = ['Bolzano', 'Bressanone', 'Brunico'];


    const handleSubmit = async(e) => {
        e.preventDefault();

        /*
        if(library === 'Bolzano'){
            setNameL('Biblioteca Bolzano');
            setStreetL('Piazza Universià');
            setCityL('Bolzano');
            setZipL('39100');
        }else if(library === 'Bressanone'){
            setNameL('Biblioteca Bressanone');
            setStreetL('Viale Ratisbona');
            setCityL('Bressanone');
            setZipL('39042');
        }else if(library === 'Brunico'){
            setNameL('Biblioteca Brunico');
            setStreetL('Via Enrico Fermi');
            setCityL('Brunico');
            setZipL('39031');
        }*/
        
        try {
            
            if(publisher == 'Bloomsbury'){
                setCrn('1');
            }else if(publisher == 'Harper Collins'){
                setCrn('2');
            }else/*(publisher == '3')*/{
                setCrn('3');
            }
            
            /*
            const body = {description};
            const response = await fetch('http://localhost:5000/todos', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });*/

            const bookData = {isbn, title, releaseDate, editionN, format, crn};
            const hasGenreData = {nameG, isbn};
            const authorData = {nameA, lastNameA, birthDateA};
            const hasAuthorData = {isbn, nameA, lastNameA, birthDateA};
            const storesData = {nameL, streetL, cityL, zipL, isbn, quantity}
            
            // Create the person record
            //const personResponse = await axios.post('/api/persons', personData);
            await axios.post('http://localhost:5000/api/newBook', bookData);
            await axios.post('http://localhost:5000/api/hasGenre', hasGenreData);
            await axios.post('http://localhost:5000/api/newAuthor', authorData);
            await axios.post('http://localhost:5000/api/hasAuthor', hasAuthorData);
            await axios.post('http://localhost:5000/api/stores', storesData);
        
      
            
      
            // Clear form fields after successful registration
            setIsbn('');
            setTitle('');
            setReleaseDate('');
            setEditionN('');
            setFormat('');
            setCrn('');
            setGenre('');
            setAuthorName('');
            setAuthorLastName('');
            setAuthorDoB('');
            setNameL('');
            setStreetL('');
            setCityL('');
            setZipL('');
            setQuantity('');
            setLibrary('');
      
            // Redirect to the login page or any other appropriate page
            // You can use a router or change the logic based on your application setup
            // window.location.href = '/login';
            navigate('/admin');
          } catch (error) {
            console.error('Creation of new book failed:', error);
            // Handle the error as needed
          }
        
    
        // Perform form validation and data processing here
        // For example, you can make a REST API call to submit the new publication data
    
        // Clear form fields after submission
        
    };
    
    return(
        <div>
            <h2>Add New Publication</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    ISBN:
                    <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                </label>
                <br />
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Release Date:
                    <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                </label>
                <br />
                <label>
                    Edition:
                    <input type="number" value={editionN} onChange={(e) => setEditionN(e.target.value)} required />
                </label>
                <br />
                <label>
                    Format:
                    <select value={format} onChange={(e) => setFormat(e.target.value)} required>
                        <option value="">Select Format</option>
                        {typePOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Publisher:
                    <input type="text" value={publisher} onChange={(e) =>
                        {
                            setPublisher(e.target.value);
                            if (e.target.value === 'Bloomsbury') {
                              setCrn('1');
                            } else if (e.target.value === 'Harper Collins') {
                              setCrn('2');
                            } else {
                              setCrn('3');
                            }
                    }} required />
                </label>
                <br />
                <label>
                    Set Library Name:
                    <input type="text" value={nameL} onChange={(e) => setNameL(e.target.value)} required />
                </label>
                <br />
                <label>
                    Set Library Street:
                    <input type="text" value={streetL} onChange={(e) => setStreetL(e.target.value)} required />
                </label>
                <br />
                <label>
                    Set Library City:
                    <input type="text" value={cityL} onChange={(e) => setCityL(e.target.value)} required />
                </label>
                <br />
                <label>
                    Set Library Zip:
                    <input type="text" value={zipL} onChange={(e) => setZipL(e.target.value)} required />
                </label>
                <br />
                <label>
                    Genre:
                    <input type="text" value={nameG} onChange={(e) => setGenre(e.target.value)} required />
                </label>
                <br />
                <label>
                    Author Name:
                    <input type="text" value={nameA} onChange={(e) => setAuthorName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Author Last Name:
                    <input type="text" value={lastNameA} onChange={(e) => setAuthorLastName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Author Date of Birth:
                    <input type="date" value={birthDateA} onChange={(e) => setAuthorDoB(e.target.value)} required />
                </label>
                <label>
                    Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateBook;