const { Router } = require('express');
const router = Router();
const axios = require('axios');
const {pokemonListDescription, getPokemonId, getPokemonQuery, getPokemonDb, getPokemonDbQuery} = require('./utils.js');
const { Pokemon, Type} = require('../db.js');
const { Sequelize } = require('sequelize');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/pokemons', pokemonsRouter);
router.get('/pokemons', async (req, res)=> {
    const {name} = req.query;
    if(name){
        
        try{
            const QueryPokemon = await getPokemonQuery(name);
            if(QueryPokemon){ 
                return res.json(QueryPokemon);
            }
        }catch(err){
            try{
                const QueryPokemonDb = await getPokemonDbQuery(name)
                if(QueryPokemonDb){
                    return res.json(QueryPokemonDb);
                }else{
                    res.json('no existe el pokemon en la base de datos ni en la api')
                }
            }
            catch(error){
                res.status(404).send(error)
            }
        }
    }else{
        
        try{
            let resultadoPokemon = await pokemonListDescription()
            res.json(resultadoPokemon)
        }catch(error){
            res.status(404).send(error)
        }   
    }
});


router.get('/pokemons/:id', async (req, res) => {
        const {id} = req.params;
        try {
            if( id < 899){
                let pokemonId = await getPokemonId(id); 
               return  res.json(pokemonId);
            }else { 
                let pokemonDb = await getPokemonDb(id);
                return  res.json(pokemonDb);
            }  
        } catch (error) {
                return res.status(404).send(error)
        }
});




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
    types.map(async (p) => { 
         let typePoke = await Type.findAll({ 
             where: { 
                 name: p 
            } 
         }) 
         newPokemon.addType(typePoke) 
     }); 
    res.json(newPokemon)
})

router.get('/types', async (req, res)=>{
    let typesListDb = await Type.findAll({
        attributes: ['name']
    })
    res.json(typesListDb)
})






module.exports = router
