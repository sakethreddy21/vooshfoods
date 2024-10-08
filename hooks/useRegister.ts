import { useState } from 'react';
import axios from 'axios';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await axios.post(`https://vooshfoodsbackend.vercel.app/users/register`, userData);
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, success };
};
