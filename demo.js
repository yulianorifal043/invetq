// =========================================================
// LOGIKA PEMBUKAAN DAN ANIMASI (LEBIH CEPAT)
// =========================================================

const cover = document.getElementById('cover');
const mainContent = document.getElementById('main-content');
const openButton = document.getElementById('open-button');
const toGuestElement = document.getElementById('to-guest'); // Elemen 'Kepada Yth...'
const contentItems = document.querySelectorAll('.content-item');

// Fungsi untuk menangani animasi pembukaan
function openInvitation() {
    // 1. Fade out cover secara smooth (0.8 detik)
    cover.style.opacity = '0';
    
    // 2. Sembunyikan cover setelah transisi selesai
    setTimeout(() => {
        cover.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // 3. Panggil fungsi fade-in konten utama
        fadeInContent();
    }, 800); // MENGURANGI DELAY DARI 1500ms menjadi 800ms
}

// Fungsi untuk menampilkan konten utama dengan kecepatan sesuai data-delay
function fadeInContent() {
    contentItems.forEach((item) => {
        const delay = parseInt(item.getAttribute('data-delay')); // Ambil delay dari HTML
        
        // Terapkan properti setelah jeda waktu singkat
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, delay); 
    });
}

// Event Listener untuk Tombol Buka Undangan
openButton.addEventListener('click', openInvitation);

// =========================================================
// LOGIKA COUNTDOWN TIMER (Tetap Sama)
// =========================================================

const countDownDate = new Date("Feb 14, 2026 11:00:00").getTime();
const countdownElement = document.getElementById("countdown");

const updateCountdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Perhitungan waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    // Tampilkan hasil
    countdownElement.innerHTML = `${days} Hari : ${hours} Jam : ${minutes} Menit`;

    // Jika waktu berakhir
    if (distance < 0) {
        clearInterval(updateCountdown);
        countdownElement.innerHTML = "ACARA SEDANG BERLANGSUNG";
    }
}, 1000);


// =========================================================
// LOGIKA ANIMASI TOMBOL COVER
// =========================================================
const coverButton = document.getElementById('open-button');

// Munculkan tombol dan teks "Kepada Yth." LEBIH CEPAT (setelah 0.5s)
setTimeout(() => {
    coverButton.style.opacity = '1';
    coverButton.style.transform = 'translateY(0)';
}, 500); 

setTimeout(() => {
    toGuestElement.style.opacity = '1';
    toGuestElement.style.transform = 'translateY(0)';
}, 1000);