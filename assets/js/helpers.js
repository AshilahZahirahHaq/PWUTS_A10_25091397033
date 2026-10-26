/* Helper: badge status laporan */
function getBadgeHtml(status) {
    switch (status) {
        case 'Draft':       return '<span class="badge badge-draft"><i class="fa-regular fa-file"></i> Draft</span>';
        case 'Menunggu':    return '<span class="badge badge-menunggu"><i class="fa-solid fa-hourglass-half"></i> Menunggu Verifikasi</span>';
        case 'Disetujui':   return '<span class="badge badge-disetujui"><i class="fa-solid fa-check"></i> Disetujui</span>';
        case 'Ditolak':     return '<span class="badge badge-ditolak"><i class="fa-solid fa-xmark"></i> Ditolak</span>';
        case 'Divalidasi':  return '<span class="badge badge-divalidasi"><i class="fa-solid fa-shield-halved"></i> Divalidasi Dosen</span>';
        default:            return '<span class="badge badge-default">' + status + '</span>';
    }
}
