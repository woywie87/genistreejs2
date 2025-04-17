// RevisionListComponent.jsx
import React, { useState, useEffect } from 'react';
import { Revision, RevisionBook, revisionFromJson } from './models';

const RevisionListComponent = () => {
  const [revisions, setRevisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Przykład pobierania danych z API
    const fetchRevisions = async () => {
      try {
        setLoading(true);
        // Symulacja zapytania do API
        const response = await fetch('https://api.example.com/revisions');
        const data = await response.json();
        
        // Parsowanie danych przy użyciu naszych modeli
        const parsedRevisions = data.map(item => Revision.fromJson(item));
        setRevisions(parsedRevisions);
      } catch (err) {
        console.error('Błąd podczas pobierania danych:', err);
        setError('Nie udało się pobrać danych. Spróbuj ponownie później.');
      } finally {
        setLoading(false);
      }
    };

    fetchRevisions();
  }, []);

  // Obsługa tworzenia nowej rewizji
  const handleCreateRevision = () => {
    // Przykład tworzenia nowej rewizji
    const newRevision = new Revision({
      createUserId: 'user123', // Wymagane pole
      page: 1,
      place: 'Warszawa',
      familyInfo: 'Rodzina Kowalskich',
      description: 'Opis rewizji',
      year: '1880'
    });
    
    // Przykład konwersji do JSON do wysłania do API
    const jsonData = newRevision.toJson();
    console.log('Dane do wysłania:', jsonData);
    
    // Tu można umieścić kod do wysłania danych do API
  };

  // Przykład tworzenia obiektu RevisionBook
  const handleCreateRevisionBook = () => {
    const newRevisionBook = new RevisionBook({
      description: 'Opis książki rewizyjnej',
      signature: 'SIG-123',
      year: '1880',
      place: 'Warszawa',
      status: 1,
      revCount: 0
    });
    
    console.log('Nowa książka rewizyjna:', newRevisionBook);
    return newRevisionBook;
  };

  // Tworzenie rewizji powiązanej z książką
  const handleCreateRelatedRevision = () => {
    const revisionBook = handleCreateRevisionBook();
    
    const relatedRevision = new Revision({
      createUserId: 'user123',
      revisionBook: revisionBook,
      revisionBookId: revisionBook.revisionBookId || 'temp-id',
      page: 5,
      description: 'Rewizja powiązana z książką'
    });
    
    console.log('Rewizja powiązana z książką:', relatedRevision);
  };

  if (loading) return <div>Ładowanie...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <div>
      <h2>Lista Rewizji</h2>
      <button onClick={handleCreateRevision}>Utwórz nową rewizję</button>
      <button onClick={handleCreateRevisionBook}>Utwórz nową książkę rewizyjną</button>
      <button onClick={handleCreateRelatedRevision}>Utwórz powiązaną rewizję</button>

      {revisions.length === 0 ? (
        <p>Brak rewizji do wyświetlenia</p>
      ) : (
        <ul>
          {revisions.map((revision) => (
            <li key={revision.revisionId}>
              <h3>{revision.place || 'Brak miejsca'} - {revision.year || 'Brak roku'}</h3>
              <p>Strona: {revision.page}</p>
              <p>Opis: {revision.description}</p>
              {revision.revisionBook && (
                <div>
                  <p>Książka: {revision.revisionBook.description}</p>
                  <p>Sygnatura: {revision.revisionBook.signature}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RevisionListComponent;