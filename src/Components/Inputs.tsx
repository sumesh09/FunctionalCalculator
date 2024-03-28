import React from "react";

interface Iprops {
    input: string;
    hasError: boolean;
}

const Inputs = ({input , hasError}: Iprops) => {
    return(
        <div className="input-container">
            {hasError ? <h1>Error</h1>:<h1>{input ? input : "0"}</h1>}
        </div>
    )
};
export default Inputs;