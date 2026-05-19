import React from 'react'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns';
import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={< Dashboard />} />
      <Route path='/campaigns' element={<Campaigns />}/>

    </Routes>
    
    </>
);
}