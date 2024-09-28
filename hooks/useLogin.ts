import { useState } from 'react';
import axios from 'axios';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const BASE_URL= process.env.VooshBackend

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      setUser(response.data.user);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, user };
};
