import React from 'react';
import { SearchBar } from '../common/searchBar/SearchBar';
import { Button } from '../common/button/Button';
import { Select } from '../common/select/Select';
import './style.css';
import { UserAvatar } from '../userAvatar/UserAvatar'

export function MainNav() {
  return (
    <nav className="MainNav__nav">
      <div className="MainNav__left-side">
        <SearchBar />
        <Button height="100%" width="100%" padding="5px">Dodaj ogłoszenie</Button>
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
        <UserAvatar/>
      </div>
    </nav>
  );
}
