import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
// import UseDataPengguna from './UseDataPengguna';
import { useEffect, useState } from 'react';
import Header from '../Header.jsx';
import Help from '../../Help.jsx';
import { io } from "socket.io-client";
import axios from 'axios';
export default function () {
  // const { tambah, all } = UseDataPengguna();
  const { login, auth, guest, logout, me, getLink } = Help();
  const socket = io('http://localhost:3000',{
    withCredentials: true,
});
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

return (
    <div>
    <Header />

<div className="container-fluid">
  <div className="row">
  <Navbar aktif="data-chat" />  

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Data Chat</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          </div>
        </div>
      </div>

      <div className="container">
      {data.map((e,i) => (
        <div className="alert alert-success text-dark d-flex justify-content-between" key={i} role="alert">
          <div className="row w-75">
             {e.user.username} sedang berada di room chat
          </div>
          <div className="row w-25">
            <Link to={`/data-chat/${e.room}`} className="btn btn-primary">Masuk room</Link>
          </div>
        </div>
      ))}
      </div>
    </main>
  </div>
</div>
</div>
  )
}