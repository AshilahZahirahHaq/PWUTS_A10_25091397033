# SiMagang - Sistem Monitoring PKL UNESA (Modul Mahasiswa)

Antarmuka web untuk mahasiswa mencatat dan memantau laporan kegiatan harian Praktik Kerja Lapang (PKL).
Versi ini sudah dipecah menjadi **halaman HTML terpisah** (multi-page), memakai HTML, CSS murni, dan jQuery.
Data masih berupa data contoh (mock) di sisi browser, disimpan di `localStorage`, belum terhubung ke server atau database.

---

## 1. Cara Menjalankan

1. Ekstrak file zip.
2. Buka `index.html` (otomatis menuju `dashboard.html`) dengan browser. Tidak perlu server.
3. Butuh koneksi internet, karena jQuery, Font Awesome, dan Google Fonts dimuat dari CDN.

---

## 2. Struktur Folder

```
PWUTS_A10_25091397033/
├── index.html               Pengalih otomatis ke dashboard.html
├── dashboard.html           Halaman Dashboard
├── form-laporan.html        Halaman Input / Edit Laporan Harian
├── riwayat-laporan.html     Halaman Riwayat & Progres (+ modal detail)
├── README.md
└── assets/
    ├── css/style.css        Seluruh gaya tampilan
    ├── img/simagang-logo-putih.png
    └── js/
        ├── data.js          Data contoh + simpan/muat dari localStorage
        ├── helpers.js       getBadgeHtml(status)
        ├── app.js           Menu mobile & tombol keluar (semua halaman)
        ├── modal.js         Modal detail laporan (halaman Riwayat)
        └── pages/
            ├── dashboard.js         Statistik, laporan terakhir, peringatan
            ├── form-laporan.js      Isi form (mode edit), validasi, simpan
            └── riwayat-laporan.js   Tabel, filter minggu, pencarian
```

---

## 3. Urutan Pemuatan Script

Semua file memakai variabel global (tanpa ES Module, agar bisa dibuka lewat `file://`).
Urutan di setiap halaman: jQuery, `data.js`, `helpers.js`, `app.js`, lalu file khusus halaman
(`modal.js` hanya di Riwayat). Jika urutan diubah, bisa muncul error seperti `reportsData is not defined`.

---

## 4. Alur Antar Halaman

- Menu sidebar berupa link biasa: `dashboard.html`, `form-laporan.html`, `riwayat-laporan.html`.
- Tombol Edit di Riwayat membuka `form-laporan.html?edit=<id>`.
- Setelah laporan tersimpan, form otomatis pindah ke `riwayat-laporan.html` (sekitar 1,2 detik).
- Data lintas halaman disimpan di `localStorage` dengan kunci `simagang_reports`.
  Untuk mengembalikan data awal, hapus kunci itu lewat DevTools (Application > Local Storage).

---

## 5. Aturan Validasi Form

- Tanggal, Judul, dan Deskripsi wajib diisi.
- Lampiran opsional. Jika ada: PDF, JPG, JPEG, atau PNG, maksimal 5 MB.
- Laporan hanya bisa diedit jika statusnya **Draft** atau **Ditolak**.

---

## 6. Cara Mengubah Hal-hal Umum

| Ingin mengubah | Edit di |
|---|---|
| Nama, NIM, tempat PKL, pembimbing | header/sidebar di ketiga file `.html` |
| Warna utama / emas | variabel `:root` di `assets/css/style.css` |
| Data contoh laporan | `defaultReports` di `assets/js/data.js` |
| Batas ukuran file / ekstensi | `validateForm()` di `assets/js/pages/form-laporan.js` |
| Menambah halaman baru | salin salah satu `.html`, buat `assets/js/pages/nama.js`, tambah link di sidebar semua halaman |

---

## 7. Keterbatasan

- Header, sidebar, dan footer ditulis ulang di tiap file HTML (tanpa template/backend), jadi perubahan menu perlu diterapkan di semua halaman.
- File lampiran tidak benar-benar diunggah; hanya nama dan ukurannya yang dicatat.
- Tombol "Keluar System" belum berfungsi.
- Untuk dipakai sungguhan perlu backend dan database; ganti `persistReports()` / `reportsData` dengan pemanggilan API.

---

## 8. Teknologi

HTML5, CSS3 murni, JavaScript ES6, jQuery 3.6.4, Font Awesome 6.4.0, Poppins (Google Fonts).
