import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box component="loginBox" sx={{p:1, border:'1px dashed grey', bgcolor: '#e0e0e0', borderRadius: '16px'}}>
        <div>
          <div>
            <TextField required id="username" label="Username" variant="outlined" margin="normal"/>
          </div>
          <div>
            <TextField required id="password" label="Password" variant="outlined" margin="dense"/>
          </div>
          <div>
            <Button variant="contained" sx={{marginTop: 1, minWidth: 125, border:'1px dashed grey', bgcolor: '#cc5500', borderRadius: '16px', textAlign: "center"}}>Login</Button>
          </div>
          <div>
            <p>
              Here is where we will place our login screen to start :) 
            </p>
          </div>
        </div>
        </Box>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;