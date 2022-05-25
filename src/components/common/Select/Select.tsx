import React from 'react';
import './Select.css';

interface Props {
  categories: any[]; //@TODO change type to type from be
  width?: string;
  height?: string;
  padding?: string;
}

export function Select({ categories, width, height, padding }: Props) {
  return(
    <select
      className="Select"
      style={{width, height, padding}}
    >
      <option value="*">wszystko</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  );
}
