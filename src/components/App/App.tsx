import React, { useEffect } from 'react'
import './App.css';
import { Provider } from 'react-redux'
import { store } from '../../store'
import { UserMenu } from '../UserMenu/UserMenu'
import { MainNav } from '../MainNav/MainNav'
import { Auth } from '../Auth/Auth'
import { Map } from '../Map/Map'

function App() {
  useEffect(() => {
    document.documentElement.lang = 'pl-PL';
    document.title = 'Mapa ogłoszeń'
  }, [])

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <Provider store={store}>
        <Auth>
          <Map/>
          <MainNav/>
          <UserMenu/>
        </Auth>
      </Provider>
    </div>
  );
}

export default App;
