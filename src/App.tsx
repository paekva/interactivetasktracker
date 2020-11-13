import React from 'react';
import './App.css';
import {ListWrapper} from "./components/ListsWrapper";
import {ToDo} from "./components/ToDo";

function App() {
  return (
    <div className='app'>
      <ListWrapper>
        <ToDo />
        <div>2</div>
        <div>3</div>
      </ListWrapper>
    </div>
  );
}

export default App;
