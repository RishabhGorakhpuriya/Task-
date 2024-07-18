import React from 'react';
import { useGlobalContext } from './Context';

const DropdownSelect = ({ label, value, onChange, options }) => (
    <div className='dropdown my-3'>
        <label>{label}</label>
        <select value={value} onChange={onChange}>
            {options.map((item) => (
                <option key={item.id} value={item.Name}>
                    {item.Name}
                </option>
            ))}
        </select>
    </div>
);

const Dropdown = () => {
    const {
        origin, setOrigin,
        destination, setDestination,
        cabinSelection, setCabinSelection,
        handleSubmit
    } = useGlobalContext();

    const dropdownData = [
        {
            label: "Origin",
            value: origin,
            onChange: (e) => setOrigin(e.target.value),
            options: [
                { id: 1, Name: "JFK" },
                { id: 2, Name: "DEL" },
                { id: 3, Name: "SYD" },
                { id: 4, Name: "BOM" },
                { id: 5, Name: "BNE" },
                { id: 6, Name: "BLR" }
            ]
        },
        {
            label: "Destination",
            value: destination,
            onChange: (e) => setDestination(e.target.value),
            options: [
                { id: 1, Name: "JFK" },
                { id: 2, Name: "DEL" },
                { id: 3, Name: "SYD" },
                { id: 4, Name: "LHR" },
                { id: 5, Name: "CDG" },
                { id: 6, Name: "DOH" },
                { id: 7, Name: "SIN" }
            ]
        },
        {
            label: "Cabin Selection",
            value: cabinSelection,
            onChange: (e) => setCabinSelection(e.target.value),
            options: [
                { id: 1, Name: "Economy" },
                { id: 2, Name: "Business" },
                { id: 3, Name: "First" }
            ]
        }
    ];

    return (
        <div className='col-md-12 col-lg-6'>
            <form onSubmit={handleSubmit}>
                {dropdownData.map((dropdown, index) => (
                    <DropdownSelect
                        key={index}
                        label={dropdown.label}
                        value={dropdown.value}
                        onChange={dropdown.onChange}
                        options={dropdown.options}
                    />
                ))}
                <button className='btn btn-success my-4' type="submit">Search</button>
            </form>
        </div>
    );
};

export default Dropdown;
