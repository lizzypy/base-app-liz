import axios from "axios";
import {useEffect, useState} from "react";

interface Participant {
    id: number;
    first_name: string;
    last_name: string;
    birthdate?: string;
}

function useParticipants(): Participant[] {
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
            axios({
                method: 'GET',
                url: `/participants`,
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    console.log("This is the response: ", response)
                    setApiData(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
    }, []);

    return apiData ?? []
}
export default useParticipants;
