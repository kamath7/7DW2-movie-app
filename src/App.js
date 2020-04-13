import React, {useState} from 'react';
import axios from 'axios';


import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
  
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiUrl = process.env.REACT_APP_IMDB_URL;
  
  const search = (e)=>{
    //e.preventDefault();
    if(e.key === 'Enter'){
      axios(`${apiUrl}&s=${state.s}`).then((data)=>{
        let result = data.data.Search;
        setState(prevState=>{
          return{
            ...prevState,
            results: result
          }
        })
      });
    }
  }

  const handleInput = (e)=>{
    let search = e.target.value;
    setState(prevState=>{
      return {...prevState, s: search};
    });   
  }

  const openPopup = id=>{
    axios(`${apiUrl}&i=${id}`).then((data)=>{
      let result = data.data;
      setState(prevState=>{
        return {
          ...prevState,
          selected: result
        };
      });
    });
  }
  const closePopup = ()=>{
    setState(prevState=>{
      return{
        ...prevState,
        selected: {}
      };
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput = {handleInput} search={search}/>
        <Results results={state.results} openPopup={openPopup}/>
        {(typeof state.selected.Title != "undefined")? <Popup selected={state.selected} closePopup={closePopup}/>:false}
      </main>
    </div>
  );
}

export default App;
