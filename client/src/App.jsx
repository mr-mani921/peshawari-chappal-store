  import React from 'react';
  import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
  // import { ToastContainer } from 'react-toastify';

  // Import components
  // import Header from './components/Header';
  // import Footer from './components/Footer';
  // import CartDrawer from './components/CartDrawer';

  // Import pages
  import './utils/auth.js'
  import Home from './pages/Home';
  import About from './pages/About';
  import PeshawariChappal from './pages/PeshawariChappal';
  import CharsaddaChappal from './pages/CharsaddaChappal';
  import QuettaChappal from './pages/QuettaChappal';
  import NoroziChappal from './pages/NoroziChappal.jsx';
  import KaptaanChappal from './pages/KaptaanChappal';
  import ZalmiChappal from './pages/ZalmiChappal';
  import SignatureCollection from './pages/SignatureCollection';
  import Sale from './pages/Sale';
  import Contact from './pages/Contact';
  import CheckoutPage from './pages/CheckoutPage';
  import Products from './pages/Product';
  import ProductInfo from './pages/ProductInfo';
  import Wishlist from './pages/Wishlist';
   import TermsOfService from './pages/TermsofService';
  import Services from './pages/Services';
  // Import Admin Components
  import Dashboard from './AdminComponents/Dashboard';
  import Inventory from './AdminComponents/Inventory';
  import Orders from './AdminComponents/Orders';
  import Analytics from './AdminComponents/Analytics';
  import Users from './AdminComponents/Users';

  // Import Layout (you'll need to create this)
  import MainLayout from './OutLet/dashbord';
  import AdminLayout from './OutLet/admin';

  import './App.css';
import LoginPages from './pages/auth/login';
 import Register from './pages/auth/Register';
import AddProduct from './AdminComponents/ProductAdd';
import { ToastContainer } from 'react-toastify';

  const router = createBrowserRouter([
    // Main Website Routes with Layout
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'peshawari-chappal', element: <PeshawariChappal /> },
        { path: 'charsadda-chappal', element: <CharsaddaChappal /> },
        { path: 'quetta-chappal', element: <QuettaChappal /> },
        { path: 'norozi-chappal', element: <NoroziChappal /> },
        { path: 'kaptaan-chappal', element: <KaptaanChappal /> },
        { path: 'zalmi-chappal', element: <ZalmiChappal /> },
        { path: 'signature-collection', element: <SignatureCollection /> },
        { path: 'sale', element: <Sale /> },
        { path: 'contact', element: <Contact /> },
        { path: 'CheckoutPage', element: <CheckoutPage /> },
        { path: 'products', element: <Products /> },
        { path: 'productInfo', element: <ProductInfo /> },
        { path: 'wishlist', element: <Wishlist /> },
        { path: 'services', element: <Services /> },
        { path: 'termsOfService', element: <TermsOfService /> },

        
      ],
    },

    // Login Route (without layout)
    {
      path: '/login',
      element: <LoginPages />,
    },
    {
      path: '/register',
      element: <Register />,
    },

    // Admin Routes with Admin Layout
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { path: '', element: <Navigate to="dashboard" replace /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'productadd', element: <AddProduct /> },
        { path: 'inventory', element: <Inventory /> },
        { path: 'orders', element: <Orders /> },
        { path: 'users', element: <Users /> },
        { path: 'analytics', element: <Analytics /> },
      ],
    },

     {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  export default function App() {
    return <>
    <RouterProvider router={router} /> 
    <ToastContainer position="top-right" autoClose={3000} />
</>
  }