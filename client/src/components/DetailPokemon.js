import React, {Fragment} from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import {getDetail} from '../actions';
import { Link } from 'react-router-dom';
import './styles/deteail.css';
import Spinner from './Spinner';


const DetailPokemon = (props) => {
  const dispatch = useDispatch()
  const [cargando, guardarCargando] = useState(true);
  
  useEffect(() => {
    dispatch(getDetail(props.match.params.id))
  }, [dispatch])

  const pokemonId = useSelector(state=> state.pokemonsDetail)

  setTimeout(() => {
    guardarCargando(false)
  }, 2500);


    return (
      <Fragment>
        <div className="fondo-detail">
        {
          pokemonId.length > 0 ?
            <div className="detail-principal">
              <div className="stats">
                <h2>NOMBRE :{pokemonId[0].name}</h2>
                <img src={pokemonId[0].img} alt="not found" />
              </div>
              <div className="stats">
                <p>NUMERO :{pokemonId[0].id} </p>
                <p>FUERZA :{pokemonId[0].attack} </p>
                <p>DEFENSA :{pokemonId[0].defense} </p>
                <p>VELOCIDAD :{pokemonId[0].speed} </p>
                <p>ALTURA :{pokemonId[0].height} </p>
                <p>PESO :{pokemonId[0].weight} </p>
                <div className="tip">
                  <p>TIPOS  :</p>
                  {pokemonId[0].id < 900  ? pokemonId[0].types.map((e)=>{return <p> {e} </p> }) :
                    pokemonId[0].types.map((e)=>{return <p> {e.name} </p> })    } 
                </div>
               </div>
            </div> 
            
            : 
             null

        }

        <Link to="/home">
          <button className="boton-detail container-btn type1">Volver</button>
        </Link>
        <div className="footer-detail">
                   <h3>Api pokemon</h3>
               </div>
        </div>
        {cargando ? <Spinner /> : null}  
      </Fragment>
      );
}
 
export default DetailPokemon;