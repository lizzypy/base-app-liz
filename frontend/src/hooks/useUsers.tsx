import {useEffect, useState} from "react";
import {useHttpClient} from "./useHttpClient";

interface User {
    id: number;
    email: string;
    updated_at: string
}

function useUsers(): User[] {
    const [apiData, setApiData] = useState([]);
    const httpClient = useHttpClient();

    useEffect(() => {
      console.log(`httpClient BASE URL: ${httpClient.getUri()}`);
      httpClient.get('/users').then(response => {
        setApiData(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    }, []);

    return apiData ?? []
}

export default useUsers;
