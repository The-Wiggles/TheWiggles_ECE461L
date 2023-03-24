import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import UserProjects from './pages/UserProjects';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/SignupPage' element={<SignupPage />}/>
      <Route path='/UserProjects' element={<UserProjects />}/>
    </Routes>
  );
}

export default App;