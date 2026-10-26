/* Halaman Dashboard: isi statistik, laporan terakhir, dan peringatan */
$(document).ready(function () {
    const count = status => reportsData.filter(r => r.status === status).length;
    const ditolak = count('Ditolak');

    $('#stat-total').text(reportsData.length);
    $('#stat-menunggu').text(count('Menunggu'));
    $('#stat-disetujui').text(count('Disetujui'));
    $('#stat-divalidasi').text(count('Divalidasi'));

    $('#recent-reports').html(reportsData.slice(-3).reverse().map(r => `
        <div class="report-item">
            <div>
                <div class="report-meta">
                    <span class="report-date"><i class="fa-regular fa-calendar"></i> ${r.tanggal}</span>
                    <span class="chip">Minggu ${r.minggu_ke}</span>
                </div>
                <p class="report-title">${r.judul}</p>
            </div>
            <div>${getBadgeHtml(r.status)}</div>
        </div>
    `).join(''));

    if (ditolak > 0) {
        $('#rejected-alert').html(`
            <div class="alert-box alert-danger">
                <strong><i class="fa-solid fa-triangle-exclamation"></i> Ada Laporan Ditolak!</strong>
                <p>Terdapat ${ditolak} laporan yang perlu Anda revisi dan kirim ulang.</p>
                <a href="riwayat-laporan.html">Perbaiki Sekarang</a>
            </div>
        `);
    }
});
