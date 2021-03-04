import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router} from 'react-router-dom'


const app = (
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'));

reportWebVitals();
