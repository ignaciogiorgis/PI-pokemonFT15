const { Router, query } = require('express');
const router = Router();
const axios = require('axios');
const {pokemonListDescription, getPokemonId, getPokemonQuery, getPokemonDb, getPokemonDbQuery} = require('./utils.js');
const { Pokemon, Type} = require('../db.js');
const { Sequelize } = require('sequelize');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let pokemonId= 900
//router.use('/pokemons', pokemonsRouter);
router.get('/pokemons', async (req, res)=> {
    const {name} = req.query;
    if(name){
        
        try{
            const QueryPokemon = await getPokemonQuery(name);
            if(QueryPokemon){ 
                let arrayQuery = []
                arrayQuery.push(QueryPokemon)
                return res.json(arrayQuery);
            }
        }catch(err){
            try{
                const QueryPokemonDb = await getPokemonDbQuery(name)
                if(QueryPokemonDb){
                    
                    let arrayDbQuery =[]
                    arrayDbQuery.push(QueryPokemonDb)
                    
                    return res.json(arrayDbQuery);
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
                let arrayDb = [] 
                let pokemonDb = await getPokemonDb(id);
                
                arrayDb.push(pokemonDb)
                
                return  res.json(arrayDb);
            }  
        } catch (error) {
                console.log(error)
                return res.status(404).send(error)
        }
});




router.post('/pokemons', async(req,res)=>{
    let { name, hp, attack, defense, speed, height, weight, img, types} = req.body;
    
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
     
         let typePoke = await Type.findAll({ 
             where: { 
                 name: types
            } 
         }) 
         
         newPokemon.addType(typePoke)
         
    res.json(newPokemon)
})

router.get('/types', async (req, res)=>{
     
    let typesListDb = await Type.findAll({
        attributes: ['name']
    })
    res.json(typesListDb)
})






module.exports = router
