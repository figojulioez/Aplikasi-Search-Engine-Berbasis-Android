import {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Pencarian from './pages/Pencarian/Index.jsx';
import DataPengguna from './pages/DataPengguna/Index.jsx';
import EditPencarian from './pages/Pencarian/EditPencarian.jsx';
import HapusPencarian from './pages/Pencarian/HapusPencarian.jsx';
import EditDataPengguna from './pages/DataPengguna/EditDataPengguna.jsx';
import HapusDataPengguna from './pages/DataPengguna/HapusDataPengguna.jsx';
import Login from './pages/Login/Login.jsx';
import Logout from './pages/Login/Logout.jsx';
import DataChat from './pages/DataChat/Index.jsx';
import RoomChat from './pages/DataChat/RoomChat.jsx';
import GroupChat from './pages/DataChat/GroupChat.jsx';
import WithAuth from './WithAuth.jsx';
import WithGuest from './WithGuest.jsx';


function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WithGuest><Login /></WithGuest>} />
        <Route exact path="/logout" element={<WithAuth><Logout /></WithAuth>} />

        <Route exact path="/dashboard" element={<WithAuth><Dashboard /></WithAuth>} />
        
        <Route exact path="/pencarian" element={<WithAuth><Pencarian /></WithAuth>} />
        <Route exact path="/pencarian/:id" element={<WithAuth><EditPencarian /></WithAuth>} />
        <Route exact path="/pencarian/hapus/:id" element={<WithAuth><HapusPencarian /></WithAuth>} />

        <Route exact path="/Data-pengguna" element={<WithAuth><DataPengguna /></WithAuth>} />
        <Route exact path="/Data-pengguna/:id" element={<WithAuth><EditDataPengguna /></WithAuth>} />
        <Route exact path="/Data-pengguna/hapus/:id" element={<WithAuth><HapusDataPengguna /></WithAuth>} />

        <Route exact path="/data-chat" element={<WithAuth><DataChat /></WithAuth>} />
        <Route exact path="/data-chat/:id" element={<WithAuth><RoomChat /></WithAuth>} />
        <Route exact path="/grup-chat" element={<WithAuth><GroupChat /></WithAuth>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App;
