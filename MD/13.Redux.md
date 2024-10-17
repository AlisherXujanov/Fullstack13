# Redux

<!-- On netlify https://todo-redux-list.netlify.app/ -->


## Install

```bash
npm i @reduxjs/toolkit react-redux
```
In the src folder create a folder called “store”. Inside store create two files — “slice.jsx” and “store.jsx”. We will create a very simple todo app with redux. Another thing the state container (defined above) will refresh everytime you refresh the page and that’s where databases come in (with enough claps or comments I’ll show you how to connect with Mongo DB).

Inside “slice.jsx”, a few things will have to be defined.

- initialState — as the name suggest this will be the initial state of the todo variable.
- name — this is the name of our reducer, “todos”
- reducers — this has the functions that will affect our initialState.todos
- A “slice” is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.


`slice.jsx`
```jsx
import { createSlice } from "@reduxjs/toolkit";  
  
// todo - status (complete, incomplete), text, id  
const initialState = {  
  todos: [  
    { id: 1, text: "Create a react app", status: "incomplete" },  
    { id: 2, text: "Create a redux app", status: "incomplete" },  
    { id: 3, text: "Create a redux toolkit app", status: "incomplete" },  
  ],  
};  
  
export const todoSlice = createSlice({  
  name: "todos",  
  initialState,  
  reducers: {  
    addToTodos: (state, action) => {  
      const newTodo = action.payload;  
      state.todos.push(newTodo);  
    },  
    editTodos: (state, action) => {  
      const { id, text } = action.payload;  
      const existingTodo = state.todos.find((todo) => todo.id === id);  
      if (existingTodo) {  
        existingTodo.text = text;  
      }  
    },  
    removeFromTodos: (state, action) => {  
      const id = action.payload;  
      state.todos = state.todos.filter((todo) => todo.id !== id);  
    },  
    changeTodoStatus: (state, action) => {  
      const id = action.payload;  
      const existingTodo = state.todos.find((todo) => todo.id === id);  
      if (existingTodo.status === "incomplete") {  
        existingTodo.status = "complete";  
      } else {  
        existingTodo.status = "incomplete";  
      }  
    },  
  },  
});  
  
export const { addToTodos, editTodos, removeFromTodos, changeTodoStatus } =  todoSlice.actions;  
export default todoSlice.reducer;
```

We have to import { createSlice } so as to be able to create a slice.

In “store.jsx”, we have to define the reducer and configure the store

`store.jsx`
```jsx
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice";

const store = configureStore({ reducer: { todos: todoReducer } });

export default store;
```

We also have to add the store to our react app, in “main.jsx”

`main.jsx`
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Wrap your app in the Provider */}
    {/* The store we defined earlier */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
```


With the store and slice defined we can go to step number four which is creating 
a frontend for the client. I will make it as simple as possible.


Install icons to use at the application:
```bash
npm i react-icons --save
```

I may have gone a little overboard but I have explained the code using comments. 
I have a component called “Todo.jsx” where a todo can be edited, deleted and marked as complete or incomplete.



`todo.jsx`
```jsx
import "./Todo.scss";

import { useDispatch } from "react-redux";
import { BsCheckCircle, BsPencil, BsTrash } from "react-icons/bs";
import { changeTodoStatus, removeFromTodos } from "../store/slice";

const Todo = ({ todo, handleEdit }) => {
  const dispatch = useDispatch();

  // A function to handle the status property.  
  const handleStatus = () => {
    dispatch(changeTodoStatus(todo.id));
  };

  // A function to handle the delete button.  
  const handleDelete = () => {
    dispatch(removeFromTodos(todo.id));
  };

  return (
    <div className="todo">
      <div className="text">
        <span className={`${todo.status === "complete" && "complete"}`}>
          {todo.text}
        </span>
      </div>
      <div className="edit">
        <div onClick={() => handleEdit(todo.id)}>
          <BsPencil />
        </div>
        <div onClick={handleStatus}>
          <BsCheckCircle />
        </div>
        <div onClick={handleDelete}>
          <BsTrash />
        </div>
      </div>
    </div>
  );
};

export default Todo;
```


`Todo.scss`
```scss
// Define variables
$primary-color: #727272;
$padding: 4px 12px 4px 0;
$transition-duration: .3s;
$scale-factor: 1.1;

// Mixin for flex center alignment
@mixin flex-center {
    display: flex;
    align-items: center;
}

// Mixin for hover scale effect
@mixin hover-scale($factor) {
    cursor: pointer;
    transition: transform $transition-duration ease-in-out;

    &:hover {
        transform: scale($factor);
    }
}

.todo {
    width: 100%;
    padding: $padding;
    border-bottom: 1px solid $primary-color;
    @include flex-center;

    .text {
        flex: 1;

        .complete {
            text-decoration: line-through;
            color: $primary-color;
        }
    }

    .edit {
        display: flex;
        gap: 4px;

        div {
            @include hover-scale($scale-factor);
        }
    }
}

@media(max-width: 380px) {
    .todo {
        flex-direction: column;
        align-items: flex-start;
    }
}
```


Clean the “App.css” and “App.jsx”. After clearing 
the default code, the code following is what I came up with.


`App.jsx`
```jsx
import "./App.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./component/Todo";
import { addToTodos, removeFromTodos } from "./store/slice";
import { BsPlusCircle } from "react-icons/bs";

const App = () => {
  // A hook to access the redux dispatch function.
  // This is the only way to trigger a state change.
  const dispatch = useDispatch();

  // A hook to access the redux store's state.
  // This hook takes a selector function as an argument.
  // The selector is called with the store state.
  // state.todos.todos todos is the name of the reducer and the name of the variable in the initialState.
  const todos = useSelector((state) => state.todos.todos);

  // A variable used by the input field to store the text.
  const [text, setText] = useState("");

  // A function to handle the add button.
  const handleAdd = () => {
    // If the input field is empty, return.
    if (text === "") {
      return;
    }

    // Dispatch an action to add a todo.
    dispatch(
      addToTodos({
        id: Math.floor(Math.random() * 1000),
        text,
        status: "incomplete",
      })
    );
    setText(""); // Clear the input field after adding
  };

  const handleEdit = (id) => {
    // A function to handle the edit button.
    // Find the todo with the given id.
    const existingTodo = todos.find((todo) => todo.id === id);

    // Set the text in the input field to the text of the todo.
    setText(existingTodo.text);

    // Dispatch an action to remove the todo.
    dispatch(removeFromTodos(id));
  };

  return (
    <div className="app">
      <div className="content">
        <div className="header">
          <span className="title">Todo List</span>
        </div>
        <div className="add">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
          />
          <button onClick={handleAdd}>
            <BsPlusCircle />
            <span>Add</span>
          </button>
        </div>
        <div className="main">
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} handleEdit={handleEdit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
```

`App.scss`
```scss
// Define variables
$background-color: #212121;
$content-background-color: #424242;
$font-color: #fff;
$title-font-family: "Mooli";
$title-font-size: 48px;
$header-font-size: 24px;

// Define mixins
@mixin flex-center($direction: row, $gap: 0) {
    display: flex;
    flex-direction: $direction;
    align-items: center;
    gap: $gap;
}

@mixin full-size {
    height: 100%;
    width: 100%;
}

@mixin font-style($family, $size) {
    font-family: $family;
    font-size: $size;
}

// Use mixins in your styles
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.app {
    background-color: $background-color;
    color: $font-color;
    @include full-size;
    @include flex-center(column);

    .content {
        padding: 10px;
        align-items: center;
        width: 80%;
        background-color: $content-background-color;
        @include full-size;
        @include flex-center(column, 10px);

        .header {
            @include flex-center(column, 4px);

            span.title {
                @include font-style($title-font-family, $title-font-size);
            }

            div {
                @include font-style($title-font-family, $header-font-size);
                @include flex-center(row, 4px);
            }
        }

        .add {
            width: 100%;
            @include flex-center(row, 8px);

            input {
                flex: 1;
            }
        }

        .main {
            overflow-y: scroll;
            @include flex-center(column, 6px);
            @include full-size;
        }
    }

    @media (max-width: 480px) {
        .content {
            width: 98%;
        }
    }

    @media (max-width: 380px) {
        .content {
            .add {
                flex-direction: column;

                input {
                    width: 100%;
                }
            }
        }
    }
}
```