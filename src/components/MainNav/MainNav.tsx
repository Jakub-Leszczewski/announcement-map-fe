import React from 'react';
import { SearchBar } from '../common/SearchBar/SearchBar';
import { Button } from '../common/Button/Button';
import { Select } from '../common/Select/Select';
import './MainNav.css';
import { User } from '../User/User'
import { useApiAuth } from '../../hooks/useApiAuth'
import { useDispatch } from 'react-redux'
import { setJwt } from '../../store/slices/user-slice'
import { openAddAnnouncement } from '../../store/slices/app-slice'

export function MainNav() {
  const dispatch = useDispatch();

  const goAddAnnouncement = () => {
    dispatch(openAddAnnouncement(undefined));
  }
  return (
    <nav className="MainNav">
      <div className="MainNav__left-side">
        <SearchBar />
        <Button onClick={goAddAnnouncement}>Dodaj ogłoszenie</Button>
        <Select
          initialCategory={{name: 'wszystko', value: '*'}}
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
