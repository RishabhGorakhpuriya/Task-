import React, { useState } from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import Dropdown from './Dropdown';
import data from '../Data.json';



const Home = () => {
    const [origin, setOrigin] = useState('SYD');
    const [destination, setDestination] = useState('JFK');
    const [cabinSelection, setCabinSelection] = useState('Business');
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const Origin = [
        { id: 1, Name: "JFK" },
        { id: 2, Name: "DEL" },
        { id: 3, Name: "SYD" },
        { id: 4, Name: "BOM" },
        { id: 5, Name: "BNE" },
        { id: 6, Name: "BLR" }
    ]
    const destinations = [
    { id: 1, Name: "JFK" },
    { id: 2, Name: "DEL" },
    { id: 3, Name: "SYD" },
    { id: 4, Name: "LHR" },
    { id: 5, Name: "CDG" },
    { id: 6, Name: "DOH" },
    { id: 7, Name: "SIN" }
    ]
    const cadin = [
        { id: 1, Name: "Economy" },
        { id: 2, Name: "Business" },
        { id: 3, Name: "First" },
        ]
    console.log(data);
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
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-12 col-lg-6'>

                    <form onSubmit={handleSubmit}>
                        {/* <Dropdown origin={origin} setOrigin={setOrigin}/> */}
                        <div className='dropdown my-3'>
                            <label>Origin</label>
                            <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
                                {Origin.map((item) => (
                                    <option key={item.id} value={item.Name}>
                                        {item.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='dropdown my-3'>
                            <label>Destination</label>
                            <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                                {destinations.map((item) => (
                                    <option key={item.id} value={item.Name}>
                                        {item.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='dropdown my-3'>
                            <label>Cabin Selection</label>
                            <select value={cabinSelection} onChange={(e) => setCabinSelection(e.target.value)}>
                                {cadin.map((item)=>(
                                    <option key={item.id} value={item.Name}>{item.Name}</option>
                                ))}
                            </select>
                        </div>
                        <button className='btn btn-success my-4' type="submit">Search</button>
                    </form>

                </div>

                <div className='card-section'>
                    {error && <p>{error}</p>}
                    {results && results.map((result, index) => (
                        <div className="card " key={index}>
                            <div className='card-body'>
                                <img className="logo" src="https://via.placeholder.com/50" alt="Partner Program Logo" />
                                <h3 className="airline my-2"> {result.partner_program}</h3>
                                <span className="route"> {origin} ➔ {destination}</span>
                                <p className="date"> 2024-07-16 - 2024-07-16</p>
                                <div className='d-flex justify-content-center gap-3'>
                                    <h1 className="miles fw-medium">{result.min_business_miles ? result.min_business_miles : 'N/A'}</h1>
                                    <p className="miles">{result.min_business_tax ? `+$${result.min_business_tax}` : ''}</p>
                                </div>
                                <p className="label">Minimum Business Miles</p>
                                <div className='d-flex justify-content-center gap-3'>
                                    <h1 className="route">{result.min_economy_miles ? result.min_economy_miles : 'N/A'}</h1>
                                    <p className="dates">{result.min_economy_tax ? `+$${result.min_economy_tax}` : ''}</p>
                                </div>

                                <p className='label'>min_economy_miles</p>
                                <div>
                                    <h1 className="miles">{result.min_first_miles ? result.min_first_miles : 'N/A'}</h1>
                                    <p className="label">Minimum First Tax</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Home


