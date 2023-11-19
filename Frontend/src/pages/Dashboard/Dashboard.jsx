import { useEffect, useState, useLayoutEffect } from 'react';
import './Dashboard.css';
import {Link} from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import Chart from 'chart.js/auto'
import Header from '../Header.jsx';
import Help from '../../Help.jsx';
import axios from 'axios';
export default function Dashboard () {
  const { login, auth, guest, logout, me, getLink } = Help();
  const [data, setData] = useState([]);

  useEffect(() => {
    async function showLog () {
      try {
        const endpoint = getLink();
        const token = localStorage.getItem("token");
        const options = {
          headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        };
        const all = await axios.post(`${endpoint}/auth/log-activity`, {}, options);
        const colors = generateColors(all.data.data.length);
        const datasets = all.data.data.map((row, index) => ({
        label: row.name, // Set the label to the account name
        data: [row.count],
        backgroundColor: [colors[index]],
      }));

        (async function() {
          new Chart(
            document.getElementById('myChart1'),
            {
              type: 'bar',
              data: {
                labels: ['Akun - akun'],
                datasets: datasets
              }
            }
            );
        })();
      } catch (error) {
        console.log(error);
      } finally {

      }
    }

    function generateColors(numColors) {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.7)`;
        colors.push(color);
      }
      return colors;
    }


    showLog();



  }, []);



	return (    
<div>
<Header />
<div className="container-fluid">
  <div className="row">
	<Navbar aktif="dashboard" />  

    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2" style={{fontFamily: 'cursive', fontWeight: 'bold'}}>Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
          </div>
        </div>
      </div>

      <canvas className="my-4 w-100" id="myChart1" width="900" height="380" />
    </main>
  </div>
</div>
</div>

	);
}