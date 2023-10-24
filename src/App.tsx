import React, { useEffect, useState } from 'react';
import { fetchPokemon } from './utils';
import { Pokemon } from './types';
import background from './components/img/International_Pokémon_logo.png';


import './app.css';
import { Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { InfoContainer } from './components/app/InfoContainer';


const App = () => {
  // const [pokemon, setPokemon] = useState<Pokemon>();

  const [list, setList] = useState<Pokemon[]>([]);

  
  const [state, setState] = React.useState({
    pokemon: "",
    amnt: '10',
    searched: false,
  });


  const addObjectToList = async (pokemonName: string) => {
    try {
      const pokemon = await fetchPokemon(pokemonName);

      setList(prevArray => [
        ...prevArray,
        pokemon,
      ]);

      setList(prevArray => [...prevArray].sort((a, b) => a.id - b.id));
    } catch (error) {
      console.log(error);
      
    }
  };


  const handleAmnt = (event: SelectChangeEvent) => {

    setState(prevState => {
      return { ...prevState, 
        searched: false, 
        amnt: event.target.value 
      }
    })
  };


  const search = (e:any) => {
    if (e.key === "Enter" || e.button === 0) {
      try{
        console.log(state.pokemon);
        
        addObjectToList(state.pokemon)


        setState(prevState => {
          return { ...prevState, searched: true }
        });

      } 
      
      catch (error) {
        console.log(error);

        setState(prevState => {
          return { ...prevState, searched: false }
        });
      }
    }
  }
  
  
  const handleInput = (e:any) => {
    e.preventDefault()
    
    let pokemon = e.target.value

    if (pokemon === "") {
      return;
    }

    setState(prevState => {
      return { ...prevState, pokemon: pokemon }
    });
  }
  

  useEffect(() => {
  

    const fetchData = async () => {
      // Toemmer lista ved hver useefect for å unngå duplikater av pokemonkort
      setList([])

      if (!state.searched) {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${state.amnt}`);
          const pokemonResults = response.data.results;

          await Promise.all(
            pokemonResults.map((p: any) => addObjectToList(p.name))
          );
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [state.searched, state.amnt]);

  return (
    <div className='appRoot'>

      <Box
        sx=
        {{ 
          m:5, 
          maxWidth:"100%",
          width:900,
        }}
      
      >
        <img src={background} width='100%' height={300} />


        <TextField 
          id="standard-basic" 
          label="Search for a pokemon..." 
          variant="filled"  
          fullWidth
          onChange={handleInput}
          onKeyDown={search}
          InputProps={{
            endAdornment: (
                <InputAdornment position='end'>
                  <IconButton aria-label="search" onClick={search}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
            )
          }}
        />

        <FormControl sx={{ mt:3, minWidth: 120 }} size="small">
          <InputLabel id="select-small-label">Amount</InputLabel>
          <Select
            labelId="select-small-label"
            id="select-small"
            value={state.amnt}
            label="Amount"
            onChange={handleAmnt}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>

          </Select>
        </FormControl>



        <Grid sx={{ flexGrow: 1, mt:5 }} container spacing={2}>
          <Grid container columns={{ xs: 12 }}>
            <Grid container justifyContent="center" spacing={12}>
              {list.map((value, i) => (
                <Grid key={i} item>
                  <InfoContainer pokemon={value}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

    </div>
  );
};

export default App;
