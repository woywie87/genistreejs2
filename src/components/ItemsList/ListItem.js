// src/components/ItemsList/ListItem.js
import React from 'react';

const ListItem = ({ item, isActive, onClick }) => {
  return (
    <li 
      onClick={onClick}
      className={isActive ? 'active' : ''}
    >
      <h2>{item.title}</h2>
      <p>{item.body.substring(0, 60)}...</p>
    </li>
  );
};

export default ListItem;