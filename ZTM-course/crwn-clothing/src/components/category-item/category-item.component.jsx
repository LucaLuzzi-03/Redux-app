import React from 'react'
import './category-item.styles.scss'

export const CategoryItem = ({ title, imageUrl}) => {
  return (
    <div className='category-container'>
        <div className='background-image' style={{ backgroundImage: `url(${ imageUrl })` }} />
        <div className='category-body-container'>
        <h2>{ title }</h2>
        <p>Show now</p>
        </div>
    </div>
  )
}
