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
  function sayHello() {
    alert('This button works, but still havent added form submission!');
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
            <TextField required id="username" label="Username" variant="outlined"/>
            <TextField required id="password" label="Password" variant="outlined"/>
          </div>

          <div className="row">
            <Button variant="contained" onClick={sayHello} sx={buttonstyle}>Login</Button>
            <Button variant="contained" onClick={navigateToSignUpPage} sx={buttonstyle}>SignUp</Button>
          </div>


      </Box>

    </div>
  );
}

export default LoginPage;