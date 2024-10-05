# useState

<img src='https://i0.wp.com/blog.deepdhamala.com.np/wp-content/uploads/2024/01/WhatsApp-Image-2024-01-28-at-21.08.58.jpeg?fit=1000%2C750&ssl=1' width='100%' height='500'>


## State ?
- State is a built-in feature in React components that allows components to keep track of changing data. In other words, we can translate it as `memory for a component` too. 


## What is useState in React and Why Do We Need It?
Imagine you have a toy that can change colors. You want to keep track of its current color and be able to change it whenever you want. `useState` is like a special box where you can store the color of the toy.

- **`Keep Track`**: `useState` helps you remember the current color of the toy.
- **`Change Color`**: It also gives you a button to change the color whenever you want.
So, useState is like a magic box that helps you remember things and change them easily in your toy (or in your app).


## Initializing State with useState

1. `Import useState`: First, you need to import useState from React.
2. `Declare State Variable`: Use useState to declare a state variable and a function to update it.
3. `Initialize State`: Pass the initial value of the state to useState.


Here is a simple example of a React component that uses useState to keep track of a color and change it when a button is clicked.

### Pseudocode steps:
1. Import React and useState.
2. Create a functional component.
3. Inside the component, use useState to declare a state variable for the color.
4. Create a button that changes the color when clicked.
5. Render the color and the button.
   
### Code
```jsx
import React, { useState } from 'react';

function ColorChanger() {
  // Step 3: Declare a state variable for the color and initialize it to 'red'
  const [color, setColor] = useState('red');

  // Function to change the color
  const changeColor = () => {
    setColor(color === 'red' ? 'blue' : 'red');
  };

  return (
    <div>
      <p>The current color is: {color}</p>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}

export default ColorChanger;
```


### Explanation of the Code
1. ***`Importing`***: - `useState` is imported from React.
2. ***`State Declaration`***: - `const [color, setColor] = useState('red')`; declares a state variable `'color'` with an initial value of `'red'` and a function `'setColor'` to update it.
3. ***`Change Function`***: `'changeColor'` function toggles the color between `'red'` and `'blue'`.
4. ***`Rendering`***: The component renders the current color and a button that changes the color when clicked.


### NOTES:
- `useState` can have any data-type (string, number, object, array, etc.).
- `useState` can be used multiple times in a component to manage different states.