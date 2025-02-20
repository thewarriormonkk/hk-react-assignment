import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';

function App() {
  const [user, setUser] = useState(() => {
    // initialing state from localStorage
    const savedUser = localStorage.getItem('userToken');
    return savedUser || null;
  });

  // update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("userToken", user);
    } else {
      localStorage.removeItem("userToken");
    }
  }, [user]);

  return (
    <>
      <header>
        <Router>
          <Routes>
            <Route path="/" element={user ? <Home setUser={setUser} /> : <Navigate to='/login' /> }/>
            <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to='/' /> } />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </header>
    </>
  )
}

export default App
