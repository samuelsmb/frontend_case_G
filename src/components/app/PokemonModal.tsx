import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Pokemon } from '../../types';



const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ComponentProps {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  pokemon: Pokemon

}


export const PokemonModal: React.FC<ComponentProps> = (props) =>  {

  let abilitiesList = []

  let abilities = props.pokemon.abilities
  for (const ability of abilities) {
    abilitiesList.push(ability.ability.name)
  }
  
  
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <img width={200} src={props.pokemon.sprites.other.dream_world.front_default} alt={`${props.pokemon.name} illustration`}/>

          <Typography variant="body2" color="text.secondary">
            NO: {props.pokemon.id}. HT: {props.pokemon.height}. WT: {props.pokemon.weight}.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Pokemon type: {props.pokemon.types[0].type.name}
          </Typography>

          <Typography variant="h6" color="bold" sx={{ mt:3 }}>
            Abilities:    
          </Typography>

          <Box>
          {
            abilitiesList.map((value, _index) => (
              <Typography key={_index} variant="body2" color="text.secondary">
                {value}
              </Typography>
            ))
          }
          </Box>
        </Box>
      </Modal>
    </div>
  );
}