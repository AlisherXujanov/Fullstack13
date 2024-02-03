import { memo } from 'react';

function Test() {
    console.log("Hello world")

    return (
        <>
            <h1>Test</h1>
        </>
    );
}

export default memo(Test);