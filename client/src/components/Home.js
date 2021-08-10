import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pokemons from '../reducer/index'
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons } from '../actions';
import './styles/home.css'
import Pokemon from './Pokemon';

const Home = () => {
    const dispatch = useDispatch()
    const allPokemons = useSelector(state => state.pokemons)
    
    //traer los pokemosn cuando el componente se monta
    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch]);
       
    return (
        <div className="menu">
            <div className="titulo">
                <h1>Pokemon Api</h1>    
            </div> 
          <div className="menu-secundario">

                <div>
                    <Link to="/pokemon"><button className="boton">Crear Pokemon</button></Link>
                </div>

                 <div>
                    <select className="boton" >
                        <option value="asc">Asendente</option>
                        <option value="desc">Desendente</option>
                        <option value="fue">Fuerza</option>
                        <option value="cre">Creados</option>
                        <option value="Ex">Existentes</option>
                    </select>
                </div>

                 <div>
                    <button className="boton">Refrescar Pagina</button>
                </div>

                {
                allPokemons?.map((p)=>{
                    return (
                    
                        <Pokemon name={p.name} img={p.img} types={p.types} />
                   )   
                })}
          </div>
        </div>
           
);
}
 
export default Home;
