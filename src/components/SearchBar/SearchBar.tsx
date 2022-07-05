import React, { ChangeEvent, useState } from 'react'
import './SearchBar.css';
import { SearchButton } from '../common/SearchButton/SearchButton'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { changeSearch } from '../../store/slices/app-slice'

export function SearchBar() {
  const appStore = useSelector((store:StoreType) => store.app);

  const [search, setSearch] = useState<string>(appStore.search);
  const dispatch = useDispatch();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const onSubmitSearch = () => {
    dispatch(changeSearch(search));
  }

  return(
    <div className="SearchBar">
      <input
        type="text"
        placeholder="szukaj"
        value={search}
        onChange={onChangeInput}
      />
      <SearchButton
        onClick={onSubmitSearch}
      />
    </div>
  );
}
