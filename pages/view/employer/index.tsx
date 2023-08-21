import React, { useState } from "react";
import FrostedGlassBox from "../../../components/FrostedCard";

const EmployerViewPage = () => {
    const containerStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Optional: adjust the container height
    };

    const cardsContainerStyle = {
        display: "flex",
        flexDirection: "row", // Stack the cards in a column
        gap: "20px", // Gap between the cards
    };

    const cardStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", // Make cards take full width
    };

    const cardTitleStyle = {
        fontSize: 30,
        marginBottom: "10px",
        cursor: "pointer",
        textAlign: "center",
    };

    const sectorDropdownStyle = {
        display: "none", // Start with dropdown hidden
        marginTop: "5px",
        textAlign: "center",

    };

    const nftcardstyle = {
        display: "flex",
        flexDirection: "row", // Stack the cards in a column
    };

    const [showSectorDropdown, setShowSectorDropdown] = useState(false);

    const toggleSectorDropdown = () => {
        setShowSectorDropdown(!showSectorDropdown);
    };

    return (
        <div style={containerStyle} className="create-container mb-100">
            <div style={cardsContainerStyle} className="cards-container ">
                <div style={cardStyle} className="card">
                    <FrostedGlassBox className={"h-auto inline-item-center"}>
                        <div className="list-choice">
                            <div
                                className="list-choice-title"
                                style={cardTitleStyle}
                                onClick={toggleSectorDropdown}
                            >
                                Sector
                            </div>
                            <div
                                className="list-choice-objects"
                                style={{ ...sectorDropdownStyle, display: showSectorDropdown ? "block" : "none" }}
                            >
                                <select>
                                    <option value="developer">Developer</option>
                                    <option value="designer">Designer</option>
                                    <option value="business">Business</option>
                                    <option value="marketing">Marketing</option>
                                </select>
                            </div>
                        </div>
                    </FrostedGlassBox>
                </div>

                <div style={cardStyle} className="card">
                    <FrostedGlassBox className={"h-auto inline-item-center"}>
                        <div className="list-choice">
                            <div
                                className="list-choice-title"
                                style={cardTitleStyle}
                                onClick={toggleSectorDropdown}
                            >
                                Skills
                            </div>
                            {showSectorDropdown && (
                                <div className="list-choice-objects"
                                style={{ ...sectorDropdownStyle, display: showSectorDropdown ? "block" : "none" }}
                                > 
                                    <select>
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
                            )}
                        </div>
                    </FrostedGlassBox>
                </div>

                <div style={cardStyle} className="card">
                    <FrostedGlassBox className={"h-auto inline-item-center"}>
                        <div className="list-choice">
                            <div
                                className="list-choice-title"
                                style={cardTitleStyle}
                                onClick={toggleSectorDropdown}
                            >
                                Experience
                            </div>
                            {showSectorDropdown && (
                                <div className="list-choice-objects"
                                style={{ ...sectorDropdownStyle, display: showSectorDropdown ? "block" : "none" }}>
                                    <select>
                                        <option value="Choose" disabled hidden>Choose</option>
                                        <option value="<3 years">Less than 3 years</option>
                                        <option value="3-5 years">3-5 years</option>
                                        <option value="5-10 years">5-10 years</option>
                                        <option value="10+ years">More than 10 years</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </FrostedGlassBox>
                </div>
                
            </div>
        <div style={nftcardstyle}>
            <div className="mt-50">
                <FrostedGlassBox className="nft-card ">
                    NFT
                </FrostedGlassBox>
                <FrostedGlassBox className="nft-card">
                    NFT
                </FrostedGlassBox>
                <FrostedGlassBox className="nft-card">
                    NFT
                </FrostedGlassBox>
            </div>
        </div>    
        </div>

        
    );
};

export default EmployerViewPage;


