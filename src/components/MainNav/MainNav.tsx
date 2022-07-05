import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { Button } from '../common/Button/Button';
import './MainNav.css';
import { User } from '../User/User'
import { useDispatch } from 'react-redux'
import { openAddAnnouncement, openSignInChoice } from '../../store/slices/app-slice'
import { SelectCategoriesWithLogic } from '../SelectCategoriesWithLogic/SelectCategoriesWithLogic'
import { useIsAuth } from '../../hooks/useIsAuth'

export function MainNav() {
  const isAuth = useIsAuth();
  const dispatch = useDispatch();

  const goAddAnnouncement = () => {
    if(isAuth) dispatch(openAddAnnouncement());
    else dispatch(openSignInChoice());
  }
  return (
    <nav className="MainNav">
      <div className="MainNav__left-side">
        <SearchBar/>
        <Button onClick={goAddAnnouncement}>Dodaj ogłoszenie</Button>
        <SelectCategoriesWithLogic/>
      </div>

      <div className="MainNav__right-side">
        <User/>
      </div>
    </nav>
  );
}
