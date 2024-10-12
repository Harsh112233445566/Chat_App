import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import ChatPage from './pages/chatpage';
import Avatar from './pages/avatar';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/avatar" element={<Avatar />} />
      </Routes>
    </BrowserRouter>
  );
}