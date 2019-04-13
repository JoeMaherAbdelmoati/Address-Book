import React from 'react';

export const Loading = () => {
    return (
        <div className="col-12 loading">
            <div>
                <span className="span-lable-style">Loading</span>
                <span className="vert-move span-style delay-1">
                <span className="">.</span> </span>
                <span className="vert-move span-style delay-2"><span>.</span> </span>
                <span className="vert-move span-style delay-3"><span>.</span> </span></div>
        </div>
    );
};