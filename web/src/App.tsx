import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Settings from './pages/Settings';

export default function App() {
  useEffect(() => {
    window.Kustomer.initialize({ }, (contextJSON: any) => {
      if (contextJSON) {
        window.Kustomer.resize();
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='views/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
