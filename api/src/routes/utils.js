const axios = require('axios');
const { Pokemon, Type} = require('../db.js');
const { Sequelize } = require('sequelize');




//busco y traigo de la api los primeros 40 pokemons
let url = 'https://pokeapi.co/api/v2/pokemon?limit=45'
const pokemonList = async () =>{
    let firstTwenty = await axios.get(url);
    let pokemonsTotal = [...firstTwenty.data.results]
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
                types: pokeStats.types.map(p=>p.type.name)  
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
	    	types:pokId.types.map(typePoke=>typePoke.type.name)  
        })})
            return IndividualPokemon;
} 

//busca pokemon creado en bd por id
const getPokemonDb = async (id)=>{
    let pokemosDb = await Pokemon.findByPk(id,{
        include : Type
    });
   
    return pokemosDb;
} 

//busca pokemon creado en bd por query
 const getPokemonDbQuery = async (name)=>{
     try{
        let pokemonQuery = await Pokemon.findAll({
            where:{name: name},
            include : {
                model : Type
             }
        })

        return pokemonQuery[0] 
     }catch(error){
         return error;
     }
   
    
} 


// busca pokemons por query
const getPokemonQuery = async (name) =>{
    const pokemonDataQuery = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    
  
    const pokeArrayUnit = [];
    pokeArrayUnit.push(pokemonDataQuery.data);
    
    const IndividualPokemon = [];
        pokeArrayUnit.map((pokId) =>  {
         IndividualPokemon.push( {
	        id:pokId.id,
	        name:pokId.name,
	        hp:pokId.stats[0].base_stat,
	        attack:pokId.stats[1].base_stat,
	        defense:pokId.stats[2].base_stat,
	        speed:pokId.stats[5].base_stat,
	        height:pokId.height,
	        weight:pokId.weight,
	        img:pokId.sprites.other.dream_world.front_default,
	        types:pokId.types.map(typePoke=>typePoke.type.name)  
})})
    if(IndividualPokemon.length>=0){
        return IndividualPokemon[0]
    }else{
        return 'error';
    }
   /*  let allPokemons = await pokemonListDescription();
    let resp; 
    allPokemons.forEach((e)=>{
        console.log(e.name)
        if(e.name.includes(name)){
            resp = e
    }
        
    })
    console.log(resp)
    return resp;
 */


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
    getPokemonDb,
    getPokemonDbQuery
} 