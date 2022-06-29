import React, { ChangeEvent } from 'react'
import './SelectCategories.css';
import { useApi } from '../../hooks/useApi'
import { CategoryEntity } from 'types';

interface Props {
  required?: boolean;
  label?: string;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  firstOption?: {
    name: string,
    value: string,
  }
}

export function SelectCategories({ label, firstOption, required, name, onChange }: Props) {
  const [loading, status, categories] = useApi<CategoryEntity[]>('http://localhost:3001/api/category');

  return(
    <label className="SelectCategories">
      {label && <span>{label}{required && <span className="SelectCategories--required">*</span>}</span>}
      <select
        className="SelectCategories__select"
        name={name}
        onChange={onChange}
        required={required}
      >
        {firstOption && <option value={firstOption.value}>{firstOption.name}</option>}
        {
          !loading && status===200 && categories
            ? (categories as CategoryEntity[])?.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))
            : null
        }
      </select>
    </label>
  );
}
