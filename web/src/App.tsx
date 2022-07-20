import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import { useContext } from './hooks';
import Settings from './pages/Settings';

export default function App() {
  const ctx = useContext();

  useEffect(() => {
    window.Kustomer.initialize({ }, (context: any) => {
      ctx.setValue(context);

      if (ctx) {
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
