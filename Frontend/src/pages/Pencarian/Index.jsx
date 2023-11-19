import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import { useEffect, useState, useLayoutEffect } from 'react';
import UsePencarian from './UsePencarian.jsx';
import Header from '../Header.jsx';
import Help from '../../Help.jsx';


export default function () {
  const { tambah, all } = UsePencarian();
  
  
	const [key, setKey] = useState('');
	const [chat, setChat] = useState("");
	const [data, setData] = useState([]);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [show, setShow] = useState('false');

	useEffect( () => {
    all(setData);

	}, []);

  useLayoutEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };

    if (img) {
      reader.readAsDataURL(img);
    }


    const videos = new FileReader();
    videos.onloadend = () => {
      setPreviewVideo(videos.result);
    };

    if (video) {
      videos.readAsDataURL(video);
    }
  }, [img,video]);

	const tambahData = (e) => {
		e.preventDefault();
		
    tambah(key, chat, img, video);
	}

const handleChangeImg = (e) => {
  e.preventDefault();
  setImg(e.target.files[0]);
};

const handleChangeVideo = (e) => {
  e.preventDefault();
  setVideo(e.target.files[0]);
};

const handleClick = (e) => {
  e.preventDefault();

  if ( show == 'false' ) {
    setShow('show');
  } else {
    setShow('false');
  }
}

const handleHapus = (e) => {
  e.preventDefault();

  const hapus = confirm('Apakah anda yakin ingin menghapus item ini ?');

  if ( hapus )
    window.location.href = e.target.getAttribute('data-link');
}


	return (
		<div>
    <Header />

<div className="container-fluid">
  <div className="row">
	<Navbar aktif="pencarian" />  

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Data Pencarian</h1>
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
                    Tambah Data Pencarian
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className={`accordion-collapse collapse ${show}`}
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">


      <form className="col g-1" onSubmit={tambahData} encType="multipart/form-data">
  <div className="col-md-5 mt-2">
    <label htmlFor="validationCustom01" className="form-label">Kata Kunci</label>
    <input type="text" className="form-control" value={key} onChange={ e => setKey(e.target.value) } required />
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>
  <div className="col-md-5 mt-2">
    <label htmlFor="validationCustom02" className="form-label">Hasil Text</label>
    <textarea type="number" className="form-control" value={chat} onChange={ e => setChat(e.target.value) }> </textarea>
    {/*<div className="valid-feedback">
      Looks good!
    </div>*/}
  </div>
  <div className="col-md-5 mt-2">
  <label htmlFor="formFile" className="form-label">Hasil Foto</label>
  <input className="form-control" type="file" onChange={handleChangeImg} id="formFile" />
</div>
<div className="col-md-5 mt-2">
  <img src={previewImg} height={100} style={{borderRadius: 12}} />
</div>
 <div className="col-md-5 mt-2">
  <label htmlFor="formFile" className="form-label">Hasil Video</label>
  <input className="form-control" type="file" onChange={handleChangeVideo} id="formFile" />
</div>
<div className="col-md-5 mt-2">
  <video src={previewVideo} autoPlay loop height={100} />
</div>
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Tambah Data</button>
  </div>
</form>
</div>
</div>
</div>
</div>

      <div className="table-responsive mt-4">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Kata Kunci</th>
              <th scope="col">Hasil Text</th>
              <th scope="col">Hasil Foto</th>
              <th scope="col">Hasil Video</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody className="table-warning">
            {
            	data.map( (e, i) => (
            	<tr key={i}>
            		<td>{i + 1}</td>
            		<td>{e.key}</td>
            		<td>{e.chat}</td>
                <td className="center"><img src={`http://127.0.0.1:8000/api/response-chat/${e.image}`} height={50} /></td>
                <td><video src={`http://127.0.0.1:8000/api/response-chat/${e.video}`} autoPlay loop height={50} /></td>
            		<td className="d-flexjustify-content-between"> <Link className="btn btn-danger w-100 me-5" data-link={`/pencarian/hapus/${e.id}`} onClick={handleHapus}> Hapus </Link> <Link className="mt-2 btn btn-warning w-100" to={`/pencarian/${e.id}`}> Edit </Link>  </td>
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