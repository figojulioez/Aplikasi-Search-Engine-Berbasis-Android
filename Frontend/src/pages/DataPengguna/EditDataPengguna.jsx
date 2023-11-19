import {Link, useParams} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import { useEffect, useState } from 'react';
import UseDataPengguna from './UseDataPengguna.jsx';
import Header from '../Header.jsx';
import Help from '../../Help.jsx';

export default function () {
	const [nama, setNama] = useState('');
	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
	const { show, edit } = UseDataPengguna();
	const [data, setData] = useState([]);
  const { id } = useParams();
  const { login, auth, guest, logout, me } = Help();


	useEffect( () => {
		show(setData, id);

	}, []);



	const editData = (e) => {
		e.preventDefault();
		edit(nama, username, password, id);		
	}

	return (
		<div>
    <Header />


<div className="container-fluid">
  <div className="row">
	<Navbar aktif="data-pengguna" />  

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Data Pengguna</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          </div>
        </div>
      </div>

      <form className="row g-3 mt-5" onSubmit={editData}>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Username Pengguna</label>
    <input type="username" className="form-control" value={username} onChange={ e => setUsername(e.target.value) } required />
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>

  <div className="col-md-4">
    <label htmlFor="validationCustom01" className="form-label">Password Pengguna</label>
    <input type="password" className="form-control" value={password} onChange={ e => setPassword(e.target.value) } required />
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Konfirmasi Password Pengguna</label>
    <input type="password" className="form-control" value={cPassword} onChange={ e => setCPassword(e.target.value) } required />
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>
  
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>

    </main>
  </div>
</div>
</div>
	)
}