import React, { useState } from "react";
import ArticleItem from "./components/ArticleItem";
import NewItem from "./components/NewItem";
import "./App.css";
import axios from "axios";
import {BrowserRouter,Route,Switch,Redirect}from'react-router-dom';
import Login from "./components/login";
import Home from "./components/home";
import SignUp from "./components/signup";
// import SignUp from "./components/signup";


// export default function App() {
//   // [nameOfTheState,functionToChangeTheState] = (initalValue)
//   const [articles, setArticles] = useState([]);

//   const getAll = () => {
//     axios
//       .get(`http://localhost:5000/articles`)
//       .then((response) => {
//         console.log("RESPONSE: ", response);
//         console.log("DATA: ", response.data);
//         setArticles(response.data);
//       })
//       .catch((err) => {
//         console.log("ERR: ", err);
//       });
//   };

//   const artilceList = articles.map((article, i) => {
//     return (
//       <ArticleItem
//         getAllArticles={getAll}
//         oneArticle={article}
//         name={"abd"}
//         key={i}
//       />
//     );
//   });

//   // لازم اكواد html تكون بالريتيرن
//   return (
//     <div className="app">
//       <h1>HELLO </h1>
//       <h2>APP1+1{1 + 1}</h2>
//       <input type="text" placeholder="write your email" />
//       <button onClick={getAll}> GET All Articles</button>
//       <button onClick={add1}> +</button>
//       <h3>Count is :{count}</h3>

//       <NewItem getAllProps={getAll} />
//       {artilceList}
//     </div>
//   );
// }
const App = (props) => {
  const [state, setState] = useState({
    isLogin: false,
    userName: "",
  });
  const content = (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} /> 
        <Route path="/signup" component={SignUp} />

      </Switch>
    </BrowserRouter>
  );
  return content
};
export default App
{/* <Route path="/signup" component={SignUp} /> */}
