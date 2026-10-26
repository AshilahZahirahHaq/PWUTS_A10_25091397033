/* Halaman Riwayat: render tabel, filter minggu, dan pencarian */
function renderTableRows(filterMinggu = 'all', searchQuery = '') {
    const q = searchQuery.toLowerCase();
    const filtered = reportsData.filter(item => {
        const matchMinggu = filterMinggu === 'all' || item.minggu_ke == filterMinggu;
        const matchSearch = item.judul.toLowerCase().includes(q) || item.deskripsi.toLowerCase().includes(q);
        return matchMinggu && matchSearch;
    });

    if (filtered.length === 0) {
        $('#table-body').html(`
            <tr>
                <td colspan="6" class="empty-row">
                    <i class="fa-regular fa-folder-open"></i>
                    Tidak ada data laporan harian yang cocok.
                </td>
            </tr>
        `);
        return;
    }

    const html = filtered.map(r => `
        <tr>
            <td class="td-date nowrap">${r.tanggal}</td>
            <td class="nowrap"><span class="chip chip-light">Minggu ${r.minggu_ke}</span></td>
            <td class="td-title">${r.judul}</td>
            <td class="nowrap">${getBadgeHtml(r.status)}</td>
            <td class="nowrap">
                ${r.file_name ? `<span class="file-link"><i class="fa-solid fa-paperclip"></i> ${r.file_name}</span>` : '<span class="muted">-</span>'}
            </td>
            <td class="text-center nowrap">
                <button data-detail="${r.id}" class="icon-btn view" title="Lihat Detail"><i class="fa-solid fa-eye"></i></button>
                ${(r.status === 'Draft' || r.status === 'Ditolak') ? `
                    <a href="form-laporan.html?edit=${r.id}" class="icon-btn edit" title="Edit Laporan"><i class="fa-solid fa-pen"></i></a>
                ` : ''}
            </td>
        </tr>
    `).join('');

    $('#table-body').html(html);
}

$(document).ready(function () {
    renderTableRows();

    $('#filter-minggu').on('change', function () {
        renderTableRows($(this).val(), $('#search-input').val());
    });
    $('#search-input').on('keyup', function () {
        renderTableRows($('#filter-minggu').val(), $(this).val());
    });

    $(document).on('click', '[data-detail]', function () {
        openModalDetail(parseInt($(this).data('detail')));
    });
});
