import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from './Button'

const NavBar = () => {
  const navigate = useNavigate();
const { isAuthenticated, username, removeCookie, setIsAuthenticated } = useAuth();
  
  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    removeCookie("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate('/')}>
              TodoApp
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Button btnType="default" btnText="Sign Up" handler={handleSignUp} />
                <Button btnType="default" btnText="Login" handler={handleLogin} />
              </>
            ) : (
              <Button btnType="default" btnText="Logout" handler={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar