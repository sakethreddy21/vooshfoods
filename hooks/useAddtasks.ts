import { useState } from 'react';
import axios from 'axios';

const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const createTask = async (taskData: any) => {
    setLoading(true);
    setError(null);

    const { title, description, userID, columnID = 1 } = taskData;

    try {
      const response = await axios.post('https://vooshfoodsbackend.vercel.app/tasks', {
        title,
        description,
        userID,
        columnID,
      });

      setSuccess(response.data.message);
      return response.data.task;  // Return the created task
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred');
      return null;  // Return null in case of error
    } finally {
      setLoading(false);
    }
  };

  return { createTask, loading, error, success };
};

export default useCreateTask;
