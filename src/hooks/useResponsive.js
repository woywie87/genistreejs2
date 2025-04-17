// src/hooks/useResponsive.js
import { useState, useEffect } from 'react';

/**
 * Hook do wykrywania responsywności aplikacji
 * @param {number} breakpoint - Punkt graniczny w pikselach
 * @returns {boolean} - Czy szerokość ekranu jest mniejsza od punktu granicznego
 */
export const useResponsive = (breakpoint = 768) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < breakpoint);
    };

    // Sprawdzenie przy inicjalizacji
    checkScreenSize();

    // Nasłuchiwanie na zmiany rozmiaru okna
    window.addEventListener('resize', checkScreenSize);
    
    // Czyszczenie nasłuchiwania przy odmontowaniu komponentu
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isSmallScreen;
};