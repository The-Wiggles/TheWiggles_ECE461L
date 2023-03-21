import React from 'react';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import './../css/SignupPage.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";

function SignupPage() {

    let navigate = useNavigate();

    // navigate to sign up page
    function navigateToLoginPage() {
        navigate('/');
    }

    async function addUser() {
      let username_val = document.getElementById("username").value;
      let password_val = document.getElementById("password").value;
      // check for blanks
      const user_data = {user: username_val, password: password_val};
      const fetch_options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user_data)
      }
      const response = await fetch('/add_user', fetch_options);
      const result = await response.text();
      alert(result);
      console.log(result);
    }

    return (
        <div className="SignupPage">
          <header className="SignupPage-header">
            <Box component="signupBox" sx={{p:5, bgcolor: '#e0e0e0', borderRadius: '25px'}}>
            <div>
              <div>
                <TextField required id="username" label="Username" variant="outlined" margin="normal"/>
              </div>
              <div>
                <TextField required id="password" label="Password" variant="outlined" margin="dense"/>
              </div>
            <div>
                <Button variant="contained" onClick={addUser} sx={{marginTop: 1, minWidth: 125, bgcolor: '#cc5500', borderRadius: '16px'}}>SIGN UP</Button>
                <Button variant="contained" onClick={navigateToLoginPage} sx={{marginTop: 1, minWidth: 125, bgcolor: '#cc5500', borderRadius: '16px'}}>Go Back!!</Button>
            </div>
              <div>
                <p>
                  This is our signup screen! :) 
                </p>
              </div>
            </div>
            </Box>
          </header>
        </div>
      );
}

export default SignupPage;