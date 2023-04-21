import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Recipe from './Recipe';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    margin: '10px auto',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));






function App() {
  const classes = useStyles();
  const APP_ID = "d29d40f6";
  const APP_KEY = "5b19a6bd355a2ff2a764d0059f30cf7b";
  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('mango')


  useEffect(() => {
    getRecipe();
  }, [query]);


  const getRecipe = () => {
    axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
      .then((res) => {
        if (res) {
          setRecipes(res.data.hits);
          console.log(res.data.hits);
        }
      })

  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  const updateQuery = (e) => {
    e.preventDefault();
    setQuery(search)
  }
  return (
    <div>

      <Paper onSubmit={updateQuery} component="form" className={classes.root}>
        <InputBase
          type='text' value={search} onChange={updateSearch}
          className={classes.input}
          placeholder="Search for recipe...."
          inputProps={{ 'aria-label': 'search any food' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <SearchIcon />
        </IconButton>

      </Paper>
      {/* <form onSubmit={updateQuery}>
        <input type='text' value={search} onChange={updateSearch} />
        <button type='submit'>Search</button>
      </form> */}
      <div style={{ margin: "10px" }}>
        <Grid container>

          {recipes.map((item) => (<Grid item xs={3}>
            <Recipe key={item.recipe.label}
              tittle={item.recipe.label}
              calories={item.recipe.calories}
              image={item.recipe.image}
              ingredients={item.recipe.ingredients} />
          </Grid>))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
