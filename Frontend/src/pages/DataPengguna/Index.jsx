import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import UseDataPengguna from './UseDataPengguna';
import { useEffect, useState } from 'react';
import Header from '../Header.jsx';
import Help from '../../Help.jsx';

export default function () {
	const [nama, setNama] = useState('');
	const [username, setUsername] = useState('');
  const [cPassword, setCPassword] = useState('');
	const [password, setPassword] = useState('');
	const [data, setData] = useState([]);
  const { tambah, all } = UseDataPengguna();
  const { login, auth, guest, logout, me } = Help();
  const [show, setShow] = useState('false');

	useEffect( () => {
    all(setData);
	}, []);

  const handleClick = (e) => {
  e.preventDefault();

  if ( show == 'false' ) {
    setShow('show');
  } else {
    setShow('false');
  }
}

	const tambahData = (e) => {
		e.preventDefault();

    tambah(username, password, cPassword);
	}

  const handleHapus = (e) => {
    e.preventDefault();

    const hapus = confirm("Apakah anda yakin menghapus item ini ?");

    if (hapus)
      window.location.href = e.target.getAttribute('data-link');
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
 <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                    onClick={handleClick}
                  >
                    Tambah Data Pengguna
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className={`accordion-collapse collapse ${show}`}
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">



      <form className="row g-3 align-items-baseline" onSubmit={tambahData}>
  <div className="col-md-4">
    <label htmlFor="validationCustom01" className="form-label">Username Pengguna <span style={{color: 'red'}}>* Tidak boleh kurang dari 7 karakter</span></label>
    <input type="text" className="form-control" value={username} onChange={ e => setUsername(e.target.value) } required />
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Password Pengguna <span style={{color: 'red'}}>* Tidak boleh kurang dari 7 karakter</span></label>
    <input type="password" className="form-control" value={password} onChange={ e => setPassword(e.target.value) } required />
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom02" className="form-label">Konfirmasi Password Pengguna <span style={{color: 'red'}}>* Harus sama dengan password</span></label>
    <input type="password" className="form-control" value={cPassword} onChange={ e => setCPassword(e.target.value) } required />
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
</div>
</div>
</div>
</div>


      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Username</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody className="table-warning">
            {
            	data.map( (e, i) => (
            	<tr key={i}>
            		<td>{`${i + 1}`}</td>
            		<td>{e.username}</td>
                <td className="d-flex justify-content-center"> <Link className="btn btn-danger w-100 me-5" data-link={`/data-pengguna/hapus/${e.id}`} onClick={handleHapus} > Hapus </Link></td>
            	</tr>	
            ))}
          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>
</div>
	)
}