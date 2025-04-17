// src/components/ItemDetails/AdditionalInfo.js
import React from 'react';

const AdditionalInfo = ({ userId }) => {
  return (
    <div className="additional-info">
      <h3>Dodatkowe informacje</h3>
      <ul>
        <li><span>Autor:</span> Użytkownik {userId}</li>
        <li><span>Kategoria:</span> Przykładowa</li>
        <li><span>Data publikacji:</span> 14.04.2025</li>
      </ul>
    </div>
  );
};

export default AdditionalInfo;