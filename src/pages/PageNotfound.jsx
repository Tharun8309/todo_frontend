import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotfound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Page Not Found</p>
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Go to Home
      </button>
    </div>
  )
}

export default PageNotfound
