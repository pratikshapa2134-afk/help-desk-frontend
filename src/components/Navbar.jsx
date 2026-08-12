import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">🛠️ Help Desk System</Link>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm bg-gray-800 px-3 py-1 rounded">
              {user.name} ({user.role})
            </span>
            <button 
              onClick={handleLogout} 
              className="bg-red-600 px-4 py-2 rounded text-sm hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700">Login</Link>
            <Link to="/register" className="bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}