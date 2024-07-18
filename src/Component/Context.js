import React, { useState,  useContext } from 'react'
import axios from 'axios'
const AppContext = React.createContext();
const AppProvider = ({ children, props }) => {
    const [origin, setOrigin] = useState('SYD');
    const [destination, setDestination] = useState('JFK');
    const [cabinSelection, setCabinSelection] = useState('Business');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const headers = {
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9,hi;q=0.8',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        };

        const json_data = {
            'origin': origin,
            'destination': destination,
            'partnerPrograms': [
                'Air Canada',
                'United Airlines',
                'KLM',
                'Qantas',
                'American Airlines',
                'Etihad Airways',
                'Alaska Airlines',
                'Qatar Airways',
                'LifeMiles',
            ],
            'stops': 2,
            'departureTimeFrom': '2024-07-09T00:00:00Z',
            'departureTimeTo': '2024-10-07T00:00:00Z',
            'isOldData': false,
            'limit': 302,
            'offset': 0,
            'cabinSelection': [cabinSelection],
            'date': '2024-07-09T12:00:17.796Z',
        };

        try {
            const response = await axios.post('https://cardgpt.in/apitest', json_data, { headers });
            if (response.data.data && response.data.data.length > 0) {
                setResults(response.data.data);
                setError('');
            } else {
                setResults(null);
                setError('Try another search route.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('An error occurred while fetching data.');
        }
    };
    return (
        <AppContext.Provider value={{ origin, setOrigin, destination, setDestination, cabinSelection, setCabinSelection, results, setResults, error, setError, handleSubmit }}>{children}</AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider, useGlobalContext}
