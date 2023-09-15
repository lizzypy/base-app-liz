import {useEffect, useState} from "react";
import {useHttpClient} from "./useHttpClient";

interface User {
    id: number;
    email: string;
    updated_at: string
}

function useUsers(): { users: User[], isLoading: boolean } {
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const httpClient = useHttpClient();

    useEffect(() => {
      setIsLoading(true)
      httpClient.get('/users').then(response => {
        setApiData(response.data)
        setIsLoading(false)
        return { users: apiData, isLoading: isLoading }
      })
      .catch(error => {
        console.log(error)
      })
    }, []);

    return { users: apiData, isLoading: isLoading }
}

export default useUsers;
