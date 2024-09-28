import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useTasksByUserID = (
    userID: string,
    shouldFetch = true
) => {
    const path = shouldFetch ? `https://vooshfoodsbackend.vercel.app/tasks/user/${userID}` : null;
    
    const { data, error } = useSWR(path, fetcher);

    return {
        tasks: data?.tasks,
        isLoading: !error && !data,
        isError: error,
    };
};
