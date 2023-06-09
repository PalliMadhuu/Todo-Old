import React, { useState } from "react";
import styles from './LoginForm.module.css';
import { Box, Button,  Grid,  IconButton,  InputAdornment,  Link, TextField } from "@mui/material";
import { validateEmail, validatePassword } from "../CustomValidations/LoginFormValidation";
import {  getAccessToken2, getDataByEmail } from "../UsersAxios/CrudOnUsers";
import { getAllDetails } from "../HttpInterceptors/ApiCalls";
import { showSnankBar } from "../UsingRedux/SnackBarSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../UsingRedux/TodosStrore";
import SnackBar from "../SnackBars/ValidationMsgs";
import { useNavigate } from "react-router-dom";
import { SuccessMessage } from "../ToasterMessages/ToastMsgs";
import { VisibilityOff } from '@material-ui/icons';
import { Visibility } from '@material-ui/icons';

export const LoginForm = () => {

  //initial State of Errors
  const errors = {
    emailError: '',
    passwordError: ''
  }
  //properties of login Form
  const initialValues = {
    emailId: '', password: ''
  }

  // const navigate=useNavigate();
  const [error, setError] = useState(errors)
  const [loginForm, setLoginForm] = useState(initialValues)
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch<AppDispatch>()




  async function onLogin(event: any) {
    event.preventDefault();
    let body = {
      username : "madhu",
      password : "madhu"
    }
    let accessToken = await getAccessToken2();
    // let accessToken=getTokens.data.access_token;
    // let refreshToken=getTokens.data.refresh_token;
    sessionStorage.setItem('accessToken',accessToken);
    // sessionStorage.setItem('refreshToken',refreshToken);
    let userData= await  getAllDetails();
    // console.log(refreshToken);
    dispatch(showSnankBar());
    console.log(userData.data);
    if(accessToken)
    {
      navigate('/HomePage')
    }
    else
    {
      navigate('/')
    }



    // const refreshtoken = async () => {
      
    //   const refreshToken = localStorage.getItem('refreshToken');
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   }
    //   return refreshToken
    // }


    // const token=refreshtoken();
    // console.log(token);


    if (loginForm.emailId !== '' && loginForm.password !== '') {
      // let userDetails = await getDataByEmail(loginForm.emailId)
      // let getPassword = userDetails[0].password;

      let userDetails = await getDataByEmail(loginForm.emailId)
      let getPassword = userDetails[0].password;
      if (loginForm.password === getPassword) {
        const form = document.querySelector('form');
        form?.reset();
        SuccessMessage("Login SuccessFull");
        //Setting username as a token 
        sessionStorage.setItem('token', userDetails[0].userName);
      }
      else {
        window.alert('Invalid Password !! ');
      }

    }
  }

  function onEmailIdChanges(event: any) {
    let getEmailError = (validateEmail(event.target.value));
    setError({ ...error, emailError: getEmailError })


    if (getEmailError) {
      setLoginForm({ ...loginForm, emailId: '' })
      setEmailValid(false);
    }
    else {
      setLoginForm({ ...loginForm, emailId: event.target.value })
      setEmailValid(true);
    }
  }
  function onPasswordChanges(event: any) {
    let getPasswordError = validatePassword(event.target.value);
    setError({ ...error, passwordError: getPasswordError })


    if (getPasswordError) {
      setLoginForm({ ...loginForm, password: '' })
      setPasswordValid(false);

    }
    else {
      setLoginForm({ ...loginForm, password: event.target.value })
      setPasswordValid(true);
    }
  }
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };


  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.imgContainer}>
          <img className={styles.image} src='https://img.freepik.com/free-photo/fun-3d-cartoon-illustration-indian-doctor_183364-114483.jpg?w=360&t=st=1681307990~exp=1681308590~hmac=ce08c9e5e09a14d9fb3241d2328308ce7dfdb1fca76bc391dbb43f43089b0378'></img>
        </div>
        <div className={styles.formContainer}>
          <h1>Welcome Back </h1>
          <Box>
            <form onSubmit={onLogin}>
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                onChange={onEmailIdChanges}
              />
              <span className={styles.emailError}>{error.emailError}</span>
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoFocus
                onChange={onPasswordChanges}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <span className={styles.passwordError}>{error.passwordError}</span> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!(isPasswordValid && isEmailValid)}
              >
                Sign In
              </Button>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                Don't have an accout ?
                <Link href="#" variant="body2">
                  {" Sign Up"}
                </Link>
              </Grid>
            </form>
          </Box>
        </div>
         {/* Other Imported Components */}
         <SnackBar></SnackBar>

      </div>
    </>
  )
            }