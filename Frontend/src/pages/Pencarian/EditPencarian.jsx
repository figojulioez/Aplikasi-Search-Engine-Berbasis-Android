import {Link, useParams} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import { useEffect, useState, useLayoutEffect } from 'react';
import UsePencarian from './UsePencarian.jsx';
import Header from '../Header.jsx';
import Help from '../../Help.jsx';


export default function Barang () {
  const { id } = useParams();
  const { edit, show } = UsePencarian();



	const [key, setKey] = useState('');
  const [chat, setChat] = useState('');
  const [data, setData] = useState([]);
  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  useEffect( () => {
    show(setKey, setChat, setPreviewImg, setPreviewVideo, id);
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

    console.log(img);
  }, [img,video]);

  const editData = (e) => {
    e.preventDefault();
    
    edit(key, chat, img, video, id);
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

	return (
		<div>
    <Header />

<div className="container-fluid">
  <div className="row">
	<Navbar aktif="pencarian" />  

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Edit Pencarian</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          </div>
        </div>
      </div>


      <form className="col g-1" onSubmit={editData}>
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
  <img src={previewImg}  height={100} style={{borderRadius: 12}} />
</div>
 <div className="col-md-5 mt-2">
  <label htmlFor="formFile" className="form-label">Hasil Video</label>
  <input className="form-control" type="file" onChange={handleChangeVideo} id="formFile" />
</div>
<div className="col-md-5 mt-2">
  <video src={previewVideo} height={100} autoPlay loop />
</div>
  <div className="col-12">
    <button className="btn btn-primary" type="submit">Edit Data</button>
  </div>
</form>

    </main>
  </div>
</div>
</div>
	)
}