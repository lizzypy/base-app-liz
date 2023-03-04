import axios from "axios";
import {useEffect, useState} from "react";

export const useParticipants = () => {
    const [apiData, setApiData] = useState(null);
    const [serverError, setServerError] = useState(null);

    useEffect(() => {
        // axios.get('/participants').then((response) => {
        //         const data = response?.data;
        //         setApiData(data);
        //     }
        // ).catch((error) => {
        //         setServerError(error);
        //     }
        // )
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

    return { apiData, serverError }
}