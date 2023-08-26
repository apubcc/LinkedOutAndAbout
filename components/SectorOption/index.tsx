import React from 'react';
const SectorOption = () => {
    return (
    <div>
        <select className="w-full">
            <option value="Choose" disabled hidden>Choose</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
        </select>
    </div>
    );
};
export default SectorOption;