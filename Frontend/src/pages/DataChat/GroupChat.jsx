import {Link, useParams} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
// import UseDataPengguna from './UseDataPengguna';
import { useEffect, useState } from 'react';
import Header from '../Header.jsx';
import Help from '../../Help.jsx';
import { io } from "socket.io-client";

export default function () {
  // const { tambah, all } = UseDataPengguna();
  const { login, auth, guest, logout, me } = Help();
  const [text, setText] = useState('');
  const socket = io('http://localhost:3000', {
    withCredentials: true,
  });
  const [allChat, setAllChat] = useState([]);

  useEffect( () => {
    socket.on("chat-group", function (data) {
      setAllChat(prev => [...prev, data]);
    })

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("chat-group");
    }
  }, [socket]);

  const kirimChat = (e) => {
    e.preventDefault();

    const pesan = {
      'text' : text,
      'role' : 'admin',
    };

    setAllChat(prev => [...prev, pesan]);
    socket.emit("chat-group", pesan);
  }

return (
    <div>
    <Header />

<div className="container-fluid">
  <div className="row">
  <Navbar aktif="grup-chat" />  

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 position-relative">
      <div className=" d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Grup Chat</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          </div>
        </div>
      </div>

      <div className="col">
        
        { allChat.map((e,i) => (
          <div  key={i}>
        <div className={`toast fade ${(e.role == 'admin')? 'float-end':''} show mt-3`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className={`toast-header ${(e.role == 'admin')? 'bg-primary': 'bg-secondary' } text-dark`}>
            <strong className="me-auto">{e.role}</strong>
          </div>
          <div className="toast-body">
            {e.text}
          </div>
        </div>
        <div style={{clear: "both"}}></div>
        </div>
         ))}
      </div>

    </main>
    <div className="input-group mb-4 w-75 end-0 me-5 position-fixed bottom-0">
      <input type="text" onChange={ e => setText(e.target.value) } className="form-control" value={text} placeholder="Tulis pesan ....." aria-label="Recipient's username" aria-describedby="button-addon2" />
      <button className="btn btn-success" type="button" onClick={kirimChat} id="button-addon2">Kirim</button>
    </div>
  </div>
</div>
</div>
  )
}