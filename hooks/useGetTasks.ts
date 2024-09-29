import { useEffect, useState } from 'react';
import axios from 'axios';



export const useTasksByUserID = (userID: string, shouldFetch = true) => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            if (shouldFetch && userID) {
                setIsLoading(true);
                setIsError(null);
                try {
                    const response = await axios.get(`https://vooshfoodsbackend.vercel.app/tasks/user/${userID}`);
                    setData(response.data.tasks || []);
                } catch (error) {
                    setIsError(error as Error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setData([]);
                setIsLoading(false);
            }
        };

        fetchTasks();
    }, [userID, shouldFetch]);

    return {
        data,
        isLoading,
        isError,
    };
};
