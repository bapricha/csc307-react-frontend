import React, {useState, useEffect} from 'react';
import Table from "./Table.js"
import Form from "./Form.js"
import axios from 'axios';

function MyApp() {
    const [characters, setCharacters] = useState([ ]);  
    
    function updateList(person) {
      makePostCall(person).then( result => {
        if (result && result.status === 201)
           setCharacters([...characters, result.data] );
        });
    }

    function removeOneCharacter(index) {
        const updated = characters.filter(
          (character, i) => { return i !== index });
          const person = characters[index];
          const id = person['id'];  
        const response = axios.delete(`http://localhost:5000/users/${id}`);
        setCharacters(updated);
    }
    
    async function fetchAll(){
      try {
         const response = await axios.get('http://localhost:5000/users');
         return response.data.users_list;     
      }
      catch (error){
         //We're not handling errors. Just logging into the console.
         console.log(error); 
         return false;         
      }
   }

   async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:5000/users', person);
       return response;
    }
    catch (error) {
       console.log(error);
       return false;
    }
 }

   useEffect(() => {
    fetchAll().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );

    return (
      <div className="container">
        <Table characterData={characters} removeCharacter = {removeOneCharacter} />
        <Form handleSubmit={updateList} />
      </div>
    );
  }
  export default MyApp;

