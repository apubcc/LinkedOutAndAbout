import React from 'react';
const SkillsOption = () => {
    return (
    <div>
        <select className="w-full">
            <option value="Choose" disabled hidden>Choose</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="Solidity">Solidity</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
            <option value="C#">C#</option>
            <option value="SQL">SQL</option>
            <option value="Other">Other</option>
            <option value="Photoshop">Photoshop</option>
            <option value="Illustrator">Illustrator</option>
            <option value="Figma">Figma</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
        </select>
    </div>
    );
};
export default SkillsOption;