import React from 'react';
const ExperienceOption = () => {
    return (
    <div>
        <select className="w-full">
            <option value="Choose" disabled hidden>Choose</option>
            <option value="<3 years">Less than 3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5-10 years">5-10 years</option>
            <option value="10+ years">More than 10 years</option>
        </select>
    </div>
    );
};

export default ExperienceOption;