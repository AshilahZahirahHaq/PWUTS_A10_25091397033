/* Fungsi: modal detail laporan (dipakai di halaman Riwayat) */
function openModalDetail(id) {
    const r = reportsData.find(item => item.id === id);
    if (!r) return;

    const html = `
        <div class="detail-grid">
            <div><span class="k">Tanggal Kegiatan:</span><p class="v">${r.tanggal}</p></div>
            <div><span class="k">Minggu Ke:</span><p class="v">Minggu ${r.minggu_ke}</p></div>
            <div><span class="k">Status Laporan:</span><div style="margin-top:2px">${getBadgeHtml(r.status)}</div></div>
            <div><span class="k">File Lampiran:</span><p class="v file">${r.file_name || 'Tidak Ada Lampiran'}</p></div>
        </div>
        <div>
            <h4 class="detail-label">Judul Kegiatan</h4>
            <p class="detail-title">${r.judul}</p>
        </div>
        <div>
            <h4 class="detail-label">Deskripsi Pekerjaan</h4>
            <p class="detail-text">${r.deskripsi}</p>
        </div>
        <div>
            <h4 class="detail-label">Kendala / Catatan Harian</h4>
            <p class="detail-text">${r.kendala || '-'}</p>
        </div>
        ${r.komentar_pembimbing ? `
            <div class="note-box">
                <h4><i class="fa-solid fa-comment-dots"></i> Catatan Pembimbing Lapangan</h4>
                <p>${r.komentar_pembimbing}</p>
            </div>
        ` : ''}
    `;
    $('#modal-detail-body').html(html);
    $('#modal-detail').removeClass('hidden');
}

function closeModalDetail() {
    $('#modal-detail').addClass('hidden');
}

$(document).ready(function () {
    $(document).on('click', '.close-modal', closeModalDetail);
    $('#modal-detail').on('click', function (e) {
        if (e.target === this) closeModalDetail();
    });
});
