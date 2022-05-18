import React from 'react';
import './App.css';
import { MainNav } from '../mainNav/MainNav'
import { UserMenu } from '../userMenu/UserMenu'

function App() {
  return (
    <div className="App">
      <MainNav/>
      <UserMenu/>
    </div>
  );
}

export default App;
