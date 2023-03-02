import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>
            <TextField required id="username" label="Username" variant="outlined" margin="normal"/>
          </div>
          <div>
            <TextField required id="password" label="Password" variant="outlined" margin="dense"/>
          </div>
          <div>
            <p>
              Here is where we will place our login screen to start :) 
            </p>
          </div>
        </div>
        
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