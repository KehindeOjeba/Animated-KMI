import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CheckoutPage } from './components/CheckoutPage.tsx'
import { CheckoutSuccess } from './components/CheckoutSuccess.tsx'
import { CheckoutCancel } from './components/CheckoutCancel.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/cart" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
