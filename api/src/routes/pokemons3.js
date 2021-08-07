const router = require('express').Router();
const axios = require('axios');
const sequelize = require('sequelize')

// Model
const { Pokemon, Type } = require('../db.js');

//Utils
const url = 'https://pokeapi.co/api/v2/pokemon/'
let pokeId = 900;


// Routes
router.get('/pokemons', async (req, res) => {
    // Traigo los pokemons de la DB
    let pokemonsListDb = await Pokemon.findAll({
        include: { model: Type }
    })
    // 2 consultas a la API, y concatenado
    const pokemonsList1 = await axios.get(url)
    pokemonsList2 = await axios.get(pokemonsList1.data.next)
    // Concateno y me quedo con results
    pokemonsListG = [...pokemonsList1.data.results, ...pokemonsList2.data.results]
    
    // Iterado y armado de la info que se va a enviar
    if(!pokemonsListG){
        res.status(404).send('No se pudo obtener la info de la API')
    }
    else{
       
        pokemonsListG = pokemonsListG.map(async e => {
            return await axios.get(e.url)
        })
        // Resuelvo cada elemento
        pokemonsListG = Promise.all(pokemonsListG)
            .then(poke => {
                const pokemonsFinal = []
                const pokemonsResult = poke.map(e => e.data)
                
                pokemonsResult.map(e => {
                    pokemonsFinal.push({
                        id: e.id,
                        name: e.name,
                        img: e.sprites.other.dream_world.front_default,
                        types: e.types.map(p => p)
                    })
                })
                // Concateno los pokemones de la DB con los de la APi ya mapeados
                return pokemonsFinal.concat(pokemonsListDb)
            })
            .then(response => {
                try{
                    res.send(response)
                }catch(error){
                    res.status(404).send(error)
                }
            })
    }
})


// Route para crear pokemon
router.post('/pokemons', async (req, res) => {
    // Destructuring de lo que me pasan por body para crear el pokemon
    const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;

    // Create
    const pokemon = await Pokemon.create({
        id: pokeId++,
        name: name,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
        img: img
    })

    // Le agrego los types que me pasaron por body
    types.map(async e => {
        let type = await Type.findAll({
            where: {
                name: e
            }
        })
        pokemon.addType(type)
    })
    // Retorno
    res.json(pokemon)
})


module.exports = router