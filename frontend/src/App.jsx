import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationBar from './components/NotificationBar';
import LoadingSplash from './components/LoadingSplash';

// Main Website Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NewsPage from './pages/NewsPage';
import MagazinesPage from './pages/MagazinesPage';
import GalleryPage from './pages/GalleryPage';
import CollegesPage from './pages/CollegesPage';
import ContactPage from './pages/ContactPage';
import BackendTestPage from './pages/BackendTestPage';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loading splash
  if (isLoading) {
    return <LoadingSplash onLoadingComplete={handleLoadingComplete} />;
  }

  // Show main app after loading
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <NotificationBar />
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Main Website Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/magazines" element={<MagazinesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/colleges" element={<CollegesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/backend-test" element={<BackendTestPage />} />

              {/* Redirect all other routes to homepage */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
