import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProductProvider } from './context/prodcontxt.jsx'
import { AuthProvider } from './context/authcontext.jsx'
import { CartProvider } from './context/cartcontext.jsx'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    <App />

    </CartProvider>
    </AuthProvider>
    </ProductProvider>
    </BrowserRouter>
  </StrictMode>,
)
