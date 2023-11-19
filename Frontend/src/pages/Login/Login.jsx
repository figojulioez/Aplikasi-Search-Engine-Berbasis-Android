import { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Help from '../../Help.jsx';

export default function Login({setIs}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, auth, guest, logout, me } = Help();

  useEffect(() => {
  }, [])

  const handleClick = (e) => {
    e.preventDefault();

    login(username, password, setIs);

  }

  return (
    <MDBContainer className='my-5 py-5 w-75'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center justify-content-center'>


          <MDBCol md='8'>

            <MDBCardBody className="mt-5 my-5">

                <div><h1 className="text-center mb-4" style={{fontWeight: 'bold'}}> FigoSearch </h1></div>

              <MDBInput wrapperClass='mb-4' label='Masukan username anda' id='form1' type='username' value={username} onChange={ e => setUsername(e.target.value) } />
              <MDBInput wrapperClass='mb-4' label='Masukan password anda'  id='form2' type='password' value={password} onChange={ e => setPassword(e.target.value) } />

              <MDBBtn className="mb-4 w-100" onClick={handleClick}>Masuk</MDBBtn>

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

