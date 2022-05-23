import React from 'react';
import './style.css'

interface Props {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  borderRadius?: number | string;
  onClick?: () => void;
}

export function Button({children, width = '100%', height = '34px', padding = '5px', borderRadius = '10px', onClick}: Props) {
  return(
    <button
      className="Button"
      onClick={onClick}
      style={{
        width: (typeof width === 'number') ? `${width}px` : width,
        height: (typeof height === 'number') ? `${height}px` : height,
        padding: (typeof padding === 'number') ? `${padding}px` : padding,
        borderRadius: (typeof borderRadius === 'number') ? `${borderRadius}px` : borderRadius
      }}
    >
      {children ?? "click me"}
    </button>
  );
}
