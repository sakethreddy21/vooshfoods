import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`https://vooshfoodsbackend.vercel.app/users/login`, { email, password });
      const { token } = response.data;

      sessionStorage.setItem('token', token);

      setLoading(false);
      return true;
    } catch (err) {
      setError('Invalid email or password');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
  };

 
  return { login, logout, loading, error };
};

export default useLogin;
