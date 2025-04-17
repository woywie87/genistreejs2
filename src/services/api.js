// src/services/api.js

import { Client, Account, ID } from "appwrite";


/**
 * Funkcja do pobierania elementów z API
 * @param {number} limit - Limit pobieranych elementów
 * @returns {Promise<Array>} - Tablica z danymi
 */
export const fetchItems_old = async (limit = 10) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Błąd API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      throw error;
    }
  };




  export const fetchItems = async (limit = 10) => {

    const client = new Client()
    .setEndpoint('https://api.genistree.pl/v1') // Your API Endpoint
    .setProject('658eea2dc1cfb6218009'); // Your project ID

    const databases = new Databases(client);


    
    try {
      const response = await databases.listDocuments(
        '63fcc803d9ebf1fb309f', // databaseId
        '6475ababc75380030118', // collectionId
        [] // queries (optional)
    )
      
      if (!response.ok) {
        throw new Error(`Błąd API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      throw error;
    }
  };








  
  /**
   * Funkcja do pobierania szczegółów elementu z API
   * @param {number} id - ID elementu
   * @returns {Promise<Object>} - Dane szczegółowe elementu
   */
  export const fetchItemDetails = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      
      if (!response.ok) {
        throw new Error(`Błąd API: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Błąd podczas pobierania szczegółów:', error);
      throw error;
    }
  };