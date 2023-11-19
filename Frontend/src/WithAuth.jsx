import {useEffect, useState} from 'react';
import axios from 'axios';
import Help from './Help.jsx'
export default ({children}) => {
	const token = localStorage.getItem('token');

	const [isAuth, setIsAuth] = useState(false);
	const {getLink, getCode} = Help();

	useEffect(() => {
		const auth = async () => {
			try {
				axios.defaults.headers.common['Authorization'] = `Bearer ${getCode()}`;
				const auth = await axios.post(getLink() + '/auth/me');
				setIsAuth(true);
			} catch (Err) {
				window.location.href = '/';
			}
		}

		auth();
	}, []);

	if (isAuth) {
		return children;
	} else {
		return null;
	}

}