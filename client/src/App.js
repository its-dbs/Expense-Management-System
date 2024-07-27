import {Routes, Route, Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
            <ProtectedRoutes>
                 <HomePage/>
            </ProtectedRoutes>
          }/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </>
  );
}

//function for protected route
export function ProtectedRoutes(props)
{
  //check if user is available 
  if(localStorage.getItem("user"))
  {
    return props.children;
  }
  //else navigate it to login page
  else{
    return <Navigate to="/login" />;
  }
}

export default App;
