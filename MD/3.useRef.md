# useRef


![useRef](https://kinsta.com/wp-content/uploads/2023/05/react-useref.jpg)

- The main purpose of `ref` object translates as `reference` in React. It is used to store a reference to a DOM element or a value that persists across renders without causing a re-render when it changes.


---

#### **`useRef`** in React is used for several purposes:

- `Accessing DOM Elements`: It allows you to directly access and interact with a DOM element. This is useful for tasks like focusing an input, scrolling to a specific element, or measuring the size of an element.

- `Storing Mutable Values`: It can hold a mutable value that persists across renders without causing a re-render when it changes. This is useful for storing values like timers, previous state values, or any other mutable object.

- `Avoiding Re-renders`: Since useRef does not cause a component to re-render when its value changes, it can be used to store values that should not trigger a re-render.

---

## Example Usage

#### Accessing DOM Elements
```jsx
import React, { useRef, useEffect } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```


### Storing Mutable Values
```jsx
import React, { useRef, useEffect } from 'react';

function Timer() {
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      console.log('Tick');
    }, 1000);

    return () => {
      clearInterval(timerId.current);
    };
  }, []);

  return <div>Check the console for ticks</div>;
}
```


### Avoiding Re-renders
```jsx
import React, { useRef, useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    setCount(countRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

---
## `NOTES`

1. The value of a `ref` object is stored in its `current` property. The `current` property is mutable and can be updated directly.

2. The value of a `ref` object persists for the entire lifetime of the component.

3. The value of a `ref` object does not cause the component to re-render when it changes.

4. The value of a `ref` object can be any type of value, not just DOM elements.



--- 

## With Forms

```jsx
import React, { useRef } from 'react';

function Form() {
  const formRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);
        console.log(data);
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Email:
                <input type="email" name="email" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}
```