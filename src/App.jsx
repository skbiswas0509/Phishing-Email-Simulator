import React from 'react'
import Dashboard from './pages/Dashboard'
import Campaigns from './pages/Campaigns';
import { Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Landing from './pages/Landing';
import Awareness from './pages/Awareness';

export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={< Dashboard />} />
      <Route path='/campaigns' element={<Campaigns />}/>
      <Route path='/users' element={<Users />}/>
      <Route path='/landing/:token' element={<Landing />} />
      <Route path='/awareness' element={<Awareness />} />
    </Routes>
    
    </>
);
}