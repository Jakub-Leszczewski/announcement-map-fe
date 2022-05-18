import React from 'react';
import './App.css';
import { MainNav } from '../nav/MainNav'
import { Provider } from 'react-redux'
import { store } from '../../store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainNav/>
      </Provider>
    </div>
  );
}

export default App;
