import React from 'react'

interface Props {
    name : string
}

export function Button({ name }: Props) {
  return <button>{name}</button>;
}

export default Button