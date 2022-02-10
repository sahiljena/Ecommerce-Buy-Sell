import React,{useState, useEffect} from 'react';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import useToken from './components/useToken'
import Register from './pages/Register'
import NewProduct from './pages/NewListing'
import MyListings from './pages/Mylistings'
import Category from './pages/Category'
import Searchbar from './components/Searchbar'
import Productpage from './pages/Productpage'
import {Routes,Route} from "react-router-dom"

function App() {

  const {token, setToken} = useToken();

  return(
    <>
    <Routes>
      <Route path='/' exact element={<Home setToken={setToken} token={token} />} />
      <Route path='/login' exact element={<Login setToken={setToken} token={token} />} />
      <Route path='/register' exact element={<Register setToken={setToken} token={token} />} />
      <Route path='/additem' exact element={<NewProduct setToken={setToken} token={token}  />} />
      <Route path='/search' exact element={<Searchbar token={token} setToken={setToken}   />} />
      <Route path='/item/:id' exact element={<Productpage token={token} setToken={setToken} />} />
      <Route path='/mylistings' exact element={<MyListings setToken={setToken} token={token}  />} />
      <Route path='/mobiles' exact element={<Category setToken={setToken} token={token} endpoint={"http://localhost:5000/api/listings/mobile"} category={"Mobiles"}  />} /> 
      <Route path='/books' exact element={<Category setToken={setToken} token={token} endpoint={"http://localhost:5000/api/listings/book"} category={"Books"}  />} /> 
      <Route path='/laptops' exact element={<Category setToken={setToken} token={token} endpoint={"http://localhost:5000/api/listings/laptop"} category={"Laptops"}  />} /> 
    </Routes>
    </>
  );
}

export default App;
