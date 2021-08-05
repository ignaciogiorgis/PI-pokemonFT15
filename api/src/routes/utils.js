const axios = require('axios');

//funcion para obtener los primeros 40 en la forma Array = {name, url}
let url = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonList = async () =>{
    let firstTwenty = await axios.get(url) 
    let secondsTwenty = await axios.get(firstTwenty.data.next)
    let pokemonsTotal = [...firstTwenty.data.results, ...secondsTwenty.data.results]
    return pokemonsTotal;
}


let pokemonListDescription = async ()=>{
    let resultPokemon = await pokemonList();
    
        let newArrayPokemons = [];
        resultPokemon.map((poke)=>{(newArrayPokemons.push(poke.url))});// arreglo de url
        //console.log(newArrayPokemons)
        let secondNewArrayPokemon = [];
        
        newArrayPokemons.map((url)=>{secondNewArrayPokemon.push(axios.get(url))})//arreglo de promesas
        //console.log(secondNewArrayPokemon)
        let conjuntPromisesPokemon = Promise.all(secondNewArrayPokemon)
        .then(pokemon => {
        let arrPoke = []//arreglo de data de cada pokemon
        pokemon.map((pokem)=>{
            arrPoke.push(pokem.data)
        })
        //console.log(arrPoke)
        let arrPoke2 = []
        arrPoke.map((pokeStats)=>
            arrPoke2.push({
                id:pokeStats.id,
                name:pokeStats.name,
                img: pokeStats.sprites.other.dream_world.front_default,
                type: pokeStats.types.map(typePoke=>typePoke)  
            })
        )
        //console.log(arrPoke2)
        return arrPoke2
    })

   return conjuntPromisesPokemon;

}


const prueba = async (id) => {
    let pokemonId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    console.log(pokemonId)
}

//prueba(35)

module.exports= pokemonListDescription