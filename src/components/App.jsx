import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from 'axios'

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("Use effect mein hun");
    getAllNotes();
  }, []);

  const getAllNotes = () => {
      axios.get('http://localhost:3000/notes')
      .then((response) => {
        console.log(response);
        // var arr = JSON.parse(response.data);
        // console.log(arr);
        console.log(response.data);
        
        setNotes(response.data);
      })
      .catch(error => {
        console.log("Error : ", error);
      });
  }

  function addNote(newNote) {
    console.log("Yeh hai new note neeche");
    console.log(newNote);
    axios.post('http://localhost:3000/notes',{
        email : "123@gmail.com",
        title : newNote.title,
        data: newNote.content,
      }
    )
    .then((response) => {
        console.log(response);
        setNotes(response.data);
      })
      .catch(error => {
        console.log("Error : ", error);
      });
    
    console.log("post requuest hogayi");

    getAllNotes();
  }

  function deleteNote(title) {

    axios.delete('http://localhost:3000/notes/' + title, {
      headers : {
        "Access-Control-Allow-Origin" : "*"
      }
    })
      .then((response) => {
        console.log(response);
      })
      .catch(error => {
        console.log("Error : ", error);
      });
      
      console.log("element deleted");

      getAllNotes();
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.email}
            content={noteItem.data}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
