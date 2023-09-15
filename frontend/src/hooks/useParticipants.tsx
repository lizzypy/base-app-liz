import {useHttpClient} from "./useHttpClient";
import {useEffect, useState} from "react";

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    birthdate?: string;
}

function useParticipants(): { participants: Participant[], isLoading: boolean } {
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const httpClient = useHttpClient();

    useEffect(() => {
      setIsLoading(true)
      httpClient.get('/participants').then(response => {
        setApiData(response.data)
        setIsLoading(false)
        return { participants: apiData, isLoading: isLoading }
      })
      .catch(error => {
        console.log(error)
      })
    }, []);

    return { participants: apiData, isLoading: isLoading }
}

export default useParticipants;
