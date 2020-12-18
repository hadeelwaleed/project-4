import React, {useState} from "react";
import axios from "axios";
export default function ArticleItem(props) {
  console.log("PROPS.ONEARTICLE: ", props.oneArticle);
const [count,setCountt]=useState(0);
const add1 =()=>{
  setCountt(count+1);
}
  const { title, description, author, id } = props.oneArticle;

  const changeTitle = () => {
    axios
      .delete(`http://localhost:5000/articles/${props.oneArticle.id}`)
      .then((response) => {
        console.log("RESPONSE: ", response);
        console.log("DATA: ", response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };
  // test tes 
  const deleteThisArticleByid = () => {
    axios
      // .delete(`http://localhost:5000/articles/${id}`)
      .delete(`http://localhost:5000/articles/${props.oneArticle.id}`)
      .then((response) => {
        console.log("RESPONSE: ", response);
        console.log("DATA: ", response.data);
        if (response.status === 200) {
          props.getAllArticles();
        }
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
    };
    
    return (
      <div className="article-item">
      <h3>ArticleItem</h3>
      <p>Title: {title}</p>
      <p>{description} </p>
      <p>By: {author}</p>
      <input placeholder="NewTitle"></input>
      <button onClick={changeTitle}>ChangeArticle</button>
      <button onClick={deleteThisArticleByid}>Delete</button>
    </div>
  );
}
