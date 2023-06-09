import React, { FC, useState } from 'react';
import './Routing.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from '../../SignUpForm/RegistrationPage';
import Home from '../../HomePage/Home';
import RoutingGuard from '../../Guard/RoutingGuard';
import AddTodo from '../../HomePage/AddTodo';
import Alltodos from '../../HomePage/AllTodos';
import { LoginForm } from '../../NewLoginForm/LoginForm';

interface RoutingProps {}

const Routing: FC<RoutingProps> = () => {
  const [isLogin,setLogin]=useState(true)
 function checkLogin()
 {
    setLogin(true);
 }

  return(
  <div className="Routing" data-testid="Routing">

    <Routes>
    <Route  path="/" element={<LoginForm ></LoginForm>} />
    <Route path="/registrationPage" element={<RegistrationPage></RegistrationPage>} />
    <Route path='/HomePage' element={<RoutingGuard component={<Home />}></RoutingGuard>}>
    <Route path="AddTodo" element={<AddTodo></AddTodo>} />
    <Route path="AllTodos" element={<RoutingGuard component={<Alltodos />}></RoutingGuard>}/>
    </Route>
    </Routes>

  </div>
  )
}

export default Routing; 
