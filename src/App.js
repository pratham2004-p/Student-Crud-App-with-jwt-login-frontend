import './App.css';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import Login from './components/Login';
import Register from './components/Register';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Profile from './components/Profile';



function App() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');
 
  return (
    <>

      
      <Navbar />
      <Routes>

        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/login" />} />
        <Route path="/" element={isLoggedIn ? <StudentList /> : <Navigate to="/login" />} />
        <Route path="/add" element={isLoggedIn ? <AddStudent /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isLoggedIn ? <EditStudent /> : <Navigate to="/login" />} />
        <Route path='/profile' element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
      </Routes>
   
    </>
  );
}

export default App;
