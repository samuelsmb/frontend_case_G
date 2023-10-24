import React, { useState } from 'react';
import { Pokemon } from '../../types';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { PokemonModal } from './PokemonModal';

interface Props {
  pokemon?: Pokemon;
}



export const InfoContainer: React.FunctionComponent<Props> = ({ pokemon }) => {

  const [moves, setMoves] = useState({
    move1: "",
    move2: ""
  })

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const getMoveDescription = (url1:any, url2:any) => {

    setMoves(prevState => {
      return  { ...prevState, move1: "", move2:"" }
    });  
    

    axios.get(url1).then((res) => {
      let results = res.data
      const move1 = results.flavor_text_entries[1].flavor_text

      setMoves(prevState => {
        return  { ...prevState, move1: move1 }
      });      

    }).catch((e) => {
      console.log(e.message);
      
    })

    axios.get(url2).then((res) => {
      let results = res.data
      const move2 = results.flavor_text_entries[1].flavor_text
      setMoves(prevState => {
        return  { ...prevState, move2: move2 }
      });      

    }).catch((e) => {
      console.log(e.message);
      
    })
  }

     
  React.useEffect(() => {

    if (pokemon) {
      
      getMoveDescription(pokemon.moves.at(0)?.move.url, pokemon.moves.at(1)?.move.url)
    }
  }, [pokemon]);


  if (pokemon) {

    let name = pokemon.name.replace(pokemon.name.charAt(0), pokemon.name.charAt(0).toUpperCase())
    

    return (
      <Box>
        <Card sx={{ width: 300, border:10 }} >
          <CardActionArea onClick={handleOpen} >

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>

              <CardMedia
              sx={{ border:1, borderColor:blue[500], background:blue[200] }}
              component="img"
              height={250}
              
 
              image={pokemon.sprites.other.dream_world.front_default}
              alt={`${pokemon.name} illustration`}
            />
              
              <Typography variant="body2" color="text.secondary">
              NO: {pokemon.id}. HT: {pokemon.height}. WT: {pokemon.weight}.
              </Typography>
                
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight:'bold' }}>
                Moves:                
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ fontWeight:'bold' }}>
                {pokemon.moves.at(0)?.move.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {moves?.move1}
              </Typography>

              
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight:'bold' }}>
                {pokemon.moves.at(1)?.move.name}
               </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb:3 }}>
                {moves?.move2}
               </Typography>


              

            </CardContent>
          </CardActionArea>
        </Card>

        <PokemonModal 
          pokemon={pokemon} 
          open={open} 
          handleClose={handleClose} 
          handleOpen={handleOpen} 
        />

      </Box>
    );
  }
  return null;
};
