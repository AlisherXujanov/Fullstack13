import { memo } from "react";

function Test() {
    console.log("This component has been called!")
    return (
        <div>  
            <h1>Component for testing</h1>
        </div>
    );
}

export default memo(Test)