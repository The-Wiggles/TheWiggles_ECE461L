import React from 'react';
import './../css/Signup.css'
import { Box, Button, TextField, Tooltip, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";

const buttonstyle = 
{
  minWidth: 125, 
  bgcolor: '#cc5500', 
  borderRadius: '16px'
};

function SignupPage() {

    let navigate = useNavigate();

    // navigate to sign up page
    function navigateToLoginPage() {
        navigate('/');
    }

    async function addUser() {
      let userid_val = document.getElementById("userid").value;
      let password_val = document.getElementById("password").value;
      // check for blanks
      const user_data = {userid: userid_val, password: password_val};
      const fetch_options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user_data)
      }
      const response = await fetch('/users', fetch_options);
      const response_body = await response.json();
      console.log(response_body)
      if (response_body.status === "failure"){
        alert(userid_val + " already exists");
      }
      else{
        alert("Successful signup");
      }
    }


    return (
        <div className="SignupPage">
          <Box sx={{p:5, bgcolor: '#e0e0e0', borderRadius: '25px'}}>
            <div>
            <div>
                <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="UserIDs can be made of any printable characters Ex: Jzubia, Mrojas$, TestName123"
                placement='top-start'
                arrow
                >
                  <TextField required id="userid" label="UserID" variant="outlined" margin="normal"/>
                </Tooltip>
              </div>
              <div>
                <Tooltip
                  TransitionComponent={Fade}
                  TransitionProps={{ timeout: 600 }}
                  title="Passwords must not contain ! or spaces"
                  placement='top-start'
                  arrow
                >
                  <TextField required id="password" label="Password" variant="outlined" margin="dense"/>
                </Tooltip>
              </div>
            <div>
                <Button variant="contained" onClick={addUser} sx={buttonstyle}>SIGN UP</Button>
                <Button variant="contained" onClick={navigateToLoginPage} sx={buttonstyle}>Go Back!!</Button>
            </div>
              <div>
                <p>
                  This is our signup screen! :) 
                </p>
              </div>
            </div>
          </Box>
        </div>
      );
}

export default SignupPage;