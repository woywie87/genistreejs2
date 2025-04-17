// src/components/ItemsList/ItemsList.js
import React from 'react';
import './ItemsList.css';
import ListItem from './ListItem';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const ItemsList = ({ 
  items, 
  loading, 
  error, 
  selectedItemId, 
  onSelectItem, 
  hidden 
}) => {
  if (hidden) {
    return null;
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="items-list">
      <ul>
        {items.map(item => (
          <ListItem
            key={item.id}
            item={item}
            isActive={selectedItemId === item.id}
            onClick={() => onSelectItem(item)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;