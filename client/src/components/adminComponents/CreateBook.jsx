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
    const [genre, setGenre] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorLastName, setAuthorLastName] = useState('');
    const [authorDoB, setAuthorDoB] = useState('');
    const [nameL, setNameL] = useState('');
    const [streetL, setStreetL] = useState('');
    const [cityL, setCityL] = useState('');
    const [zipL, setZipL] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigate = useNavigate();

    const publisherOptions = ['pubA', 'pubB', 'pubC'];
    const typePOptions = ['TypeA', 'TypeB', 'TypeC'];

    const [library, setLibrary] = useState('')
    const libOptions = ['Bolzano', 'Bressanone', 'Brunico'];


    const handleSubmit = async(e) => {
        e.preventDefault();

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
        }

        try {
            /*
            const body = {description};
            const response = await fetch('http://localhost:5000/todos', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });*/
            const bookData = {isbn, title, releaseDate, editionN, format, crn};
            const hasGenreData = {genre, isbn};
            const authorData = {authorName, authorLastName, authorDoB};
            const hasAuthorData = {isbn, authorName, authorLastName, authorDoB};
            const storesData = {nameL, streetL, cityL, zipL, isbn, quantity}
            
            // Create the person record
            //const personResponse = await axios.post('/api/persons', personData);
            await axios.post('/api/newBook', bookData);
            await axios.post('/api/hasGenre', hasGenreData);
            await axios.post('/api/newAuthor', authorData);
            await axios.post('/api/hasAuthor', hasAuthorData);
            await axios.post('/api/stores', storesData);
        
      
            
      
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
                    CRN:
                    <select value={crn} onChange={(e) => setCrn(e.target.value)} required>
                        <option value="">Select CRN</option>
                        {publisherOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Choose library:
                    <select value={library} onChange={(e) => setLibrary(e.target.value)} required>
                        <option value="">Select Format</option>
                        {libOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Genre:
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                </label>
                <br />
                <label>
                    Author Name:
                    <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Author Last Name:
                    <input type="text" value={authorLastName} onChange={(e) => setAuthorLastName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Author Date of Birth:
                    <input type="date" value={authorDoB} onChange={(e) => setAuthorDoB(e.target.value)} required />
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