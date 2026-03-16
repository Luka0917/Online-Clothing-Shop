import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';

import App from './App.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import AuthPage from './pages/authPage.jsx';
import About from './pages/About.jsx';
import Cart from './pages/Cart.jsx';
import Profile from './pages/Profile.jsx';

const router = createBrowserRouter([
  { path: '/', Component: App },
  { path: '/shop', Component: Shop},
  { path: '/product/:id', Component: ProductDetails },
  { path: '/auth', Component: AuthPage },
  { path: '/about', Component: About },
  { path: '/cart', Component: Cart },
  { path: '/profile', Component: Profile }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)