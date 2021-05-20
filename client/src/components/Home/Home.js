import React, { useState, useEffect } from "react";
import { Paper, Container, Grow, Grid, AppBar, TextField, Button } from "@material-ui/core";
import {useDispatch} from "react-redux";
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import {getPostsBySearch} from "../../actions/posts"
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles"
import Pagination from '../Pagination/Pagination'

// URL Search params use to know page you're on, or searching for. from react-router-dom
function useQuery(){
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const tagsQuery = query.get('tags');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  // search posts from api directly
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  useEffect(()=>{
    if(searchQuery || tagsQuery) dispatch(getPostsBySearch({search: searchQuery, tags: tagsQuery}));
  })

  const searchPost = () =>{
    if(search.trim() || tags){
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    }
    else{
      history.push('/');
    }
  }
  const handleKeyPress = (e) =>{
    if(e.keyCode === 13){
      searchPost();
    }
  }

  const handleTagAdd = (tag)=> setTags([ ...tags, tag]);

  const handleTagDelete =  (tagToDelete)=> setTags(tags.filter(tag=>tag!==tagToDelete));

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          container
          className={classes.gridContainer}
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={search} onChange={(e)=>setSearch(e.target.value)}
                onKeyPress={handleKeyPress} />
              <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleTagAdd} onDelete={handleTagDelete} label="Search Tags" variant="outlined"/>
              <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
            <Paper elevation={6} className={classes.pagination}>
              <Pagination page={page}/>
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
