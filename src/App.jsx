import React from 'react'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns';
import { Route, Routes } from 'react-router-dom';
import Users from './pages/Users';

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={< Dashboard />} />
      <Route path='/campaigns' element={<Campaigns />}/>
      <Route path='/users' element={<Users />}/>
    </Routes>
    
    </>
);
}