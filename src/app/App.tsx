import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Relevo from './pages/Relevo';
import Noonchi from './pages/Noonchi';
import AllyCloud from './pages/AllyCloud';
import StallGuardian from './pages/StallGuardian';
import TissueRay from './pages/TissueRay';
import Tukanos from './pages/Tukanos';
import TeethScanning from './pages/TeethScanning';
import Dino from './pages/Dino';
import AromaAtlas from './pages/AromaAtlas';
import Microvoxels from './pages/Microvoxels';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/relevo" element={<Relevo />} />
          <Route path="/noonchi" element={<Noonchi />} />
          <Route path="/allycloud" element={<AllyCloud />} />
          <Route path="/stallguardian" element={<StallGuardian />} />
          <Route path="/tissueray" element={<TissueRay />} />
          <Route path="/tukanos" element={<Tukanos />} />
          <Route path="/teeth-scanning" element={<TeethScanning />} />
          <Route path="/dino" element={<Dino />} />
          <Route path="/aroma-atlas" element={<AromaAtlas />} />
          <Route path="/microvoxels" element={<Microvoxels />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}