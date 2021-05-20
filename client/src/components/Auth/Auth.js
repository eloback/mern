import React, { useState } from 'react';
import { Avatar, Paper, Grid, Typography, Container, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { GoogleLogin } from 'react-google-login'
import Icon from './icon'
import { useDispatch } from 'react-redux'
import {useHistory} from 'react-router-dom'

import useStyles from './styles';
import Input from "./Input";
import {signin, signup } from '../../actions/auth';

const inititalFormState = { firstName: "", lastName: "", email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(inititalFormState);
    const dispatch = useDispatch();
    const history = useHistory();

    const [isSignup, changeIsSignup] = useState(false);

    const handleShowPassword = ()=> setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit = (e)=>{
      e.preventDefault();
      if(isSignup){
        dispatch(signup(formData, history));
      }else{
        dispatch(signin(formData, history));
      }
    };

    const handleChange = (e)=>{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const googleSuccess = async (res) => {
      const result = res?.profileObj;
      const token = res?.tokenId;

      try{
          dispatch({type: 'AUTH', data: {result, token}});

          history.push('/');
      }catch(e){
        console.log(e);
      }
    }
    const googleFailure = () =>{
      alert("google sign in is a failure")
    }

    const switchMode = () => {
      changeIsSignup((currentStatus) => !currentStatus);
      setShowPassword(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ?  'Sign up' : 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                      {isSignup && (
                          <>
                              <Input name="firstName" label="firstName" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="lastName" handleChange={handleChange} half/>
                          </>
                          )}
                          <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                          <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}  />
                          { isSignup && (<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />)}
                  </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                      {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId="138372071510-mbaa438vlipubso419ko50g9arhg3943.apps.googleusercontent.com"
                        render={(renderProps)=> (
                          <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained"></Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                      />
                    <Grid container justify="flex-end">
                      <Grid item>
                          <Button onClick={switchMode}>
                            {isSignup ? "Already have a account? Sign In" :  "Don't have a account? Sign Up"}
                          </Button>
                      </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
