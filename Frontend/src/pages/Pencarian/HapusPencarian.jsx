import { useState, useEffect } from 'react';
import UsePencarian from './UsePencarian.jsx';
import {useParams} from 'react-router-dom';
import Help from '../../Help.jsx';


export default function HapusBarang () {
	const {hapus} = UsePencarian();
	const {id} = useParams();
  	const { login, auth, guest, logout, me } = Help();

	useEffect(() => {
		hapus(id);
	}, []);

	return (
		<div></div>
	)
}