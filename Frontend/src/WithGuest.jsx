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
				window.location.href = '/dashboard';
			} catch (Err) {
				setIsAuth(false);
			}
		}

		auth();
	}, []);

	if (isAuth) {
		return null;
	} else {
		return children;
	}

}