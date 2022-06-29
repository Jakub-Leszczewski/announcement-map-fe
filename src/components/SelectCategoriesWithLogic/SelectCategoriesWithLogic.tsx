import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StoreType } from '../../store'
import { changeCategoryId } from '../../store/slices/app-slice'
import { SelectCategories } from '../SelectCategories/SelectCategories'

export function SelectCategoriesWithLogic() {
  const appStore = useSelector((store:StoreType) => store.app);
  const dispatch = useDispatch();
  const [category, setCategory] = useState<string>(appStore.search);

  useEffect(() => {
    dispatch(changeCategoryId(category));
  }, [category])

  const onChangeInput = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  }

  return(
    <SelectCategories
      firstOption={{ name: 'Wszystko', value: '' }}
      onChange={onChangeInput}
    />
  );
}
