import React from 'react';
import { useState } from "react";
import { useDispatch} from "react-redux";
import {searchName} from '../actions';
import './styles/form.css';
import {Link} from 'react-router-dom'





const SearchPokemon = () => {
   const dispatch = useDispatch();
   const [name, setName] =  useState('');

   function handleInputChange(e){
       e.preventDefault();
       setName(e.target.value)
    }
   function handleSubmit(e){
        e.preventDefault();
        dispatch(searchName(name))
   }
   
    return (
        <div className="container-search">
            <input type="text"
                   placeholder="Pokemon..."
                   value={name}
                   onChange={(e)=>handleInputChange(e)}
            />
            
            <button className="boton"  onClick={(e)=>handleSubmit(e)}>Buscar</button>
            
        </div>
      );
}
 
export default SearchPokemon;