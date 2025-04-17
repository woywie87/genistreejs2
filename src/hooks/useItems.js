// src/hooks/useItems.js
import { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';

/**
 * Hook do pobierania i zarządzania elementami listy
 * @param {number} limit - Limit pobieranych elementów
 * @returns {Object} - Obiekt zawierający dane, stan ładowania i obsługę błędów
 */
export const useItems = (limit = 10) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const getItems = async () => {
      try {
        setLoading(true);
        const data = await fetchItems(limit);
        setItems(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Wystąpił błąd podczas pobierania danych');
      } finally {
        setLoading(false);
      }
    };

    getItems();
  }, [limit]);

  // Funkcja do wybierania elementu
  const selectItem = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  // Funkcja do zamykania szczegółów
  const closeDetails = () => {
    setShowDetails(false);
  };

  return {
    items,
    loading,
    error,
    selectedItem,
    showDetails,
    selectItem,
    closeDetails
  };
};