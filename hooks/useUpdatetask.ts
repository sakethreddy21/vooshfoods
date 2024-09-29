import { useState } from 'react';
import axios from 'axios';

interface UpdateTaskResponse {
  message: any;
  task: {
    _id: any;
    title: any;
    description: any;
    columnID: any;
  };
}

interface UpdateTaskParams {
  taskID: any;
  title:any
  description: any;
  columnID: any;
}

export const useUpdateTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<UpdateTaskResponse | null>(null);

  const updateTask = async ({ taskID,title, description, columnID }: UpdateTaskParams) => {
    console.log(taskID,title, description, columnID)
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.put<UpdateTaskResponse>(`https://vooshfoodsbackend.vercel.app/tasks/${taskID}`, {
        title,
        description,
        columnID,
      });

      setResponse(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred while updating the task.');
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTask, response, isLoading, error };
};
