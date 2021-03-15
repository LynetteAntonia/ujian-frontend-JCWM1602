import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Register from './Pages/Register';
import Login from './Pages/Login'
import Home from './Pages/Home';
import DetailProduct from './Pages/DetailProduct';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';

const account = localStorage.getItem('id')

export default class App extends React.Component{
  render(){
    return(
      <>
        <BrowserRouter>
        <Navbar/>
        <Switch>
            <Route exact path='/home'component ={Home}/>
            <Route path='/register'component ={Register}/>
            <Route path='/login'component ={Login}/>
            <Route path='/detail'component ={DetailProduct}/>
            <Route path='/cart'component ={Cart}/>
            <Route path='/checkout'component ={Checkout}/>
        </Switch>
        </BrowserRouter>
      </>
    )
  }
}