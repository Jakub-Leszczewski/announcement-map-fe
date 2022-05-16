import React from 'react';

interface Props {
  children?: React.ReactNode,
  width?: string,
  height?: string,
  padding?: string,
}

export function Button(props: Props) {
  return(
    <button>
      {props.children ?? "click me"}
    </button>
  );
}
