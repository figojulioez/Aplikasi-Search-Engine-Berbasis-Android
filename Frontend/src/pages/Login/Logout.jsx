import { useState, useEffect } from 'react';
import Help from '../../Help.jsx';

export default function HapusBarang () {
	const { logout } = Help();

	useEffect(() => {
		logout();
	}, []);

	return (
		<div>

		</div>
	)
}