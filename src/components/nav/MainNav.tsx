import React from 'react';
import { SearchBar } from '../common/searchBar/SearchBar'
import { Button } from '../common/button/Button'
import { Select } from '../common/select/Select'

export function MainNav() {
  return(
    <nav>
      <div className="MainNav__left-side">
        <SearchBar/>
        <Button>Dodaj ogłoszenie</Button>
        <Select categories={[
          {id: '1', name: 'Motoryzacja'},
          {id: '2', name: 'Elektronika'},
          {id: '3', name: 'Ogród'},
          {id: '4', name: 'Zabawki'}
        ]}/>
      </div>

      <div className="MainNav__right-side">

      </div>
    </nav>
  );
}
