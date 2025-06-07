import React, { useState } from 'react';
import ParcelList from './components/ParcelList';
import ParcelForm from './components/ParcelForm';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // This function will be called from both the form and the list to trigger a refresh
  const forceRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Parcel Management System</h1>
      </header>
      <main style={{ padding: '20px' }}>
        <ParcelForm onParcelCreated={forceRefresh} />
        <hr style={{ margin: '20px 0' }} />
        <ParcelList refreshKey={refreshKey} onListUpdated={forceRefresh} />
      </main>
    </div>
  );
}

export default App;