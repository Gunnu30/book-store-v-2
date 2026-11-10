# My Project Notes

    
# Performance: Initial Load Issue (/login)

- **The Problem:** Static imports load code for *every* page at once in `App.jsx`, causing unnecessary network load on initial load.
  - *Example:*
  ```javascript
  import Home from './pages/Home';
  import Cart from './pages/Cart';
  import CheckOut from './pages/CheckOut';
```

- **The Solution:** We only need the login page rendered on /login, so we use React.lazy() to load pages on demand instead of all at once.

```javascript 
import { lazy } from 'react';
const Cart = lazy(() => import('./pages/Cart'));
```