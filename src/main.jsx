import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>  
  </React.StrictMode>
)
