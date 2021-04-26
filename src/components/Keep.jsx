import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
const URL = process.env.REACT_APP_API_ADDRESS_NAME;

function Keep(props) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getAllNotes();
  }, []);

  const getAllNotes = () => {
    axios
      .get(URL + "notes/" + props.email)
      .then((response) => {
        var json_data = response.data;
        var resultfinal = [];

        for (var i in json_data) resultfinal.push(json_data[i]);

        setNotes(resultfinal);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getAllNotes();
    props.setLoginPage(0);
    props.setRegPage(0);
    props.setKeepPage(1);
  }, []);

  function addNote(newNote) {
    axios
      .post(URL + "notes", {
        email_id: props.email,
        title: newNote.title,
        content: newNote.content,
      })
      .then((response) => {
        getAllNotes();
      })
      .catch((error) => {});
  }

  function deleteNote(uniqueid) {
    axios
      .delete(URL + "notes/" + uniqueid, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        getAllNotes();
      })
      .catch((error) => {});
  }

  function handleClickLogout(event) {
    event.preventDefault();
    props.setKeepPage(0);
    props.setLoginPage(1);
    props.setRegPage(0);
    props.setEmail("");
    props.setPassword("");
    localStorage.clear();
  }

  return (
    <div>
      <Header />
      <div>
        <button
          type="submit"
          style={{
            align: "right",
            margin: "1.5%",
          }}
          className="form-control col-lg-2 col-md-3 col-sm-4 btn btn-outline-primary float-right rounded submit px-3"
          align="right"
          onClick={handleClickLogout}
        >
          Logout
        </button>
      </div>
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
