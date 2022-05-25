import React from 'react';
import { SearchBar } from '../common/SearchBar/SearchBar';
import { Button } from '../common/Button/Button';
import { Select } from '../common/Select/Select';
import './MainNav.css';
import { User } from '../User/User'

export function MainNav() {
  return (
    <nav className="MainNav">
      <div className="MainNav__left-side">
        <SearchBar />
        <Button height={'auto'} width="100%" padding="5px">Dodaj ogłoszenie</Button>
        <Select
          height="100%"
          padding="5px"
          categories={[
            { id: '1', name: 'Motoryzacja' },
            { id: '2', name: 'Elektronika' },
            { id: '3', name: 'Ogród' },
            { id: '4', name: 'Zabawki' },
          ]}
        />
      </div>

      <div className="MainNav__right-side">
        <User/>
      </div>
    </nav>
  );
}
