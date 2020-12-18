import React, { useState } from "react";
import axios from "axios";

export default function NewItem(props) {
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  const addNewArticle = () => {
    axios
      .post(`http://localhost:5000/articles`, {
        title: newTitle,
        description: newDesc,
        author: newAuthor,
      })
      .then((response) => {
        console.log("RESPONSE: ", response);
        console.log("DATA: ", response.data);
        if (response.status === 200) {
          props.getAllProps();
        }
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value);
  };

  return (
    <div className="new-item">
      <span>Title:</span>
      <input
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        type="text"
        placeholder="write here Title"
      />
      <br />
      <span>Desc:</span>
      <textarea
        onChange={(e) => {
          setNewDesc(e.target.value);
        }}
        placeholder="write here Desc"
        cols="10"
        rows="5"
      ></textarea>
      <br />
      <span>Author:</span>
      <input
        onChange={handleAuthorChange}
        type="author"
        placeholder="write here Author"
      />
      <br />
      <button onClick={addNewArticle}>Add New Article</button>
    </div>
  );
}
