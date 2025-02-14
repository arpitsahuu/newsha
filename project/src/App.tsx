import React from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MerchantsPage from './pages/MerchantsPage';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="flex-1 overflow-auto">
          <MerchantsPage />
        </div>
      </div>
    </div>
  );
}

export default App;