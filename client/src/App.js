import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import { ToastContainer } from 'react-toastify';
import Appheader from './Appheader';
import Admin from './admin';
import History from './history';
import FoodList from './foodList';
import AddBranch from './addBranch';
import { useState } from 'react';

function App() {
  const [key,setKey]=useState(0)
  // const route=useRoutes()
  // console.log(route)
  return (
    <div className="App">
      <ToastContainer theme='colored' position='top-center'></ToastContainer>
      <BrowserRouter>
      {/* <Appheader></Appheader> */}
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/foodList' element={<FoodList />}></Route>
        <Route path='/Admin' element={<Admin />}></Route>
        <Route path='/history' element={<History />}></Route>
        <Route path='/addBranch' element={<AddBranch />}></Route>

      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;