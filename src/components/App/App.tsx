import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import { store } from '../../store'
import { UserMenu } from '../UserMenu/UserMenu'
import { MainNav } from '../MainNav/MainNav'
import { Auth } from '../Auth/Auth'
// import { Map } from '../Map/Map'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Auth>
          {/*<Map/>*/}
          <MainNav/>
          <UserMenu/>
        </Auth>
      </Provider>
    </div>
  );
}

export default App;
