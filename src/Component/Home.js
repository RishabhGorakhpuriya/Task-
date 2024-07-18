import React  from 'react'
import Dropdown from './Dropdown'
import Card from './Card';



const Home = () => {
    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <Dropdown/>
                <Card/>
            </div>
        </div>

    );
}

export default Home


