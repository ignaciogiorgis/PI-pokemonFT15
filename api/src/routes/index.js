const { Router } = require('express');
const router = Router();
// Ejemplo: const authRouter = require('./auth.js');
//const pokemonsRouter = require('./pokemons.js');
const axios = require('axios');
const pokemonListDescription = require('./utils.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/pokemons', pokemonsRouter);

router.get('/pokemons', async (req, res)=> {
    let resultadoPokemon = await pokemonListDescription()
    res.json(resultadoPokemon)
   
});

router.get('/pokemons/:id', async  (req, res)=>{
    //const { id }= req.params.id;
    //let pokemonId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}/`)
   
    //consolog.log(pokemonId)
   //res.json(pokemonId)
    
})





module.exports = router
