/* Halaman Form: isi data (mode edit), validasi, dan simpan laporan */

function getEditData() {
    const editId = new URLSearchParams(window.location.search).get('edit');
    return editId ? reportsData.find(r => r.id === parseInt(editId)) : null;
}

function fillForm(editData) {
    if (editData) {
        $('#form-title').text('Edit Laporan Kegiatan PKL');
        $('#report-id').val(editData.id);
        $('#tanggal').val(editData.tanggal);
        $('#minggu_ke').val(editData.minggu_ke);
        $('#judul').val(editData.judul);
        $('#deskripsi').val(editData.deskripsi);
        $('#kendala').val(editData.kendala);
    } else {
        $('#tanggal').val(new Date().toISOString().split('T')[0]);
    }
}

function showFormAlert(type, html) {
    $('#form-alert').removeClass('hidden is-error is-success').addClass(type === 'error' ? 'is-error' : 'is-success').html(html);
}

function validateForm() {
    const result = { valid: true, fileName: '', fileSize: '' };
    $('.error-msg').addClass('hidden');

    // 1. Validasi wajib isi
    ['#tanggal', '#judul', '#deskripsi'].forEach(sel => {
        if (!$.trim($(sel).val())) {
            $(sel).next('.error-msg').removeClass('hidden');
            result.valid = false;
        }
    });

    // 2. Validasi file (ukuran & ekstensi)
    const fileInput = $('#lampiran')[0];
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const validExt = ['pdf', 'jpg', 'jpeg', 'png'];
        const ext = file.name.split('.').pop().toLowerCase();
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validExt.includes(ext)) {
            $('#file-error').text('Format file harus PDF, JPG, atau PNG!').removeClass('hidden');
            result.valid = false;
        } else if (file.size > maxSize) {
            $('#file-error').text('Ukuran file melebihi batas 5 MB!').removeClass('hidden');
            result.valid = false;
        } else {
            result.fileName = file.name;
            result.fileSize = (file.size / 1024 / 1024).toFixed(2) + ' MB';
        }
    }
    return result;
}

function saveReport(targetStatus, fileName, fileSize) {
    const id = $('#report-id').val();
    const data = {
        tanggal: $('#tanggal').val(),
        minggu_ke: parseInt($('#minggu_ke').val()),
        judul: $.trim($('#judul').val()),
        deskripsi: $.trim($('#deskripsi').val()),
        kendala: $.trim($('#kendala').val()),
        status: targetStatus
    };

    if (id) {
        const index = reportsData.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            Object.assign(reportsData[index], data);
            if (fileName) {
                reportsData[index].file_name = fileName;
                reportsData[index].file_size = fileSize;
            }
        }
    } else {
        const newId = reportsData.length ? Math.max(...reportsData.map(r => r.id)) + 1 : 1;
        reportsData.push(Object.assign({
            id: newId,
            file_name: fileName || 'Dokumen_Lampiran.pdf',
            file_size: fileSize || '1.0 MB',
            komentar_pembimbing: ''
        }, data));
    }
    persistReports();
}

function submitForm(targetStatus) {
    const v = validateForm();
    if (!v.valid) {
        showFormAlert('error', '<i class="fa-solid fa-circle-exclamation"></i> Gagal! Mohon periksa kembali inputan Anda yang wajib diisi atau berkas yang tidak valid.');
        return;
    }
    saveReport(targetStatus, v.fileName, v.fileSize);
    showFormAlert('success', '<i class="fa-solid fa-circle-check"></i> Berhasil! Laporan harian telah tersimpan sebagai <strong>' + targetStatus + '</strong>.');
    setTimeout(function () { window.location.href = 'riwayat-laporan.html'; }, 1200);
}

$(document).ready(function () {
    fillForm(getEditData());

    $('#lampiran').on('change', function () {
        const file = this.files[0];
        if (file) {
            $('#file-label').text(file.name + ' (' + (file.size / 1024 / 1024).toFixed(2) + ' MB)');
        }
    });

    $(document).on('click', '[data-submit]', function () { submitForm($(this).data('submit')); });
});
