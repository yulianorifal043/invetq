// --- 1. SETUP & UTILITY ---
const weddingDate = new Date("November 17, 2025 09:00:00").getTime();
const mainContent = document.getElementById('main-content');
const openButton = document.getElementById('open-invitation');
const music = document.getElementById('background-music');

// --- 2. BUKA UNDANGAN & PLAY MUSIC ---
openButton.addEventListener('click', () => {
    // Sembunyikan cover
    document.getElementById('cover').style.display = 'none';
    // Tampilkan isi utama
    mainContent.style.display = 'block';

    // Scroll ke bagian atas isi undangan
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Coba putar musik otomatis (kebijakan browser sering memblokir ini, tapi kita coba)
    // Disarankan untuk menambahkan tombol kontrol musik di isi undangan
    music.play().catch(error => {
        console.log("Autoplay blocked. Add a play button for the user.");
    });
});

// --- 3. FUNGSI HITUNG MUNDUR (COUNTDOWN) ---
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Perhitungan waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById('countdown');

    if (countdownElement) {
        countdownElement.innerHTML = `
            <div><span>${days}</span>Hari</div>
            <div><span>${hours}</span>Jam</div>
            <div><span>${minutes}</span>Menit</div>
            <div><span>${seconds}</span>Detik</div>
        `;
    }

    // Jika hitungan mundur selesai
    if (distance < 0) {
        clearInterval(countdownInterval);
        if (countdownElement) {
             countdownElement.innerHTML = "ACARA SEDANG BERLANGSUNG";
        }
    }
}

// Jalankan fungsi hitung mundur setiap 1 detik
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Panggil sekali untuk menghindari jeda 1 detik di awal

// --- 4. SIMULASI RSVP FORM & BUKU TAMU ---
const rsvpForm = document.getElementById('rsvp-form');
const rsvpMessage = document.getElementById('rsvp-message');

rsvpForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form submit standar

    // --- DI SINI ANDA AKAN MENGIRIM DATA KE BACKEND (Contoh menggunakan Fetch API) ---
    /*
    const formData = new FormData(this);
    fetch('/api/rsvp', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Logika sukses
        rsvpMessage.textContent = 'Terima kasih! Konfirmasi Anda telah kami terima dan tercatat.';
        rsvpMessage.style.display = 'block';
        this.reset();
    })
    .catch(error => {
        // Logika error
        rsvpMessage.textContent = 'Gagal mengirim konfirmasi. Silakan coba lagi.';
    });
    */
    
    // SIMULASI SUKSES (Hanya Frontend)
    rsvpMessage.textContent = 'Terima kasih! Konfirmasi Anda telah kami terima dan tercatat. ❤️';
    rsvpMessage.style.display = 'block';
    this.reset(); // Kosongkan form

    // Sembunyikan pesan sukses setelah 5 detik
    setTimeout(() => {
        rsvpMessage.style.display = 'none';
    }, 5000);
});

// --- 5. FUNGSI COPY REKENING ---
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const accountNumber = this.getAttribute('data-account');
        
        // Buat elemen teks sementara
        const tempInput = document.createElement('input');
        tempInput.value = accountNumber;
        document.body.appendChild(tempInput);

        // Salin teks
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Beri feedback visual
        const originalText = this.textContent;
        this.textContent = 'Tersalin!';
        setTimeout(() => {
            this.textContent = originalText;
        }, 1500);
    });
});