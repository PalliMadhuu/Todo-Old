import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail,validatePassword } from '../../CustomValidations/LoginFormValidation';
import { getDataByEmail } from '../../UsersAxios/CrudOnUsers';


import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  makeStyles,
  Container
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import './LoginPage.css';
import { SuccessMessage } from '../../ToasterMessages/ToastMsgs';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../UsingRedux/TodosStrore';
import { userCred } from '../../UsingRedux/UserCredSlice';


interface LoginPageProps {
  checkLogin :()=>void

}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage: FC<LoginPageProps> = (props) => {
  const dispatch=useDispatch<AppDispatch>()

//initial State of Errors
const errors={
  emailError:'',
  passwordError:''
}
//properties of login Form
const initialValues={
  emailId:'',password:''
}
  const classes = useStyles();
  const navigate=useNavigate();
  const [error,setError]=useState(errors)
  const [loginForm,setLoginForm]=useState(initialValues)

  function onEmailIdChanges(event:any)
  {
   let getEmailError=(validateEmail(event.target.value));
   setError({...error,emailError:getEmailError})
    if(getEmailError)
    {
        setLoginForm({...loginForm,emailId:''})
    }
    else{
      setLoginForm({...loginForm,emailId:event.target.value})
    }
  }
  function onPasswordChanges(event:any)
  {
    let getPasswordError=validatePassword(event.target.value);
    setError({...error,passwordError:getPasswordError})
    if(getPasswordError)
    {
      setLoginForm({...loginForm,password:''})

    }
    else
    {
      setLoginForm({...loginForm,password:event.target.value})
    }
    

  }
async  function onLogin(event:any)
  {
   event.preventDefault();
     if(loginForm.emailId!==''&&loginForm.password!=='')
     {
      let userDetails=  await  getDataByEmail(loginForm.emailId)
         let getPassword=userDetails[0].password;
         if(loginForm.password===getPassword)
         {
          window.alert('Login Success')
          props.checkLogin();
          const form = document.querySelector('form');
          form?.reset();
          SuccessMessage("Login SuccessFull");

          //Setting username as a token 
         sessionStorage.setItem('token',userDetails[0].userName);


          dispatch((userCred(userDetails[0])))
          navigate('/HomePage');

         }
         else{
          window.alert('Invalid Password !! ');
         }
             
     }
  }
  function routeToSignUp()
  {
       navigate("/registrationPage");
  }
  return(
  <div className="LoginPage" data-testid="LoginPage">
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onLogin}  >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Email Address"
            name="email"
            autoComplete="email"
            onChange={onEmailIdChanges}
            autoFocus
          />
          <span style={{color:'red',marginRight:'230px'}}> {error.emailError} </span>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            placeholder="Password"
            type="password"
            id="password"
            onChange={onPasswordChanges}
            autoComplete="current-password"
          />
          <span style={{color:'red',marginRight:'230px'}}> {error.passwordError} </span>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
           
            <Grid item>
                {"Don't have an account?"}
            </Grid>
          </Grid>
        </form>
      </div>

      <Button
            onClick={routeToSignUp}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
          Register
          </Button>
      
    </Container>

    
      </div>
  )
}

export default LoginPage;
