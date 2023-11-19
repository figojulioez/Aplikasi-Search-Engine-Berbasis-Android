import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsePetugas () {
	function getCode() {
		return localStorage.getItem('token');
	}

	function getLink() {
		return 'http://127.0.0.1:8000/api/auth/';
	}

	async function tambah (username, password, cPassword) {

		if (password == cPassword)
			try {
				axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
				const pengguna = await axios.post(getLink() + 'register', {username, password});
				window.location.reload();
			} catch (Err) {
				console.log(Err);
			}
		} 

		async function all (setData) {
			try {
				axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
				const pengguna = await axios.post(getLink() + 'all');
				setData(pengguna.data.data);
			} catch (Err) {
				console.log(Err);
			}
		}

		async function show (setData, id) {
			try {
				axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
				const pengguna = await axios.post(getLink() + 'show/' + id);
				setData(pengguna.data.data);
				console.log(pengguna);
			} catch (Err) {
				console.log(Err);
			}
		}

		async function edit (nama, username, password, id) {
			try {
				axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
				const barang = await axios.post(getLink() + 'update/' + id, {nama, username, password });
				window.location.href = '/petugas';
			} catch (Err) {
				console.log(Err);
			}
		} 

		async function hapus (id) {
			try {
				axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
				const pengguna = await axios.post(getLink() + 'delete/' + id);
				window.location.href = '/data-pengguna';
			} catch (Err) {
				console.log(Err);
			}
		}

		return {
			tambah, all, show, edit, hapus
		}
	}