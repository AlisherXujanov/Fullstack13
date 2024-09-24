# TABLE OF CONTENTS

- [TABLE OF CONTENTS](#table-of-contents)
- [Installation](#installation)
- [Django \& React Authentication on JWT](#django--react-authentication-on-jwt)

# Installation

```bash
# <!-- First -->
- npm init react-app frontend

# <!-- Second -->
- pip install django
- pip install djangorestframework
- pip install django-cors-headers

# <!-- Third -->
- django-admin startproject backend
- cd backend
- python manage.py startapp ...
```

```python
INSTALLED_APPS = [
    # ...
    # 👇 Add here your installed app's
    'rest_framework',
    'corsheaders',
]

MIDDLEWARE = [
    # ...
    # 👇 Add this line here
    'corsheaders.middleware.CorsMiddleware',
    # Add above line just before this line 👇
    'django.middleware.common.CommonMiddleware',
]

# 👇 Add this line here
CORS_ORIGIN_ALLOW_ALL = True


What is Handling Cross-Origin Resource Sharing (CORS)?

When we try to make an HTTP request from a different origin 
(e.g., from the React app to the Django API), we may run into a 
CORS error. To fix this, we need to add the Django Cors Headers 
package to our Django project. This package will add the necessary 
headers to allow cross-origin requests.
```

### Create HOC (higher order component) for checking if user is authenticated

`AuthCheck.jsx`
```javascript
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../conf/common';

export default function withAuthCheck(Component) {
    return function AuthenticatedComponent(props) {
        const navigate = useNavigate();

        useEffect(() => {
            if (!isLoggedIn()) {
                navigate('/auth');
            }
        }, [navigate]);


        return <Component {...props} />;
    };
}
```
Then we can use it in our components like this:
```javascript
...
import withAuthCheck from './AuthCheck'; 
const AuthenticatedComponent = withAuthCheck(Component);
...
```