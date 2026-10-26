/* Mock Database Laporan Harian Mahasiswa (F-05, F-06, F-08, F-09) */
/* Data awal (contoh). Perubahan disimpan di localStorage agar tidak hilang saat pindah halaman. */
var defaultReports = [
    {
        id: 1, tanggal: "2026-10-19", minggu_ke: 1,
        judul: "Orientasi Lapangan & Pengenalan System Architecture",
        deskripsi: "Mengikuti sesi briefing dengan Tim IT Telkom, penjelasan aturan magang, serta setup environment development local (Node.js & MySQL).",
        kendala: "Tidak ada kendala berarti. Akses VPN perusahaan memerlukan waktu aktivasi 1x24 jam.",
        status: "Divalidasi", file_name: "Bukti_Orientasi_Day1.pdf", file_size: "1.2 MB",
        komentar_pembimbing: "Awal yang baik. Pastikan catat semua setup credential."
    },
    {
        id: 2, tanggal: "2026-10-20", minggu_ke: 1,
        judul: "Analisis Struktur Basis Data SIMON-PKL",
        deskripsi: "Mempelajari ERD & DFD sistem monitoring magang sesuai dokumen SRS F-01 s.d F-24.",
        kendala: "Memahami relasi tabel assignment dan validasi mingguan dosen.",
        status: "Disetujui", file_name: "ERD_Notes.png", file_size: "850 KB",
        komentar_pembimbing: "Struktur database sudah dipahami dengan baik."
    },
    {
        id: 3, tanggal: "2026-10-21", minggu_ke: 1,
        judul: "Slicing UI Homepage Responsive & Dashboard",
        deskripsi: "Membuat tampilan HTML, CSS, dan layout SPA Ajax untuk antarmuka mahasiswa.",
        kendala: "Pengaturan Breakpoint grid pada layar tablet.",
        status: "Disetujui", file_name: "Screenshots_UI.jpg", file_size: "2.4 MB",
        komentar_pembimbing: "Desain sesuai panduan brand UNESA."
    },
    {
        id: 4, tanggal: "2026-10-22", minggu_ke: 2,
        judul: "Integrasi Form Validation Client-side (jQuery)",
        deskripsi: "Mengembangkan script validasi wajib isi, pembatasan ekstensi PDF/PNG/JPG, dan max file 5MB.",
        kendala: "Pesan error real-time terkadang bertumpuk jika input diubah cepat.",
        status: "Ditolak", file_name: "Form_Validation_Code.pdf", file_size: "3.1 MB",
        komentar_pembimbing: "Tolong lengkapi penanganan error ukuran file di atas 5MB dengan alert visual yang jelas."
    },
    {
        id: 5, tanggal: "2026-10-23", minggu_ke: 2,
        judul: "Refactoring Client-side Validation & Testing",
        deskripsi: "Memperbaiki error handling form laporan sesuai masukan pembimbing industri.",
        kendala: "Tidak ada kendala.",
        status: "Menunggu", file_name: "Refactored_Validation.pdf", file_size: "1.8 MB",
        komentar_pembimbing: ""
    },
    {
        id: 6, tanggal: "2026-10-26", minggu_ke: 2,
        judul: "Penyusunan Mockup Data Riwayat Laporan",
        deskripsi: "Menyiapkan tabel interaktif dengan fitur filter minggu ke-N dan live search.",
        kendala: "Menyelaraskan badge warna dengan status laporan.",
        status: "Draft", file_name: "", file_size: "",
        komentar_pembimbing: ""
    }
];

/* Penyimpanan antar halaman (localStorage) */
var STORAGE_KEY = 'simagang_reports';

function loadReports() {
    try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
    } catch (e) { /* localStorage tidak tersedia: pakai data awal */ }
    return JSON.parse(JSON.stringify(defaultReports));
}

function persistReports() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reportsData));
    } catch (e) { /* abaikan jika gagal menyimpan */ }
}

var reportsData = loadReports();
