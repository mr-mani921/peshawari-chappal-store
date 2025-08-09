import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { ProductsProvider } from './pages/Contexts/Product'

createRoot(document.getElementById('root')).render(
 
    <ProductsProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ProductsProvider>
 
)
