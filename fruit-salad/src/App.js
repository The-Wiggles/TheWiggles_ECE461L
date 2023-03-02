import logo from './logo.svg';
import './App.css';
import TextField from '@mui/material/TextField'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <TextField id="username" label="Username" variant="outlined"/>
        <TextField id="password" label="Password" variant="outlined"/>
        
        <p>
          Here is where we will place our login screen to start :)
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