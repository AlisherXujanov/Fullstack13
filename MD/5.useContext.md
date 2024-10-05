# useContext

![useContext](https://www.cronj.com/blog/wp-content/uploads/React-Context-How-to-Use-the-useContext-Hook.png)


## Context ?

- It is similar to `State = memory for a component` but it is used to pass data through the component tree without having to pass props down manually at every level.



## What is `useContext` in React and Why Do We Need It?

`useContext` is a hook in React that allows you to access the context value directly in a functional component. Context provides a way to pass data through the component tree without having to pass props down manually at every level. This is particularly useful for global data like themes, user information, or settings.

---

## Easy Use Cases
  1. **`Theme Management`**:
     - You can create a ThemeContext to manage light and dark themes across your application.
     - Example:
        ```jsx
        import { useContext, createContext } from 'react';
        const ThemeContext = createContext('light');
        
        function ThemedComponent() {
          const theme = useContext(ThemeContext);
          return <div className={theme}>Hello, World!</div>;
        }
        
        function App() {
          return (
            <ThemeContext.Provider value="dark">
              <ThemedComponent />
            </ThemeContext.Provider>
          );
        }
        ```
  2. **`User Authentication`**
     - Manage user authentication state and provide user information to components.
     - Example:
        ```jsx
        import { useContext, createContext } from 'react';

        const UserContext = createContext(null);

        function UserProfile() {
          const user = useContext(UserContext);
          return user ? <div>Welcome, {user.name}!</div> : <div>Please log in.</div>;
        }

        function App() {
          const user = { name: 'John Doe' };
          return (
            <UserContext.Provider value={user}>
              <UserProfile />
            </UserContext.Provider>
          );
        }
        ```

---

## Advanced Use Cases

1. **`Complex State Management`**:

   - Use useContext with useReducer for managing complex state logic.
   - Example:
      ```jsx
      import { useReducer, useContext, createContext } from 'react';
      const CountContext = createContext();
      function countReducer(state, action) {
        switch (action.type) {
          case 'increment':
            return { count: state.count + 1 };
          case 'decrement':
            return { count: state.count - 1 };
          default:
            throw new Error();
        }
      }

      function Counter() {
        const { state, dispatch } = useContext(CountContext);
        return (
          <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
          </div>
        );
      }

      function App() {
        const [state, dispatch] = useReducer(countReducer, { count: 0 });
        return (
          <CountContext.Provider value={{ state, dispatch }}>
            <Counter />
          </CountContext.Provider>
        );
      }
      ```


2. **`Dynamic Form Handling:`**:

   - Use `useContext` with `useReducer` for managing complex state logic.
   - Example:
      ```jsx
      import { useContext, useState, createContext } from 'react';

      const FormContext = createContext();

      function useForm() {
        const context = useContext(FormContext);
        if (!context) {
          throw new Error('useForm must be used within a FormProvider');
        }
        return context;
      }

      function FormProvider({ children }) {
        const [formState, setFormState] = useState({});
        const updateField = (name, value) => {
          setFormState((prev) => ({ ...prev, [name]: value }));
        };
        return (
          <FormContext.Provider value={{ formState, updateField }}>
            {children}
          </FormContext.Provider>
        );
      }

      function InputField({ name }) {
        const { formState, updateField } = useForm();
        return (
          <input
            value={formState[name] || ""}
            onChange={(e) => updateField(name, e.target.value)}
          />
        );
      }

      function App() {
        return (
          <FormProvider>
            <InputField name="username" />
            <InputField name="email" />
          </FormProvider>
        );
      }
      ```

---