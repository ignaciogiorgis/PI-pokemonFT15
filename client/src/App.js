import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Form from './components/Form';
import DetailPokemon from './components/DetailPokemon'


function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/formulario' component={Form}/>
      <Route path='/detail' component={DetailPokemon}/>
        
    
       
    </BrowserRouter>
  );
}

export default App;
