import React from 'react'
import { useGlobalContext } from './Context'
const Card = () => {
    const { results, error, origin, destination } = useGlobalContext()
    return (
        <div className='card-section'>
            {error && <p>{error}</p>}
            {results && results.map((result, index) => (
                <div className="card " key={index}>
                    <div className='card-body'>
                        <img className="logo" src="https://plus.unsplash.com/premium_photo-1679830513873-5f9163fcc04a?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Partner Program Logo" width={'50px'}/>
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
    )
}

export default Card
