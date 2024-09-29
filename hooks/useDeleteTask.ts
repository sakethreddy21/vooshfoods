import { useState } from 'react';
import axios from 'axios';

const useDeleteTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const deleteTask = async (taskId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`https://vooshfoodsbackend.vercel.app/tasks/${taskId}`);

      setSuccess(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error, success };
};

export default useDeleteTask;
