import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { store } from '../../store'
import { UserMenu } from '../userMenu/UserMenu'
import { MainNav } from '../mainNav/MainNav'
import { Auth } from '../auth/Auth'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Auth>
          <MainNav/>
          <UserMenu/>
        </Auth>
      </Provider>
    </div>
  );
}

export default App;
