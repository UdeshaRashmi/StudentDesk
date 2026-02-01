 import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check login status on component mount and when location changes
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if user is logged in (you can use localStorage, context, or Redux)
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = JSON.parse(localStorage.getItem('user') || 'null');
      
      setIsLoggedIn(loggedIn);
      setUser(userData);
    };

    checkAuthStatus();
    
    // Listen for auth changes (optional: can be triggered from other components)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, [location]);

  const navigation = [
    { name: "Home", href: "/", current: location.pathname === "/" },
    { name: "Dashboard", href: "/dashboard", current: location.pathname === "/dashboard" },
    { name: "About", href: "/about", current: location.pathname === "/about" },
  ];

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    
    // Update state
    setIsLoggedIn(false);
    setUser(null);
    
    // Navigate to home
    navigate('/');
    
    // Show success message
    alert('You have been logged out successfully!');
  };


  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-b border-amber-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-yellow-500 to-amber-600 w-10 h-10 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-lg">SD</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-800 to-yellow-700 bg-clip-text text-transparent">
                StudentsDesk
              </h1>
              <p className="text-xs text-amber-600 font-medium hidden sm:block">Academic Management System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation
              .filter(item => item.name !== 'Dashboard' || isLoggedIn)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    item.current
                      ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900 border border-amber-200 shadow-sm'
                      : 'text-amber-800 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  {item.name}
                </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* User Profile Dropdown */}
                <div className="hidden md:flex items-center space-x-2 relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-amber-50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {getInitials(user?.name)}
                      </span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-amber-900">{user?.name || 'User'}</p>
                      <p className="text-xs text-amber-600">{user?.role || 'Student'}</p>
                    </div>
                    <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-amber-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 hover:text-amber-900"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <div className="border-t border-amber-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-900"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Mobile Profile (visible only on mobile) */}
                <div className="md:hidden flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {getInitials(user?.name)}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Login/Signup Buttons (Desktop) */}
                <div className="hidden md:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-yellow-600 transition-all shadow-sm"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Mobile Auth Buttons */}
                <div className="md:hidden flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-sm font-medium text-amber-700"
                  >
                    Login
                  </Link>
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-amber-700 hover:bg-amber-50"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-amber-200 py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium ${
                    item.current
                      ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-900'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Auth Links for Mobile */}
              {!isLoggedIn ? (
                <>
                  <div className="border-t border-amber-200 pt-4 mt-2">
                    
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-amber-800 hover:bg-amber-50"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 text-center mt-2"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              ) : (
                <div className="border-t border-amber-200 pt-4 mt-2">
                  <div className="flex items-center space-x-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {getInitials(user?.name)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-amber-900">{user?.name || 'User'}</p>
                      <p className="text-sm text-amber-600">{user?.email || 'Student'}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-amber-800 hover:bg-amber-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-amber-800 hover:bg-amber-50"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 mt-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}