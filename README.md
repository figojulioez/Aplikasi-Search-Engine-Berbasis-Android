# Aplikasi Search Engine



Aplikasi ini dibuat dengan Framework PHP (Laravel), React Expo, React JS, Socket IO, Express JS.

## Fitur - Fitur
### Fitur Admin
- Login
- Dashboard
- Data Pencarian (Digunakan untuk membuat pencarian)
- Data Pengguna
- Data Chat (Digunakan untuk melakukan chat kepada user)
- Data Grup Chat
- Logout

### Fitur User
- Login
- Registrasi
- Ganti bahasa
- Pencarian
- Chat (Chat admin dan Grup Chat)
- Histori Pencarian
- Logout

User hanya bisa melakukan chatingan kepada admin sekali saj. Apabila ingin melakukan chating lagi user diharapkan login ulang.

Saya menyarankan anda saat mengikuti langkah - langkah ini terlebih dahulu. Terima kasih ~~~

Jalankan folder APIREACT :

    php artisan key:generate
    php artisan migrate
    php artisan db:seed
    php artisan serve
    
Jalankan folder Frontend (untuk tampilan admin) :

    npm start
    
Jalankan folder SocketIo :
    
    nodemon index.js
        
Jalankan folder my-app :

    npx expo start
    
Usahakan folder SocketIo dan Backend anda jalankan dengan local servers seperti ngrok, atau serveo. Lalu salin link berikut dan ganti beberapa file ini :

File Link.jsx yang terdapat pada folder views dan tampilan :

    export default () => {
	return 'https://2551d373f45408a3164da66fac4cf259.serveo.net'; // Link APIREACT anda dengan menggunakan local server
}

File ChatAdmin.jsx pada folder views/ScreenChat/ChatAdmin.jsx dan Tampilan/ScreenChat/ChatAdmin.jsx :

    const socket = io('https://d8d974a509e63566184dd16ced3c77d1.serveo.net', {
		withCredentials: true,
	}); // Link SocketIo anda dengan menggunakan local server
	
File ChatGroup.jsx pada folder views/ScreenChat/ChatGroup.jsx dan Tampilan/ScreenChat/ChatAdmin.jsx :

    const socket = io('https://d8d974a509e63566184dd16ced3c77d1.serveo.net', {
		withCredentials: true,
	}); // // Link SocketIo anda dengan menggunakan local server


Username = admin
Password = admin
