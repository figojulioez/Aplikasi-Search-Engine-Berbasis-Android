import axios from 'axios';

export default function Help() {
  function getLink() {
    return 'http://127.0.0.1:8000/api';
  }

  function getCode() {
    return localStorage.getItem('token');
  }

  const login = async function (username, password) {
    try {
      const auth = await axios.post(getLink() + '/auth/login', { username, password });
      localStorage.setItem('token', auth.data.token);
      window.location.href = '/dashboard';
    } catch (Err) {
      console.log(Err);
    }
  }

  const me = async function () {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
      const auth = await axios.post(getLink() + 'me');
    } catch (Err) {
    }
  }


  const logout = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
      const auth = await axios.post(getLink() + '/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('nama');
      window.location.href = '/'; // Mengarahkan kembali ke halaman awal setelah logout
    } catch (Err) {
    }
  }

  return {
    login, me, logout, getLink, getCode
  }
}
