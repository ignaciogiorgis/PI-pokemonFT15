const axios = require('axios');
const { Pokemon, Type} = require('../db.js');
const { Sequelize } = require('sequelize');




//busco y traigo de la api los primeros 40 pokemons
let url = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonList = async () =>{
    let firstTwenty = await axios.get(url); 
    let secondsTwenty = await axios.get(firstTwenty.data.next);
    let pokemonsTotal = [...firstTwenty.data.results, ...secondsTwenty.data.results]
    return pokemonsTotal;
}



//devuelve el listado de los primeros 40 mas los creados por el usuario en la base de datos
let pokemonListDescription = async ()=>{
    //busco y traigo todos los pokemosn creados en la DB
    let pokemonsListDb = await Pokemon.findAll({
        include: { model: Type }
    })
    
    let resultPokemon = await pokemonList();
    
    let newArrayPokemons = [];
        resultPokemon.map((poke)=>{(newArrayPokemons.push(poke.url))});
        let secondNewArrayPokemon = [];
        
        newArrayPokemons.map((url)=>{secondNewArrayPokemon.push(axios.get(url))})
        
        let conjuntPromisesPokemon = Promise.all(secondNewArrayPokemon)
        .then(pokemon => {
        let arrPoke = []
        pokemon.map((pokem)=>{
            arrPoke.push(pokem.data)
        })
      
        let arrPoke2 = []
        arrPoke.map((pokeStats)=>
            arrPoke2.push({
                id:pokeStats.id,
                name:pokeStats.name,
                hp: pokeStats.stats[0].base_stat,
                attack: pokeStats.stats[1].base_stat,
                defense: pokeStats.stats[2].base_stat,
                speed: pokeStats.stats[5].base_stat,
                height: pokeStats.height,
                weight: pokeStats.weight,
                img: pokeStats.sprites.other.dream_world.front_default,
                type: pokeStats.types.map(typePoke=>typePoke)  
            })
        )
       
        return arrPoke2
    })
    
   return (await conjuntPromisesPokemon).concat(pokemonsListDb)

}


//busca pokemons por id
const getPokemonId = async (id)=>{
    const pokemonDataId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        
        const pokeArrayUnit = [];
        pokeArrayUnit.push(pokemonDataId.data);
    
        const IndividualPokemon = [];
        pokeArrayUnit.map(pokId => {
        IndividualPokemon.push({
        	id:pokId.id,
	    	name:pokId.name,
	    	hp:pokId.stats[0].base_stat,
	    	attack:pokId.stats[1].base_stat,
	    	defense:pokId.stats[2].base_stat,
	    	speed:pokId.stats[5].base_stat,
	    	height:pokId.height,
	    	weight:pokId.weight,
	    	img:pokId.sprites.other.dream_world.front_default,
	    	type:pokId.types.map(typePoke=>typePoke.type.name)  
        })})
            return IndividualPokemon;
} 

// busca pokemons por query
const getPokemonQuery = async (name) =>{
    const pokemonDataQuery = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
   
    const pokemonFind = pokemonDataQuery.data.results.filter((pokeQuery)=>{
            const pName = pokeQuery.name;
            const pokName = name.toLowerCase();
           return pName === pokName; 
    });
    
    const pokemonQueryStats = await axios.get(pokemonFind[0].url);
    const pokeArrayUnit = [];
    pokeArrayUnit.push(pokemonQueryStats.data);
    
    const IndividualPokemon = [];
        pokeArrayUnit.map(pokId => {
        IndividualPokemon.push({
	        id:pokId.id,
	        name:pokId.name,
	        hp:pokId.stats[0].base_stat,
	        attack:pokId.stats[1].base_stat,
	        defense:pokId.stats[2].base_stat,
	        speed:pokId.stats[5].base_stat,
	        height:pokId.height,
	        weight:pokId.weight,
	        img:pokId.sprites.other.dream_world.front_default,
	        type:pokId.types.map(typePoke=>typePoke.type.name)  
})})
    
    return IndividualPokemon;
}   

// carga todos los tipos en la base de datos
const baseDataTypes = async () =>{
    let types = await axios.get('https://pokeapi.co/api/v2/type');
    typesDb = types.data.results;
    typesDb.map(async (pokeType) => {
      await Type.findOrCreate({
        where: {
          name: pokeType.name
        }
      });
    });    
}


module.exports={
    pokemonListDescription,
    getPokemonId,
    getPokemonQuery,
    baseDataTypes,
} 