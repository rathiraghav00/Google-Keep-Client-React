import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function Keep(props) {
  const [notes, setNotes] = useState([]);

  function refreshPage() {
    getAllNotes();
    // setTimeout(window.location.reload(false), 2000);
  }

  useEffect(() => {
    console.log("Use effect mein hun");
    refreshPage();
  }, []);

  const getAllNotes = () => {
    console.log(props.email);
    axios
      .get("http://localhost:3000/notes/" + props.email)
      .then((response) => {
        var json_data = response.data;
        var resultfinal = [];

        for (var i in json_data) resultfinal.push(json_data[i]);

        console.log(resultfinal);

        setNotes(resultfinal);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  function addNote(newNote) {
    console.log("Yeh hai new note neeche");
    console.log(newNote);
    axios
      .post("http://localhost:3000/notes", {
        email_id: props.email,
        title: newNote.title,
        content: newNote.content,
      })
      .then((response) => {
        console.log(response);
        // setNotes(response.data);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });

    console.log("post requuest hogayi");

    //setTimeout(getAllNotes(), 2000);
    refreshPage();
  }

  function deleteNote(uniqueid) {
    axios
      .delete("http://localhost:3000/notes/" + uniqueid, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(" Suucessfully deleted ", uniqueid, response);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });

    getAllNotes();
    //refreshPage();
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
            title={noteItem.title}
            content={noteItem.content}
            uniqueid={noteItem._id}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Keep;
