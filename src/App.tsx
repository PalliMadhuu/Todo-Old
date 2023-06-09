import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routing from './Routes/Routing/Routing';
import { LoginForm } from './NewLoginForm/LoginForm';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routing></Routing>
    </BrowserRouter>


    </div>
  );
}

export default App;
