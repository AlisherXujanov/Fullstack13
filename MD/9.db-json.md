Json-server is a simple tool primarily for prototyping and mockups. It lets you generate a full REST API with CRUD (Create, Read, Update, Delete) operations without writing any server-side code
   - RU: Json-server это простой инструмент в первую очередь для прототипирования и макетов. Он позволяет генерировать полный REST API с операциями CRUD (Create, Read, Update, Delete) без написания какого-либо серверного кода


## 1. Full Documentation: 
   - RU: Полная документация: 
[Json-server](https://github.com/typicode/json-server)

## 2. Install json-server globally:
   - RU: Установите json-server глобально:
```bash
npm install -g json-server
```

## 3. Create a db.json file with some data:
   - RU: Создайте файл db.json с некоторыми данными:
```json
{
    "users": [
        {
            "id": 1,
            "name": "admin",
            "email": "admin@gmail.com",
            "password": "qweqweqwe",
            "role": "admin"
        }
    ]
}
```

## 4. Start json-server:
    - RU: Запустите json-server:
```bash
# json-server --watch db.json
# ---------------------------
npx json-server --watch db.json
```

For changing the port, use the --port flag:
    - RU: Для изменения порта используйте флаг --port:
```bash
json-server --watch db.json --port 7070
```

## 5. USE json-server in your project:
    - RU: ИСПОЛЬЗУЙТЕ json-server в своем проекте:
We can use any HTTP method (GET, POST, PUT, DELETE) to interact with the server. 
We can also use query parameters to filter the data. 
Here are some examples of JS:

### `GET`
```javascript
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => console.log(data))
```

### `POST`
```javascript
fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: ''
        ...
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
```


### `PUT`
```javascript
fetch('http://localhost:3000/users/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'John Doe',
        email: ''
        ...
    })
})
    .then(response => response.json())
    .then(data => console.log(data))
```

### `DELETE`
```javascript
fetch('http://localhost:3000/users/1', {
    method: 'DELETE'
})
    .then(response => response.json())
    .then(data => console.log(data))
```



# Step 6: Make API requests in React
> - In your React component, use the fetch API or any 
> other HTTP client library to make API requests to 
> the JSON server. Here’s an example using fetch:

```typescript
import { useState, useEffect } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);

  const getData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3030/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => setPosts(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            <span>{post.id}</span> {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
```
___

# Step 7: Create a new post
> - To create a new post, we need to make a POST request to the /posts endpoint.
> - Here’s an example using fetch:
```typescript
import { useState, useEffect } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const createPost = () => {
    var myHeaders = new Headers();
    // Headers are used to set the content type of the request
    // and the format of the data we are sending to the server.

    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      body: body,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3030/posts", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={createPost}>Create Post</button>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            <span>{post.id}</span> {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
```


# Step 8: Update a post
> - To update a post, we need to make a PUT request to the /posts/:id endpoint.
> - Here’s an example using fetch:
```typescript
import { useState, useEffect } from "react";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const updatePost = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      body: body,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:3030/posts/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={() => updatePost(1)}>Update Post</button>
      </div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>
            <span>{post.id}</span> {post.title}
          </h3>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};
```

