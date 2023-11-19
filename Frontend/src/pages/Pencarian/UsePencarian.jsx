import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UsePencarian () {
	function getCode() {
		return localStorage.getItem('token');
	}

	function getLink() {
		return 'http://127.0.0.1:8000/api/response-chat/';
	}

	async function tambah (key, chat, img, video) {
		try {

			const forms = new FormData();

			forms.append('key', key);
			forms.append("chat", chat);
			forms.append('img', img);
			forms.append('video', video);

			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
			const pencarian = await axios.post(getLink() + 'create', forms);
			window.location.reload();
			} catch (Err) {
			console.log(Err);
		}
	} 

	async function all (setData) {
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			const pencarian = await axios.post(getLink() + 'all');
			setData(pencarian.data.data);
			console.log(pencarian.data.data);
		} catch (Err) {
			console.log(Err);
		}
	}

	async function show (setKey, setChat, setPreviewImg, setPreviewVideo, id) {
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			const pencarian = await axios.post(getLink() + 'show/' + id);
			setKey(pencarian.data.data.key);
			setChat(pencarian.data.data.chat);
			setPreviewImg(`${getLink()}${pencarian.data.data.image}`);
			setPreviewVideo(`${getLink()}${pencarian.data.data.video}`);
		} catch (Err) {
			console.log(Err);
		}
	}

	async function edit (key, chat, img, video, id) {
		const form = new FormData();

		form.append('key', key);
		form.append('chat', chat);
		form.append('img', img);
		form.append('video', video);

		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
			const barang = await axios.post(getLink() + 'update/' + id, form);
			window.location.href = '/pencarian';
		} catch (Err) {
			console.log(Err);
		}
	} 

	async function hapus (id) {
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			const pencarian = await axios.post(getLink() + 'delete/' + id);
			window.location.href = '/pencarian';
		} catch (Err) {
			console.log(Err);
		}
	} 

	async function praTransaksi(kode, nama, jumlah, harga) {
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			const barang = await axios.post(getLink() + 'pratransaksi', {kode, nama, jumlah, harga});
			window.location.reload();
		} catch (Err) {
			console.log(Err);
		}
	}

	async function allPraTransaksi (setData, setJumlah) {
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			const barang = await axios.post(getLink() + 'allpratransaksi');
			setData(barang.data.messages);
			setJumlah(barang.data.jumlah[0].jumlahBayar);
		} catch (Err) {
			console.log(Err);
			setData([]);
		}		
	}

	async function bayar () {
		var kasir = localStorage.getItem('nama');
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			const barang = await axios.post(getLink() + 'bayar', {kasir});
			window.location.reload();
		} catch (Err) {
			console.log(Err);
		}
	} 

	async function alls (setData) {
		try {
			axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
			const barang = await axios.post(getLink() + 'alls');
			setData(barang.data.data);
			console.log(barang);
		} catch (Err) {
			console.log(Err);
		}
	} 

	return {
		tambah, all, show, edit, hapus, praTransaksi, allPraTransaksi, bayar, alls
	}
}