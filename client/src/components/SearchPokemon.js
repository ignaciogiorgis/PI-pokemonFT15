import React from 'react';
import { useState } from "react";
import { useDispatch} from "react-redux";
import {searchName} from '../actions';
import './styles/form.css';

const SearchPokemon = ({setPageNumber}) => {
   const dispatch = useDispatch();
   const [name, setName] =  useState('');
   const [, setOrden] = useState('');

   function handleInputChange(e){
       e.preventDefault();
       setName(e.target.value)
    }
   function handleSubmit(e){
        e.preventDefault();
        dispatch(searchName(name.toLowerCase()))
        setPageNumber(1)
        setOrden(`ordenando ${e.target.value}`)
        setName('')
   }
   
    return (
        <div className="container-search">
            <input type="text"
                   placeholder="Pokemon..."
                   value={name}
                   onChange={(e)=>handleInputChange(e)}
            />
            
            <button className="boton-home type1"  onClick={(e)=>handleSubmit(e)}>Buscar</button>
            
        </div>
      );
}
 
export default SearchPokemon;