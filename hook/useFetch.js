import { useEffect, useState } from "react";
import axios from "axios";

import { API_KEY } from '@env';

export default function useFetch(endpoint, query) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query }
    };

    async function fetchData() {
        setIsLoading(true);

        try {
            const response = await axios.request(options);
            setData(response.data.data);
            
        } catch (error) {
            setError(error);
            alert('There was an issue');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    function refetch() {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}