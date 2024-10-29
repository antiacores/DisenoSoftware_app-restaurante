import React from 'react'

export const Item = ({name, price, description}) => {
  return (
    <div>
        <h2>{name} - ${price}</h2>
        <h3>{description}</h3>
    </div>
  )
}
