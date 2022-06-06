import React from 'react';
import './Select.css';

interface Props {
  label?: string;
  categories: any[];
  initialCategory: {
    name: string,
    value: string,
  };
}

export function Select({ categories, initialCategory, label }: Props) {
  return(
    <label className="Select">
      {label && <p>{label}</p>}
      <select className="Select__select">
        <option value={initialCategory.value}>{initialCategory.name}</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
    </label>
  );
}
