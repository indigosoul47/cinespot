import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/main/HomePage';
import DetailsPage from './pages/movie/DetailsPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/main/ProfilePage';
import ListingsPage from './pages/movie/ListingsPage';
import Dashboard from './pages/main/Dashboard';
import './utils/interceptors/axios';

function App() {
  return <>
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} exact/>
          <Route path='/browse' element={<ListingsPage/>}/>
          <Route path='/movie/:id' element={<DetailsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </main>
    </Router>
  </>
}

export default App;
