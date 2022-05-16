import React from 'react'

interface Props {
  children?: React.ReactNode,
  categories: any[] //@TODO change type to type from be
  width?: string,
  height?: string,
  padding?: string,
}

export function Select(props: Props) {
  return(
    <select>
      <option value="*">wszystko</option>
      {props.categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </select>
  );
}
