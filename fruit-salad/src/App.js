import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/SignupPage' element={<SignupPage />}/>
    </Routes>
  );
}

export default App;