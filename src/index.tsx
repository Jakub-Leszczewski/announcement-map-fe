import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your App, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//@TODO zmienić style dla UserMenu, przy większych tekstach userMenu się powiększa w niekontrolowany sposób
//@TODO max-width - vw, wycentrować przyciski w środku(margin auto)
//@TODO zmienić jwt na prostszy, dane użytkownika są pobierane przez api w komponencie auth, a nie pozyskiwane z tokenu
//@TODO naprawić ekran, usunąć scroll problem przy userAvatar
