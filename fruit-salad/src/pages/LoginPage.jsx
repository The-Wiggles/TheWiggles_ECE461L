import './../css/LoginPage.css';

import { Box, Button, TextField } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const buttonstyle = 
{
  minWidth: 125, 
  bgcolor: '#cc5500', 
  borderRadius: '16px'
};

function LoginPage() {

  let navigate = useNavigate();

  // Testing function
  function login() {
    let userid_val = document.getElementById("userid").value;
    let password_val = document.getElementById("password").value;
    
  }

  // navigate to sign up page
  function navigateToSignUpPage() {
    navigate('/SignupPage');
  }


  return (
    <div className="LoginPage">
      
      <Box className="LoginBox" sx={{p:5, bgcolor: '#e0e0e0', borderRadius: '25px'}}>

          <p style={{marginTop: 0}}>Welcome to Fruit Salad Hardware Management</p>

          <div className="LoginFieldGroup">
            <TextField required id="userid" label="UserID" variant="outlined"/>
            <TextField required id="password" label="Password" variant="outlined"/>
          </div>

          <div className="row">
            <Button variant="contained" onClick={login} sx={buttonstyle}>Login</Button>
            <Button variant="contained" onClick={navigateToSignUpPage} sx={buttonstyle}>SignUp</Button>
          </div>


      </Box>

    </div>
  );
}

export default LoginPage;