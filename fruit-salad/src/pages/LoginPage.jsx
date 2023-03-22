import './../css/LoginPage.css';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      <header className="LoginPage-header">
        <Box component="loginBox" sx={{p:5, bgcolor: '#e0e0e0', borderRadius: '25px'}}>
        <div>
          <div>
            <TextField required id="username" label="Username" variant="outlined" margin="normal"/>
          </div>
          <div>
            <TextField required id="password" label="Password" variant="outlined" margin="dense"/>
          </div>
          <div class="row">
            <div class="column">
              <Button variant="contained" onClick={sayHello} sx={{marginTop: 1, minWidth: 120, bgcolor: '#cc5500', borderRadius: '16px'}}>Login</Button>
            </div>
            <div class="column">
              <Button variant="contained" onClick={navigateToSignUpPage} sx={{marginTop: 1, minWidth: 120, bgcolor: '#cc5500', borderRadius: '16px'}}>SignUp</Button>
            </div>
          </div>
          <div>
            <p>
              Here is where we will place our login screen to start :) 
            </p>
            <p>
              test 
            </p>
          </div>
        </div>
        </Box>

      </header>
    </div>
  );
}

export default LoginPage;