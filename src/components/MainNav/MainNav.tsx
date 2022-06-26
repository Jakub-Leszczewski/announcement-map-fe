import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button } from '../common/Button/Button';
import { SelectCategories } from '../SelectCategories/SelectCategories';
import './MainNav.css';
import { User } from '../User/User'
import { useDispatch } from 'react-redux'
import { openWindow, Window } from '../../store/slices/app-slice'
import { useApi } from '../../hooks/useApi'
import { CategoryEntity } from 'types';

export function MainNav() {
  const [loading, status, categories] = useApi<CategoryEntity[]>('http://localhost:3001/api/category');
  const dispatch = useDispatch();

  const goAddAnnouncement = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_ADD_ANNOUNCEMENT,
      data: undefined,
    }));
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
