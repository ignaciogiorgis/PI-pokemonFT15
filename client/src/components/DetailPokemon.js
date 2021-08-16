import React, {Fragment} from 'react';


const DetailPokemon = ({id,name, hp, attack, defense, speed, height, weight, img, types}) => {
    return (
      <Fragment>
        <h2>{name}</h2>
        <p>{hp}</p>
      </Fragment>
      );
}
 
export default DetailPokemon;