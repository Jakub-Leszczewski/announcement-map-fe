import React from 'react';
import './style.css';

interface Props {
  children?: React.ReactNode;
  categories: any[]; //@TODO change type to type from be
  width?: string;
  height?: string;
  padding?: string;
}

export function Select({ children, categories, width, height, padding }: Props) {
  return(
    <select
      className="Select__select"
      style={{width, height, padding}}
    >
      <option value="*">wszystko</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  );
}
