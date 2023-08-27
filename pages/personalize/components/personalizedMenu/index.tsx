/* eslint-disable react/jsx-key */
import React from 'react';
import { useState, useEffect } from 'react';

// import "../../../../styles/personalizedMenu.css"

type PersonalizedMenuProps = {
    role: string;
}

export function PersonalizedMenu(props: PersonalizedMenuProps) {
    const { role } = props;

    if (role !== "jobseeker" && role !== "employer") {
        return (
            <div>
                <p>Invalid role</p>
            </div>
        )
    };

    const [pageRole, setPageRole] = useState(role);
    const [sectorSelection, setSectorSelection] = useState([""]);
    const [skillsOptions, setSkillsOptions] = useState([["", ""]]);
    const [sectorOptions, setSectorOptions] = useState([["Developer", "developer"], ["Designer", "designer"], ["Business", "business"], ["Marketing", "marketing"]]);
    const [languagesOptions, setLanguagesOptions] = useState([["English","english"], ["Chinese", "chinese"], ["Spanish", "spanish"], ["French", "french"], ["German", "german"], ["Italian", "italian"], ["Russian", "russian"], ["Portuguese", "portuguese"], ["Hindi", "hindi"], ["Arabic", "arabic"], ["Japanese", "japanese"], ["Other", "other"]]);

    const skillsForDeveloper = [["HTML", "html"], ["CSS", "css"], ["JavaScript", "javascript"], ["React", "react"], ["Node.js", "nodejs"], ["Solidity", "solidity"],["Python", "python"], ["Java", "java"], ["C++", "c++"], ["C#", "c#"], ["SQL", "sql"], ["Other", "other"]];
    const skillsForDesigner = [["Photoshop", "photoshop"], ["Illustrator", "illustrator"], ["Figma", "figma"], ["Other", "other"]];
    const skillsForBusiness = [["Finance", "finance"], ["Marketing", "marketing"], ["Other", "other"]];
    const skillsForMarketing = [["Finance", "finance"], ["Marketing", "marketing"], ["Other", "other"]];
    const skillsForAll = [...skillsForDeveloper, ...skillsForDesigner, ...skillsForBusiness, ...skillsForMarketing];

    function onSelectSector(e: any) {
        setSectorSelection([e.target.value]);
    }

    useEffect(() => {
        var skills = [["", ""]];

        if (sectorSelection[0] === "developer") {
            skills = [...skillsForDeveloper];
        };

        if (sectorSelection[0] === "designer") {
            skills = [...skillsForDesigner];
        };

        if (sectorSelection[0] === "business") {
            skills = [...skillsForBusiness];
        };

        if (sectorSelection[0] === "marketing") {
            skills = [...skillsForMarketing];
        };

        setSkillsOptions(skills);
    }, [sectorSelection]);

    return (
        <div className='h-screen v-screen flex p-6 overflow-y-scroll'>
            <div className='m-auto p-14 rounded-2xl bg-white/[.3]'>
                <div className='font-bold text-2xl pb-14'>Personalize your {pageRole} profile.</div>
                <form className=''>
                    <div>
                        <div className='flex flex-col mb-8'>
                            { pageRole === "jobseeker" && 
                                <>
                                    <label htmlFor="sector">What sector are you in?</label>
                                    <select name="sector" id="sector" defaultValue={"Choose"} onChange={(e) => onSelectSector(e)}>
                                        <option value="Choose" disabled hidden>Choose</option>
                                        {sectorOptions.map((sector, i) => {
                                            return (
                                                <option value={sector[1]} key={"sector" + i}>{sector[0]}</option>
                                            )
                                        })}
                                    </select>
                                </>
                            }

                            { pageRole === "employer" &&
                                <>
                                    <label htmlFor="sector">What sectors you looking for?</label>
                                    {sectorOptions.map((sector, i) => {
                                        return (
                                            <div>
                                                <input type="checkbox" id={sector[1]} name={sector[1]} value={sector[1]} key={"sectorCheckbox" + i}/>
                                                <label htmlFor={sector[1]} key={"sectorLabel" + i}>{sector[0]}</label>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>
                        <div className='flex flex-col mb-8'>
                            {pageRole === "jobseeker" &&
                                <>
                                    <label htmlFor="skills">What skills do you know?</label>
                                    {skillsOptions.map((skill, i) => {
                                        return (
                                            <div>
                                                <input type="checkbox" id={skill[1]} name={skill[1]} value={skill[1]} key={"skillCheckbox" + i}/>
                                                <label htmlFor={skill[1]} key={"skillLabel" + i}>{skill[0]}</label>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                            {pageRole === "employer" &&
                                <>
                                    <label htmlFor="skills">What skills are you looking for?</label>
                                    {skillsForAll.map((skill, i) => {
                                        return (
                                            <div>
                                                <input type="checkbox" id={skill[1]} name={skill[1]} value={skill[1]} key={"skillCheckbox" + i}/>
                                                <label htmlFor={skill[1]} key={"skillLabel" + i}>{skill[0]}</label>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                        </div>
                        <div className='flex flex-col mb-8'>
                            {pageRole === "jobseeker" &&
                                <label htmlFor="languages">What languages do you know?</label>
                            }
                            {pageRole === "employer" &&
                                <label htmlFor="languages">What languages are you looking for?</label>
                            }
                            {languagesOptions.map((language, i) => {
                                return (
                                    <div>
                                        <input type="checkbox" id={language[1]} name={language[1]} value={language[1]} key={"languageCheckbox" + i}/>
                                        <label htmlFor={language[1]} key={"languageLabel" + i}>{language[0]}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='flex'>
                            <button className='bg-black text-white font-bold py-2 px-4 rounded mt-5 ml-auto' type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}