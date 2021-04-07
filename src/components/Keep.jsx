import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";
import { Button } from "bootstrap";
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

  useEffect(() => {
    getAllNotes();
  }, []);

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
          style={{ align: "left", margin: "1.5%" }}
          className="form-control col-lg-2 col-md-3 col-sm-4 btn btn-outline-warning rounded submit px-3"
          align="right"
          onClick={handleClickLogout}
        >
          Logout
        </button>
        <CreateArea onAdd={addNote} />
      </div>

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
      <Footer
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "2.5rem",
        }}
      />
    </div>
  );
}

export default Keep;
