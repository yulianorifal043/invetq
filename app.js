// =========================================================
// 1. KODE TOGGLE DARK/LIGHT MODE
// =========================================================

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');

// Fungsi untuk memperbarui ikon
function updateIcons(isDark) {
    if (isDark) {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

// Cek local storage saat halaman dimuat
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark');
    updateIcons(true);
} else {
    htmlElement.classList.remove('dark');
    updateIcons(false);
}

// Fungsi Toggle saat tombol diklik
themeToggle.addEventListener('click', () => {
    const isDark = htmlElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateIcons(isDark);
});


// =========================================================
// 2. KODE FLOATING CUBE SIMULASI 3D
// =========================================================

const features = [
    { title: "Peta Interaktif", desc: "Navigasi Google Maps langsung di undangan.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Buku Tamu Real-Time", desc: "Kumpulkan ucapan dan RSVP instan.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { title: "Galeri Elegan", desc: "Tampilkan foto & video pre-wedding premium.", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-1-5h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { title: "Amplop Digital", desc: "Terima kado/transfer bank dengan mudah dan aman.", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" }
];

let currentFeature = 0;
const cubeElement = document.getElementById('cube-container').querySelector('.floating-cube');
const cubeTitle = document.getElementById('cube-title');
const cubeDesc = document.getElementById('cube-desc');
const cubeIconPath = document.getElementById('cube-icon');

function changeCubeContent() {
    currentFeature = (currentFeature + 1) % features.length;
    const nextFeature = features[currentFeature];
    
    cubeElement.classList.add('opacity-0', 'scale-95');

    setTimeout(() => {
        cubeTitle.textContent = nextFeature.title;
        cubeDesc.textContent = nextFeature.desc;
        cubeIconPath.setAttribute('d', nextFeature.icon);

        cubeElement.classList.remove('opacity-0', 'scale-95');
    }, 300); 
}

// Interaksi Otomatis
let intervalId = setInterval(changeCubeContent, 4000);

// Stop putaran otomatis saat mouse di atas elemen
cubeElement.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
    cubeElement.style.transform = 'scale(1.05) rotateY(15deg)';
});

// Lanjutkan putaran otomatis saat mouse meninggalkan elemen
cubeElement.addEventListener('mouseleave', () => {
    cubeElement.style.transform = 'scale(1) rotateY(0deg)';
    clearInterval(intervalId); 
    intervalId = setInterval(changeCubeContent, 4000);
});

// Inisialisasi konten awal
window.onload = () => {
    cubeTitle.textContent = features[0].title;
    cubeDesc.textContent = features[0].desc;
    cubeIconPath.setAttribute('d', features[0].icon);
};