
# useCallback
![useCallback](https://media.licdn.com/dms/image/D5612AQFEpnB2OXvfCQ/article-cover_image-shrink_600_2000/0/1687096796439?e=2147483647&v=beta&t=_hwwa9mte9Be3NEqW1SUz6E9HyoSA8U0Z1yeaK4i_oA)

Why we use **useCallback** in React ?

1. `Avoid Unnecessary Work`: When a parent component re-renders, it can cause its child components to re-render too. If you pass a function to a child component, React might think the function is new every time, causing the child to re-render. useCallback helps to keep the same function reference, so the child doesn't re-render unless it really needs to.

2. `Keep Functions Stable`: Sometimes, you need a function to stay the same between renders, like when using it in other hooks. useCallback ensures the function doesn't change unless its dependencies change.


## Example:

### `ParentComponent.js`

```jsx
import React, { useState, useCallback } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  // useCallback keeps the same function unless 'count' changes
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <p>Parent Count: {count}</p>
      <ChildComponent onIncrement={increment} />
    </div>
  );
};

export default ParentComponent;
```


### `ChildComponent.js`
```jsx
import React from 'react';

const ChildComponent = ({ onIncrement }) => {
  console.log('ChildComponent rendered');

  return (
    <div>
      <button onClick={onIncrement}>Increment Parent Count</button>
    </div>
  );
};

export default ChildComponent;
```

<br>

## Explanation

1. **`ParentComponent`**:

   - Manages a `count` state.
   - Defines an `increment` function using ***`useCallback`*** to ensure it only `changes` when count changes.
   - Passes the `increment` function to `ChildComponent` as a prop.

2. **`ChildComponent`**:

   - Receives the `onIncrement` function as a prop.
   - Renders a button that calls `onIncrement` when clicked.

<br><br>

By using `useCallback` in `ParentComponent`, the `increment` function reference remains stable across renders, preventing `ChildComponent` from re-rendering unnecessarily when the parent re-renders for reasons other than `count` changing.