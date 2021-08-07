const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {pokemonListDescription, getPokemonId, getPokemonQuery} = require('./utils.js');
const { Pokemon, Type} = require('../db.js');
const { Sequelize } = require('sequelize');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/pokemons', pokemonsRouter);
router.get('/pokemons', async (req, res)=> {
    try{
        let resultadoPokemon = await pokemonListDescription()
        res.json(resultadoPokemon)
    }catch(error){
        res.status(404).send('Conexion fallida no se pueden mostrar los Pokemon')
    }});


router.get('/pokemons/:id', async (req, res) => {
        const {id} = req.params;
        try{ 
             let pokemonId = await getPokemonId(id);
             res.json(pokemonId);
        }catch(error){
            res.status(404).send('Pokemon no encontrado en la API')
        }});


router.get('/pokemons', async (req,res)=>{
    const name = req.query.name;
    try{
        const QueryPokemon = await getPokemonQuery(name);
        res.json(QueryPokemon);
    }catch(error){
        res.status(404).send('El pokemon no Existe en la API')
    }
    
})

router.post('/pokemons', async(req,res)=>{
    let { name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    
    let pokemonId= 900
        const newPokemon = await Pokemon.create({
            id: pokemonId++,
            name: name,
            hp: hp,
            attack: attack,
            defense: defense,
            speed: speed,
            height: height,
            weight: weight,
            img: img
           
    })
    //console.log('poke nuwevo', newPokemon)
   /*  types.map(async (p) => { */
   /*      let typePoke = await Type.findAll({ */
   /*          where: { */
   /*              name: p */
   /*          } */
   /*      }) */
   /*      Pokemon.familias_pokemon(typePoke) */
   /*  }); */
        
         res.json(newPokemon)
})

router.get('/types', async (req, res)=>{
    let typesListDb = await Type.findAll({
        attributes: ['name']
    })
    
    res.json(typesListDb)
})






module.exports = router
