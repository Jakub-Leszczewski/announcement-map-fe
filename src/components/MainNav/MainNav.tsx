import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button } from '../common/Button/Button';
import { SelectCategories } from '../SelectCategories/SelectCategories';
import './MainNav.css';
import { User } from '../User/User'
import { useDispatch } from 'react-redux'
import { openAddAnnouncement } from '../../store/slices/app-slice'

export function MainNav() {
  const dispatch = useDispatch();

  const goAddAnnouncement = () => {
    dispatch(openAddAnnouncement());
  }
  return (
    <nav className="MainNav">
      <div className="MainNav__left-side">
        <SearchBar />
        <Button onClick={goAddAnnouncement}>Dodaj ogłoszenie</Button>
        <SelectCategories firstOption={{ name: 'Wszystko', value: '*' }}/>
      </div>

      <div className="MainNav__right-side">
        <User/>
      </div>
    </nav>
  );
}
