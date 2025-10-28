import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // API base URL - points to your backend
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check for existing session on app start
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('agrimind_token');
        if (token) {
          // Verify token with backend
          const response = await fetch(`${API_BASE}/auth/profile`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data.user);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('agrimind_token');
            localStorage.removeItem('agrimind_user');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('agrimind_token');
        localStorage.removeItem('agrimind_user');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [API_BASE]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const { user: userData, token } = data.data;
        
        // Store token and user data
        localStorage.setItem('agrimind_token', token);
        localStorage.setItem('agrimind_user', JSON.stringify(userData));
        
        setUser(userData);
        toast.success('Welcome back to AgriMind AI!');
        return { success: true, user: userData };
      } else {
        toast.error(data.message || 'Login failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please try again.');
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const { user: userData, token } = data.data;
        
        // Store token and user data
        localStorage.setItem('agrimind_token', token);
        localStorage.setItem('agrimind_user', JSON.stringify(userData));
        
        setUser(userData);
        toast.success('Account created successfully! Welcome to AgriMind AI!');
        return { success: true, user: userData };
      } else {
        toast.error(data.message || 'Registration failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Network error. Please try again.');
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('agrimind_token');
    localStorage.removeItem('agrimind_user');
    toast.success('Logged out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('agrimind_token');
      const response = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        const updatedUser = data.data.user;
        setUser(updatedUser);
        localStorage.setItem('agrimind_user', JSON.stringify(updatedUser));
        toast.success('Profile updated successfully!');
        return { success: true, user: updatedUser };
      } else {
        toast.error(data.message || 'Profile update failed');
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error('Network error. Please try again.');
      return { success: false, error: 'Network error' };
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user,
    API_BASE
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};