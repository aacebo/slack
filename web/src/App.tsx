import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='views/settings' element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}
