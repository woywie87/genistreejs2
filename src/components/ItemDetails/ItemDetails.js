// src/components/ItemDetails/ItemDetails.js
import React from 'react';
import './ItemDetails.css';
import { X } from 'react-feather';
import AdditionalInfo from './AdditionalInfo';
import ActionButtons from './ActionButtons';

const ItemDetails = ({ item, isVerticalMode, onClose }) => {
  if (!item) {
    return null;
  }

  return (
    <div className="item-details">
      {isVerticalMode && (
        <button className="close-button" onClick={onClose}>
          <X size={20} />
        </button>
      )}
      
      <div className="details-content">
        <span className="item-badge">Element #{item.id}</span>
        <h2>{item.title}</h2>
        <div className="divider"></div>
        <p>{item.body}</p>
        
        <AdditionalInfo userId={item.userId} />
        <ActionButtons />
      </div>
    </div>
  );
};

export default ItemDetails;