import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { store } from '../../store'
import { UserMenu } from '../userMenu/UserMenu'
import { MainNav } from '../mainNav/MainNav'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainNav/>
        <UserMenu/>
      </Provider>
    </div>
  );
}

export default App;
