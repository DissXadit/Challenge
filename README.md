# Challenge Web Programmer — PT. JAVIS TEKNOLOGI ALBAROKAH

**Repository:** https://github.com/DissXadit/Challenge  
**Deskripsi:** Aplikasi web sederhana berbasis full-stack dengan fitur Login → Dashboard (Protected Route) sesuai tugas.  
**Stack utama:** React (frontend) + Express (backend) + MySQL (database) + JWT untuk autentikasi.

---

## 🚀 Tech Stack  
- Frontend: React.js (Create React App atau Vite)  
- Backend: Node.js + Express.js  
- Database: MySQL (atau PostgreSQL)  
- Autentikasi: JWT (JSON Web Token) + HttpOnly cookie (refresh token)  
- Hashing password: bcrypt  
- HTTP Client: Axios  
- Styling/Design: (misalnya Bulma / Tailwind / Bootstrap)  
- Bonus (jika ada): Rate-limit, Unit Test, Dark Mode, Animasi Loading, Deploy publik  

---

## 📁 Struktur Project  
Challenge/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ ├── package.json
│ └── .env
└── frontend/
├── src/
│ ├── components/
│ ├── pages/ (Login.jsx, Register.jsx, Dashboard.jsx)
│ ├── lib/ (axios helper)
│ └── App.jsx / index.jsx
├── package.json
└── .env

yaml
Copy code

---

## ⚙️ Cara Menjalankan Proyek (Development)  
### 1. Clone repository  
```bash
git clone https://github.com/DissXadit/Challenge.git
cd Challenge

Setup Backend
cd backend
npm install


Buat file .env di folder backend/ dengan contohnya:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=auth_db

ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret


Lalu jalankan server:

npm run dev


Server berjalan di: http://localhost:5000

3. Setup Frontend
cd ../frontend
npm install
npm run dev


Frontend berjalan di: http://localhost:3000 (atau port sesuai konfigurasi)

📡 API Endpoints Ringkas

POST /login – login user (body: email + password)

POST /users – register user

GET /token – refresh access token

GET /users – dapat daftar user (protected route)

DELETE /logout – logout dan hapus sesi/refresh token

🔐 Arsitektur & Alur Autentikasi

User login → backend memverifikasi credentials → jika sukses:

Generate accessToken dan refreshToken

refreshToken disimpan di HttpOnly cookie

accessToken dikirim ke frontend (atau disertakan di header)

Frontend menyimpan accessToken di state/memori dan memakai header Authorization: Bearer <token> untuk endpoint protected.

Ketika accessToken kadaluarsa → frontend memanggil /token → backend memverifikasi refreshToken di cookie → generate accessToken baru → dikirim ke frontend.

Route seperti /users hanya dapat diakses jika accessToken masih valid (middleware di backend memverifikasi).

Logout → endpoint DELETE /logout akan menghapus refreshToken dari server dan cookie dikosongkan → user diarahkan ke login.

🧪 Validasi & UX

Validasi client-side (React): semua field wajib + email harus valid format.

Tampilkan pesan error jika login gagal atau register gagal.

UX tambahan: tombol “Show/Hide Password”, animasi loading saat request login/ketika loading, disable tombol saat loading.

Desain responsif (mobile & desktop).

📦 Bonus (jika diterapkan)

Rate-limit untuk endpoint login (contoh: max 5 percobaan per menit per IP).

Unit test sederhana (misalnya test validasi form di frontend, atau endpoint login di backend).

Dark mode toggle (UI bisa berganti tema).

Deploy ke platform publik (misalnya Vercel, Render, Railway) — link deploy: [isi jika ada]

📸 Screenshot UI

Sertakan 3–5 screenshot dari aplikasi (contoh: login desktop, login mobile, register mobile, dashboard).
Contoh Markdown:

![Login Desktop](screenshots/login-desktop.png)  
![Login Mobile](screenshots/login-mobile.png)

📝 Penutup

Jika kamu menemukan bug atau ingin menambahkan fitur lebih lanjut, feel free untuk eksplorasi (misalnya menambahkan profil user, update password, rol akses, dll).
Semoga aplikasi ini memenuhi semua kriteria challenge dan berhasil mendapatkan hasil terbaik!

👤 Author

DissXadit – Developer aplikasi ini
📍 GitHub Profile
![WhatsApp Image 2025-10-22 at 00 25 05](https://github.com/user-attachments/assets/411a5f76-98a1-4efa-9366-931c0ade1faa)
![WhatsApp Image 2025-10-22 at 00 25 34](https://github.com/user-attachments/assets/72315935-e34d-4828-bcee-02078e1d0218)
![WhatsApp Image 2025-10-22 at 00 25 56](https://github.com/user-attachments/assets/ba0da544-ed40-43aa-b35b-85e555f69aaa)
![WhatsApp Image 2025-10-22 at 00 27 41](https://github.com/user-attachments/assets/a7815ef6-fbaf-42fe-b914-43009f7b4472)
![WhatsApp Image 2025-10-22 at 00 27 58](https://github.com/user-attachments/assets/f94a7d2e-dc9e-4a89-a22f-e4cbc0add8cb)
![WhatsApp Image 2025-10-22 at 00 28 43](https://github.com/user-attachments/assets/14a52847-0932-4ad5-b1dc-f9cb5b9160e7)
![WhatsApp Image 2025-10-22 at 00 28 15](https://github.com/user-attachments/assets/6226a363-b17b-4650-ae40-31250fab3402)
![WhatsApp Image 2025-10-22 at 00 24 44](https://github.com/user-attachments/assets/efa32090-be9e-4739-8594-5541a77b3646)



