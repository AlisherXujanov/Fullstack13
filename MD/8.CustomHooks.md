# Costom Hooks

![Custom Hooks](https://www.mbloging.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fyynr1uml%2Fproduction%2F49bdcb871b5425e11a8250e629f08aa72804497b-1621x1081.jpg%3Fw%3D1621%26auto%3Dformat&w=3840&q=75)


`Custom Hooks` in React are functions that allow you to reuse stateful logic across different components. They start with the word "use" and can call other hooks inside them.


---

## How to Create and Use Custom Hooks
 1. **`Creating a Custom Hook`**:
    - Define a function that starts with `"use"`.
Use built-in hooks (like `useState`, `useEffect`) inside this function.
Return any values or functions that you want to use in your components.
    - Use built-in hooks (like `useState`, `useEffect`) inside this function.
    - Return any values or functions that you want to use in your components.

 2. **`Using a Custom Hook:`**.
    - Import the custom hook into your component.
    - Call the custom hook inside your component function.

---

## Very Easy Use Case: Fetching Data

### Custom Hook:
```jsx
// useFetch.js
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

export default useFetch;
```
### Using the Custom Hook:
```jsx
// App.js
import React from 'react';
import useFetch from './useFetch';

function App() {
  const { data, loading } = useFetch('https://api.example.com/data');

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
```

--- 

## Advanced Use Case: Form Handling

### Custom Hook:
```jsx
// useForm.js
import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
}

export default useForm;
```

### Using the Custom Hook:
```jsx
// FormComponent.js
import React from 'react';
import useForm from './useForm';

function FormComponent() {
  const { values, handleChange, resetForm } = useForm({ username: '', email: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" name="username" value={values.username} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input type="email" name="email" value={values.email} onChange={handleChange} />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FormComponent;
```

---

# Summary
- **Custom Hooks** allow you to reuse logic.
- They are functions that start with "use".
- You can use them to handle common tasks like data fetching and form handling