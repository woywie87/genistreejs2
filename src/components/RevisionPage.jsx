import React, { useState, useEffect } from 'react';
import { Client, Databases, Query } from 'appwrite';
//import { queries } from '@testing-library/dom';

const RevisionPagePreview = () => {
  const [revisions, setRevisions] = useState([]);
  const [selectedRevision, setSelectedRevision] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' lub 'table'

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchItems = async (limit = 100) => {
    const client = new Client()
      .setEndpoint('https://api.genistree.pl/v1')
      .setProject('658eea2dc1cfb6218009');

    const databases = new Databases(client);
    
    try {
      const response = await databases.listDocuments(
        '63fcc803d9ebf1fb309f',
        '6475ababc75380030118',
        [Query.limit(100)]
        
      );
      
      return response.documents;
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchItems();
        setRevisions(data);
      } catch (error) {
        console.error('Nie udało się pobrać rewizji:', error);
        setError('Wystąpił błąd podczas pobierania danych. Proszę odświeżyć stronę lub spróbować później.');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleSelectRevision = (revision) => {
    setSelectedRevision(revision);
    if (isMobile) {
      setIsDetailOpen(true);
    }
  };

  const handleCloseDetails = () => {
    setIsDetailOpen(false);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'table' : 'list');
  };

  // Funkcja pomocnicza do bezpiecznego odczytywania właściwości
  const getProperty = (obj, path, defaultValue = 'Brak danych') => {
    if (!obj) return defaultValue;
    
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
      if (current[key] === undefined || current[key] === null) {
        return defaultValue;
      }
      current = current[key];
    }
    
    return current;
  };

  // Sprawdza czy obiekt ma współrzędne geograficzne
  const hasLocation = (revision) => {
    const lat = getProperty(revision, 'GeoLat', null);
    const lon = getProperty(revision, 'GeoLon', null);
    
    return lat !== null && lon !== null && lat !== 'Brak danych' && lon !== 'Brak danych';
  };
  
  // Style dla strony
  const styles = {
    container: {
      fontFamily: 'Segoe UI, Roboto, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
      backgroundColor: '#f5f8fa'
    },
    header: {
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '1px solid #e1e8ed',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: {
      fontSize: '24px',
      color: '#2c3e50',
      margin: 0
    },
    toggleButton: {
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      display: isMobile ? 'none' : 'block'
    },
    content: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '20px',
    },
    list: {
      flex: isMobile ? '1' : '0 0 35%',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      display: (isMobile && isDetailOpen) || (!isMobile && viewMode === 'table') ? 'none' : 'block'
    },
    listTitle: {
      fontSize: '18px',
      marginBottom: '20px',
      color: '#2c3e50',
      borderBottom: '2px solid #3498db',
      paddingBottom: '10px'
    },
    listItem: (isSelected) => ({
      backgroundColor: isSelected ? '#e8f4fd' : 'white',
      borderLeft: isSelected ? '4px solid #3498db' : '1px solid #e1e8ed',
      border: '1px solid #e1e8ed',
      borderRadius: '6px',
      padding: '15px',
      marginBottom: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }),
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '6px'
    },
    itemPlace: {
      fontWeight: 'bold',
      color: '#2c3e50'
    },
    itemFamily: {
      fontWeight: '500',
      marginBottom: '5px'
    },
    markerIcon: {
      color: '#e74c3c',
      marginLeft: '5px',
      fontSize: '16px'
    },
    details: {
      flex: '1',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      position: isMobile ? 'fixed' : 'relative',
      top: isMobile ? 0 : 'auto',
      left: isMobile ? 0 : 'auto',
      right: isMobile ? 0 : 'auto',
      bottom: isMobile ? 0 : 'auto',
      zIndex: isMobile ? 100 : 'auto',
      transform: isMobile ? (isDetailOpen ? 'translateY(0)' : 'translateY(100%)') : 'none',
      transition: 'transform 0.3s ease',
      overflowY: 'auto',
      height: isMobile ? '100vh' : 'auto',
      display: !isMobile && viewMode === 'table' ? 'none' : 'block'
    },
    backButton: {
      background: 'none',
      border: 'none',
      color: '#3498db',
      fontSize: '16px',
      padding: '8px 0',
      marginBottom: '20px',
      cursor: 'pointer',
      textAlign: 'left',
      display: isMobile ? 'block' : 'none'
    },
    detailsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      paddingBottom: '15px',
      borderBottom: '1px solid #e1e8ed'
    },
    detailsTitle: {
      fontSize: '20px',
      margin: 0
    },
    detailsId: {
      color: '#999',
      fontSize: '14px'
    },
    sectionGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px'
    },
    section: {
      backgroundColor: '#f5f8fa',
      padding: '15px',
      borderRadius: '6px',
      marginBottom: '15px'
    },
    sectionTitle: {
      fontSize: '16px',
      marginBottom: '15px',
      paddingBottom: '8px',
      borderBottom: '1px solid #e1e8ed',
      color: '#2c3e50'
    },
    field: {
      marginBottom: '12px'
    },
    fieldLabel: {
      display: 'block',
      fontWeight: '500',
      color: '#2c3e50',
      marginBottom: '4px',
      fontSize: '14px'
    },
    fieldValue: {
      padding: '8px 0'
    },
    noSelection: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      color: '#999',
      fontStyle: 'italic',
      minHeight: '300px'
    },
    error: {
      color: '#e74c3c',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#fadbd8',
      borderRadius: '6px',
      margin: '20px 0'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: 'white',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      display: !isMobile && viewMode === 'table' ? 'table' : 'none'
    },
    th: {
      backgroundColor: '#f5f8fa',
      color: '#2c3e50',
      padding: '12px 15px',
      textAlign: 'left',
      fontWeight: '600',
      borderBottom: '2px solid #3498db'
    },
    td: {
      padding: '12px 15px',
      borderBottom: '1px solid #e1e8ed'
    },
    tr: {
      cursor: 'pointer'
    },
    trHover: {
      backgroundColor: '#f9f9f9'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Rewizje</h1>
        {!isMobile && (
          <button style={styles.toggleButton} onClick={toggleViewMode}>
            {viewMode === 'list' ? 'Pokaż jako tabelę' : 'Pokaż jako listę'}
          </button>
        )}
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.content}>
        {/* Lista rewizji */}
        <div style={styles.list}>
          <h2 style={styles.listTitle}>Lista Rewizji</h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Ładowanie danych...</div>
          ) : revisions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>Brak dostępnych rewizji</div>
          ) : (
            revisions.map(revision => (
              <div 
                key={revision.$id}
                style={styles.listItem(selectedRevision?.$id === revision.$id)}
                onClick={() => handleSelectRevision(revision)}
              >
                <div style={styles.itemHeader}>
                  <span style={styles.itemPlace}>
                    {getProperty(revision, 'Place', 'Nieznane miejsce')}
                    {hasLocation(revision) && (
                      <span style={styles.markerIcon}>📍</span>
                    )}
                  </span>
                </div>
                <div style={styles.itemFamily}>
                  <strong>Osoby: </strong>
                  {getProperty(revision, 'FamilyInfo', '')}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Tabela rewizji - wyświetlana tylko w trybie poziomym po kliknięciu przycisku */}
        {!isMobile && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Miejsce</th>
                <th style={styles.th}>Rodzina</th>
                <th style={styles.th}>Rok</th>
                <th style={styles.th}>Opis</th>
                <th style={styles.th}>Lokalizacja</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Ładowanie danych...</td>
                </tr>
              ) : revisions.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Brak dostępnych rewizji</td>
                </tr>
              ) : (
                revisions.map(revision => (
                  <tr
                    key={revision.$id}
                    style={styles.tr}
                    onClick={() => {
                      handleSelectRevision(revision);
                      setViewMode('list');
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td style={styles.td}>{getProperty(revision, 'Place', 'Nieznane miejsce')}</td>
                    <td style={styles.td}>{getProperty(revision, 'FamilyInfo', 'Brak informacji')}</td>
                    <td style={styles.td}>{getProperty(revision, 'Year', 'Brak roku')}</td>
                    <td style={styles.td}>{getProperty(revision, 'Description', 'Brak opisu')}</td>
                    <td style={styles.td}>
                      {hasLocation(revision) ? '📍 Dostępna' : 'Brak lokalizacji'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Szczegóły rewizji */}
        <div style={styles.details}>
          {isMobile && (
            <button style={styles.backButton} onClick={handleCloseDetails}>
              &larr; Powrót do listy
            </button>
          )}
          
          {!selectedRevision ? (
            <div style={styles.noSelection}>
              <p>Wybierz rewizję z listy, aby zobaczyć szczegóły</p>
            </div>
          ) : (
            <>
              <div style={styles.detailsHeader}>
                <h2 style={styles.detailsTitle}>
                  {getProperty(selectedRevision, 'Place', 'Nieznane miejsce')}
                  {hasLocation(selectedRevision) && (
                    <span style={styles.markerIcon}>📍</span>
                  )}
                </h2>
                <span style={styles.detailsId}>ID: {selectedRevision.$id}</span>
              </div>
              
              <div style={styles.sectionGrid}>
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Informacje podstawowe</h3>
                  
                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Miejsce:</label>
                    <div style={styles.fieldValue}>
                      {getProperty(selectedRevision, 'Place', 'Brak danych')}
                    </div>
                  </div>
                  
                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Rok:</label>
                    <div style={styles.fieldValue}>
                      {getProperty(selectedRevision, 'Year', 'Brak danych')}
                    </div>
                  </div>
                  
                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Rodzina:</label>
                    <div style={styles.fieldValue}>
                      {getProperty(selectedRevision, 'FamilyInfo', 'Brak danych')}
                    </div>
                  </div>
                </div>
                
                <div style={styles.section}>
                  <h3 style={styles.sectionTitle}>Szczegóły</h3>
                  
                  <div style={styles.field}>
                    <label style={styles.fieldLabel}>Opis:</label>
                    <div style={styles.fieldValue}>
                      {getProperty(selectedRevision, 'Description', 'Brak danych')}
                    </div>
                  </div>
                </div>
                
                {hasLocation(selectedRevision) && (
                  <div style={styles.section}>
                    <h3 style={styles.sectionTitle}>Lokalizacja</h3>
                    
                    <div style={styles.field}>
                      <label style={styles.fieldLabel}>Szerokość geograficzna:</label>
                      <div style={styles.fieldValue}>
                        {getProperty(selectedRevision, 'GeoLat', 'Brak danych')}
                      </div>
                    </div>
                    
                    <div style={styles.field}>
                      <label style={styles.fieldLabel}>Długość geograficzna:</label>
                      <div style={styles.fieldValue}>
                        {getProperty(selectedRevision, 'GeoLon', 'Brak danych')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevisionPagePreview;