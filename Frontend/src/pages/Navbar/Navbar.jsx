import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header.jsx';
import Help from '../../Help.jsx';
import { io } from "socket.io-client";
import axios from 'axios';

export default function Navbar ({aktif}) {
  const socket = io('http://localhost:3000', {
    withCredentials: true,
});
  const { login, auth, guest, logout, me, getLink } = Help();
  const [data, setData] = useState([]);

  async function allRoom () {
      try {
        const endpoint = getLink();
        const token = localStorage.getItem("token");
        const options = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        };
        const all = await axios.post(`${endpoint}/response-chat/allRoom`, {}, options);
        console.log(all.data.data);
        setData(all.data.data);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect( () => {
    
  
    socket.on("connect", function (data) {
    })


    socket.on('restart-room', function (data) {
      allRoom();
    });


    return () => {
      socket.off("connect");
      socket.off("restart-room");
    }
  }, [socket]);


  useEffect(() => {
    allRoom();
  }, [])


const P = () => {
  if (data.length > 0) 
    return <span className="badge bg-danger">{data.length}</span>
}

	return (
		<div>

	<nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-0">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className={`nav-link ${(aktif == 'dashboard')? "active":""}`} aria-current="page" to="/dashboard" style={{fontFamily: 'cursive', fontWeight: '500'}}>
              <span data-feather="home"></span>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${(aktif == 'pencarian')? "active":""}`} to="/pencarian" style={{fontFamily: 'cursive', fontWeight: '500'}}>
              <span data-feather="file"></span>
              Data Pencarian
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${(aktif == 'data-pengguna')? "active":""}`} to="/data-pengguna" style={{fontFamily: 'cursive', fontWeight: '500'}}>
              <span data-feather="shopping-cart"></span>
              Data Pengguna
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${(aktif == 'data-chat')? "active":""}`} to="/data-chat" style={{fontFamily: 'cursive', fontWeight: '500'}}>
              <span data-feather="users"></span>
              Data Chat  <P/>
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${(aktif == 'grup-chat')? "active":""}`} to="/grup-chat" style={{fontFamily: 'cursive', fontWeight: '500'}}>
              <span data-feather="users"></span>
              Grup Chat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </div>
	)
}