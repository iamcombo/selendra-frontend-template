import React from 'react'
import ReactDOM from 'react-dom'
import { Toaster } from 'react-hot-toast';

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Toaster />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
