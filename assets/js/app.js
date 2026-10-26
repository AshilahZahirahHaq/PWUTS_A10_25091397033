/* Script bersama semua halaman: menu mobile & tombol keluar */
$(document).ready(function () {
    // Toggle menu mobile
    $('#mobile-menu-btn').on('click', function () {
        $('#sidebar').toggleClass('open');
    });

    $('#btn-logout').on('click', function (e) { e.preventDefault(); });
});
