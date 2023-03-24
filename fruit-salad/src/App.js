import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup'
import UserProjects from './pages/ProjectManager.jsx';
import ProjectManager from './pages/ProjectManager.jsx';

function App() {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />}/>
      <Route path='/Signup' element={<SignupPage />}/>
      <Route path='/ProjectManager' element={<ProjectManager />}/>
    </Routes>
  );
}

export default App;