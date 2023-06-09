import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';
import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, makeStyles,Radio, RadioGroup, Select,  FormControlLabel  } from '@material-ui/core';
import { postData } from '../UsersAxios/CrudOnUsers';

interface RegistrationPageProps {}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const RegistrationPage: FC<RegistrationPageProps> = () => {

  const classes = useStyles();
  const [countryCode,setCountryCode]=useState('');
  const { register, handleSubmit, formState: { errors }  } = useForm();
  const onSubmit = (data:any) => {
    if(data.password===data.confirmPassword)
    {
      postData(data);
      const form = document.querySelector('form');
      form?.reset();
      navigate("/");

    }
    else
    {
      window.alert('mismatches')
    }
   
  };
  function onCountryChange(event:any):any
  {
      switch(event.target.value)
      {
        case('india'):setCountryCode('+91');break;
        case('us'):setCountryCode('+61');break;
        case('uk'):setCountryCode('+42');break;
      }
  }
  
  const navigate=useNavigate();
  function routeToLogin()
  {
      navigate("/")
  }
  return(
  <div className="RegistrationPage" data-testid="RegistrationPage">
<Box className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{display:'flex',marginBottom:'30px'}}>
        <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="Email"
          {...register('emailId',{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          error={Boolean(errors.emailId)}
          helperText={errors.emailId?.message?.toString()}
        />
         <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="User Name"
          {...register('userName',{
            required: 'User Name is required',
            pattern: {
              value: /^[a-zA-Z ]+$/i,
              message: 'Please Enter Valid Name',
            },
          })}
          error={Boolean(errors.userName)}
          helperText={errors.userName?.message?.toString()}
        />
        </div>
        <div style={{display:'flex',marginBottom:'30px'}}>
        <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="Password"
          {...register('password',{
            required: 'Password is Required',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
              message: 'Please Enter Valid Password',
            },
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message?.toString()}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="Confirm Password"
          {...register('confirmPassword',{
            required: 'Confirm Password is Required',
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
              message: 'Please Enter Valid Password',
            },
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message?.toString()}
        />
      </div>
      <div style={{display:'flex',marginBottom:'30px'}}>
      <Select  {...register("country")}  style={{marginRight:'50px',width:'220px'}} variant='outlined' onChange={(e)=>onCountryChange(e)} >
        <option value="" >Select an option</option>
        <option value="india">India</option>
        <option value="uk">UK</option>
        <option value="us">US</option>
      </Select>
          <div >
        <RadioGroup style={{marginLeft:'0px'}} aria-label="gender"  {...register('gender',{required:'Gender is Required'})}>
        <div style={{display :'flex',float:'left',flexDirection:'row-reverse',marginLeft:'0px'}}>
        <FormControlLabel value="male" control={<Radio />} label="Male" />         
        <FormControlLabel value="female" control={<Radio />} label="Female" />   
         </div>
        </RadioGroup>
        </div>
       
      </div>
      <div style={{display:'flex',marginBottom:'30px'}}>
      <h5 style={{marginTop:'20px'}}>{countryCode}</h5> <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="Mobile Number"
          {...register('mobileNumber',{
            required: 'Mobile Number is Required'

          })}
          error={Boolean(errors.mobileNumber)}
          helperText={errors.mobileNumber?.message?.toString()}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          type="date"
          style={{width:'180px'}}
          {...register('dateOfBirth',{
            required: 'Date Of Birth Is Required',
            
          })}
          error={Boolean(errors.dateOfBirth)}
          helperText={errors.dateOfBirth?.message?.toString()}
        />

       </div>

        <Button className={classes.button} variant="contained" color="primary" type="submit" style={{width:'460px'}}>
          Register
        </Button>
      </form>
      <p>Have An Accout ?</p>
      <Button className={classes.button} variant="contained" color="primary" onClick={routeToLogin} style={{width:'460px'}}>Login</Button>
    </Box>   
  </div>
  )
}

export default RegistrationPage;
