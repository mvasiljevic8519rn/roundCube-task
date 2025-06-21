import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import MessagePage from './pages/MessagePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root to /welcomepage */}
        <Route path="/" element={<Navigate replace to="/welcomepage" />} />
        
        {/* Define the main welcome page route */}
        <Route path="/welcomepage" element={<WelcomePage />} />
        
        {/* Keep the message page route */}
        <Route path="/message" element={<MessagePage />} />
      </Routes>
    </Router>
  );
}

export default App;