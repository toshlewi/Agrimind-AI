// Mock authentication service - replace with real API calls
export const authService = {
  async login(email, password) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password) {
      return {
        success: true,
        user: {
          id: 1,
          name: 'John Farmer',
          email: email,
          farmName: 'Green Valley Farm',
          location: 'Nairobi, Kenya'
        },
        token: 'mock-jwt-token'
      };
    }
    
    throw new Error('Invalid credentials');
  },

  async signup(userData) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      success: true,
      user: {
        id: Date.now(),
        ...userData
      },
      token: 'mock-jwt-token'
    };
  },

  async logout() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};