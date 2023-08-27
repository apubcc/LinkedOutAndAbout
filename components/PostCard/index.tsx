import React from 'react';
import { useState } from 'react';

import heartBlack from '../../public/images/heartBlack.svg';
import heartWhite from '../../public/images/heartWhite.svg';

export default function PostCard() {
    const  [isLoved, setIsLoved] = React.useState(true);

    function handleLoveClick() {
        setIsLoved(!isLoved);
    }

    return (
        <div className="card bg-white/[0.3] p-10 rounded-xl snap-center">
            <div className="card-header mb-3 font-bold">
                <div className="card-username">USER ABC</div>
                <div className="card-sector text-xs">Computer Science</div>
            </div>
            <div className="card-body">
                <div className="card-content">
                    Working for 5 years in XXX. Blah blah blah...
                    Working for 5 years in XXX. Blah blah blah...
                    Working for 5 years in XXX. Blah blah blah...
                    {/* Working for 5 years in XXX. Blah blah blah...
                    Working for 5 years in XXX. Blah blah blah...
                    Working for 5 years in XXX. Blah blah blah...
                    Working for 5 years in XXX. Blah blah blah...
                    Working for 5 years in XXX. Blah blah blah... */}
                </div>
            </div>
            <div className="card-footer flex mt-5">
                <div className="card-approveLove">
                    <img className="w-[24px] hover:cursor-pointer" onClick={() => handleLoveClick()} src={isLoved ? heartBlack.src : heartWhite.src} alt="@" />
                </div>
                <div className="card-approveLoveCount ml-1">123</div>
            </div>
        </div>
    )
}