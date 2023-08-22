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
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex flex-row gap-20">
                <div className="flex flex-col justify-center items-center w-full">
                    <FrostedGlassBox className="h-auto inline-item-center">
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

                <div className="flex flex-col justify-center items-center w-full">
                    <FrostedGlassBox className="h-auto inline-item-center">
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

                <div className="flex flex-col justify-center items-center w-full">
                    <FrostedGlassBox className="h-auto inline-item-center">
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
            <div className="flex flex-row">
                <div className="mt-8">
                    <FrostedGlassBox className="nft-card">
                        NFT
                    </FrostedGlassBox>
                    {/* Repeat for other NFT cards */}
                </div>
            </div>
        </div>
    );
};

export default EmployerViewPage;
