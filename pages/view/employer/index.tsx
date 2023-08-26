import React, { useState } from "react";
import FrostedGlassBox from "../../../components/FrostedCard";
import SectorOption from "../../../components/SectorOption";
import SkillsOption from "../../../components/SkillsOption";
import ExperienceOption from "../../../components/ExperienceOption";

const EmployerViewPage = () => {
    const [showSectorDropdown, setShowSectorDropdown] = useState(false);

    const toggleSectorDropdown = () => {
        setShowSectorDropdown(!showSectorDropdown);
    };

    return (
        <div className="flex flex-col h-screen justify-between p-8">
            <div className="flex flex-row justify-center mt-20 items-start flex-grow gap-20">
                {/* Sector */}
                <div className="flex flex-col justify-center items-center flex-grow">
                    <FrostedGlassBox className="w-full h-full flex justify-center items-center ml-20">
                        <div className="list-choice">
                            <div
                                className="list-choice-title text-3xl mb-2 cursor-pointer text-center"
                                onClick={toggleSectorDropdown}
                            >
                                Sector
                            </div>
                            <div className={`list-choice-objects ${showSectorDropdown ? "block" : "hidden"} mt-1 text-center`}>
                                <SectorOption />
                            </div>
                        </div>
                    </FrostedGlassBox>
                </div>

                {/* Skills */}
                <div className="flex flex-col justify-center items-center flex-grow">
                    <FrostedGlassBox className="w-full h-full flex justify-center items-center">
                        <div className="list-choice">
                            <div
                                className="list-choice-title text-3xl mb-2 cursor-pointer text-center"
                                onClick={toggleSectorDropdown}
                            >
                                Skills
                            </div>
                            {showSectorDropdown && (
                                <div className={`list-choice-objects ${showSectorDropdown ? "block" : "hidden"} mt-1 text-center`}>
                                    <SkillsOption />
                                </div>
                            )}
                        </div>
                    </FrostedGlassBox>
                </div>

                {/* Experience */}
                <div className="flex flex-col justify-center items-center flex-grow">
                    <FrostedGlassBox className="w-full h-full flex justify-center items-center">
                        <div className="list-choice">
                            <div
                                className="list-choice-title text-3xl mb-2 cursor-pointer text-center"
                                onClick={toggleSectorDropdown}
                            >
                                Experience
                            </div>
                            {showSectorDropdown && (
                                <div className={`list-choice-objects ${showSectorDropdown ? "block" : "hidden"} mt-1 text-center`}>
                                    <ExperienceOption />
                                </div>
                            )}
                        </div>
                    </FrostedGlassBox>
                </div>
            </div>
            
            {/* NFT Section */}
            <div className="flex relative flex-row justify-center items-center mb-20 gap-20 ml-8  w-full">
                <FrostedGlassBox className="w-40 h-40 flex justify-center items-center">
                    NFT
                </FrostedGlassBox>
                <FrostedGlassBox className="w-40 h-40 flex justify-center items-center">
                    NFT
                </FrostedGlassBox>
                <FrostedGlassBox className="w-40 h-40 flex justify-center items-center">
                    NFT
                </FrostedGlassBox>
            </div>
        </div>
    );
};

export default EmployerViewPage;