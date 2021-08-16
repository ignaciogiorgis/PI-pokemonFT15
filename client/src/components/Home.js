import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, filterTypes, filterExist, ordAlfabetic, ordAttack } from '../actions';
import './styles/home.css'
import Pokemon from './Pokemon';
import Pagination from './Pagination';
import SearchPokemon from './SearchPokemon';

const Home = () => {
    const dispatch = useDispatch()
    
    const allPokemons = useSelector(state => state.pokemons)//arreglo de pokemons que me trae el reducer
    console.log('busqeuda:..........',allPokemons)
    const [orden, setOrden] = useState('');
    const [pageNumber, setPageNumber]  = useState(1); //numero de pagina
    const [pokemonsPerPage, setPokemonsPerPage]  = useState(9); // pokemons por pagina
    const lastPokemonIndex = pageNumber* pokemonsPerPage; //indice del ultimo pokemon en la pagina
    const firstPokemonIndex = lastPokemonIndex - pokemonsPerPage;// indice del primer pokemon
    const pokemonsCurrentPage = allPokemons.slice(firstPokemonIndex, lastPokemonIndex);
    console.log('final.....',pokemonsCurrentPage)
    const paged = (pageNumber)=> {
        setPageNumber(pageNumber)
    }
    
    //traer los pokemosn cuando el componente se monta
    useEffect(()=>{
        dispatch(getPokemons())
    }, [dispatch]);
   

     function handleRefresh(e){
        e.preventDefault();
        dispatch(getPokemons()) ;
      
    } 
    
    function handleFilterTypes(e){
        dispatch(filterTypes(e.target.value));
        setPageNumber(1)
    }
    
    function handleFilterExist(e){
        e.preventDefault();
        dispatch(filterExist(e.target.value))
        setPageNumber(1)
        setOrden(`ordenando ${e.target.value}`)
    }

    function handleAlfabetic(e){
        e.preventDefault(e)
        dispatch(ordAlfabetic(e.target.value));
        setPageNumber(1)
        setOrden(`ordenando ${e.target.value}`)

    }
    

    function handleOrderAttack(e){
        e.preventDefault(e)
        dispatch(ordAttack(e.target.value))
        setPageNumber(1)
        setOrden(`ordenando ${e.target.value}`)
    }
    
    return (
        <Fragment>
            <div className="menu">
                <div className="titulo">
                    <h1>Pokemon Api</h1>    
                </div> 
                <div className="buscador-principal">
                    <SearchPokemon />
                </div>
                <div className="menu-secundario">
                
                    <div>
                        <Link to="/formulario"><button className="boton">Crear Pokemon</button></Link>
                    </div>

                    <div className="container">
                        <div className="container-menu">
                            <label>Alfabetico</label>
                            <select onChange={(e) =>handleAlfabetic(e)} className="boton" >
                                <option >-- Elige --</option>
                                <option value="asc">Asendente</option>
                                <option value="desc">Desendente</option>
                            </select>
                        </div>
                        <div className="container-menu">
                            <label>Fuerza</label>
                            <select onChange={(e) =>handleOrderAttack(e)}  className="boton">
                                <option >-- Elige --</option>
                                <option  value="ascf">Asendente</option>
                                <option value="descf">Desendente</option>
                            </select>
                        </div>
                        <div className="container-menu">
                            <label>Existencia</label>
                            <select onChange={(e) =>handleFilterExist(e)}  className="boton">
                                <option value="all">Todos</option>
                                <option value="cre">Creados</option>
                                <option value="Ex">Existentes</option>
                            </select>
                        </div>

                        <div className="container-menu">
                            <label>Tipos</label>
                            <select  onChange={(e) =>handleFilterTypes(e)} className="boton">
                               <option value="all">Todos</option>
                               <option value="normal">Normal</option>
                               <option value="fighting">Pelea</option>
                               <option value="flying">Volador</option>
                               <option value="poison">Veneno</option>
                               <option value="ground">Suelo</option>
                               <option value="rock">Roca</option>
                               <option value="water">Agua</option>
                               <option value="bug">Insecto</option>
                               <option value="ghost">Fantasma</option>
                               <option value="steel">Metal</option>
                               <option value="grass">Planta</option>
                               <option value="fire">Fuego</option>
                               <option value="electric">Electrico</option>
                               <option value="psychic">Psiquico</option>
                               <option value="ice">Hielo</option>
                               <option value="dragon">Dragon</option>
                               <option value="dark">Maligno</option>
                               <option value="fairy">Hada</option>
                               <option value="unknown">Desconosido</option>
                               <option value="shadow">Sombra</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button className="boton" onClick={(e)=>handleRefresh(e)}>Refrescar Pagina</button>
                    </div>
                
                </div>
            </div> 
                <div>
                    <Pagination
                        allPokemons={allPokemons.length}
                        paged={paged}
                        pokemonsPerPage={pokemonsPerPage}
                    />    
                </div>

                 <div className="img-pokemon"> 
                    {pokemonsCurrentPage && pokemonsCurrentPage.map((p, id)=>{
                        return (
                            
                            <Pokemon key={id} name={p.name} img={p.img} types={p.types} />
                            
                    )   
                    })}
                </div> 

               <div className="footer">
                   <h3>Api pokemon</h3>
               </div>
         
       
        </Fragment>           
);
}
 
export default Home;
