import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
const URL = "https://fierce-shore-80067.herokuapp.com/";

function Keep(props) {
  const [notes, setNotes] = useState([]);

  const getAllNotes = () => {
    console.log(props.email);
    axios
      .get(URL + "notes/" + props.email)
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
      .post(URL + "notes", {
        email_id: props.email,
        title: newNote.title,
        content: newNote.content,
      })
      .then((response) => {
        console.log("yeh hai add note ka response");
        console.log(response);
        getAllNotes();
        // setNotes(response.data);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });

    console.log("post requuest hogayi");
  }

  function deleteNote(uniqueid) {
    axios
      .delete(URL + "notes/" + uniqueid, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(" Suucessfully deleted ", uniqueid, response);
        getAllNotes();
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
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
