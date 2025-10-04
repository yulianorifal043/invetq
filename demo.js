// --- 1. SETUP VARIABEL UTAMA ---
const WEDDING_DATE = new Date("February 14, 2026 11:00:00").getTime();
const coverScreen = document.getElementById('cover');
const mainContent = document.getElementById('main-content');
const openButton = document.getElementById('open-button');

// Kontrol Audio
const music = document.getElementById('background-music');
const musicControl = document.getElementById('music-control');
const musicIcon = document.getElementById('music-icon');


// --- 2. FUNGSI UTILITY ---

// A. Logika Personalisasi Nama Tamu (Layar Sapa)
function loadGuestName() {
    const guestNameElement = document.getElementById('to-guest');
    
    // Simulasikan pengambilan nama dari URL parameter '?to=Nama_Tamu'
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('to'); 
    
    if (guestName) {
        guestName = decodeURIComponent(guestName.replace(/[+_]/g, ' '));
        guestNameElement.textContent = `Kepada Yth. ${guestName}`;
    } else {
        guestNameElement.textContent = `Kepada Yth. Tamu Undangan`;
    }

    // Tampilkan tombol dan teks tamu dengan animasi setelah nama dimuat
    openButton.style.opacity = '1';
    openButton.style.transform = 'translateY(0)';
    guestNameElement.style.opacity = '1';
}

// B. Logika Hitung Mundur
function updateCountdown() {
    const now = new Date().getTime();
    const distance = WEDDING_DATE - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    const countdownElement = document.getElementById('countdown');

    if (countdownElement) {
        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.textContent = "ACARA SEDANG BERLANGSUNG";
        } else {
            // Kita tampilkan Hari, Jam, Menit untuk akurasi yang baik
            countdownElement.textContent = `${days} Hari ${hours} Jam ${minutes} Menit`;
        }
    }
}
const countdownInterval = setInterval(updateCountdown, 60000); // Update setiap 1 menit

// C. Logika Audio Play/Pause (BARU)
function toggleMusic() {
    if (music.paused) {
        // Play
        music.play();
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-volume-high');
    } else {
        // Pause
        music.pause();
        musicIcon.classList.remove('fa-volume-high');
        musicIcon.classList.add('fa-play');
    }
}


// --- 3. EVENT LISTENERS ---

// Event: Saat Tombol Buka Undangan diklik
openButton.addEventListener('click', () => {
    // 1. Hilangkan Cover dengan animasi
    coverScreen.style.opacity = '0';
    setTimeout(() => {
        coverScreen.style.display = 'none';
        mainContent.style.display = 'block';
        
        // 2. Tampilkan Kontrol Musik
        musicControl.classList.remove('hidden'); 
        
        // 3. Coba putar musik secara otomatis (perlu interaksi user)
        music.play().then(() => {
            // Jika sukses, ubah ikon menjadi Volume
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-volume-high');
        }).catch(error => {
            // Jika diblokir, biarkan ikon tetap Play (fa-play)
            console.log("Autoplay diblokir. Silakan klik ikon musik untuk memulai.");
        });

        // 4. Memicu Animasi Fade-In Konten
        document.querySelectorAll('.content-item').forEach(item => {
            const delay = parseInt(item.getAttribute('data-delay'));
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300 + delay); 
        });

    }, 800); 
});

// Event: Saat Tombol Kontrol Musik diklik
musicControl.addEventListener('click', toggleMusic);


// Event: Saat Halaman Dimuat
document.addEventListener('DOMContentLoaded', () => {
    loadGuestName();
    updateCountdown();
    
    // Logika Smooth Scrolling Navigasi Bawah
    document.querySelectorAll('#bottom-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Pindahkan class 'active' (coloring)
            document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('text-rose-gold-accent'));
            this.classList.add('text-rose-gold-accent');
            
            const targetId = this.getAttribute('href');
            // Gunakan scrollIntoView dengan behavior smooth
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
