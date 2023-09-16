// Class untuk Pendaftar
class Pendaftar {
    constructor(nama, umur, uangSangu) {
        this.nama = nama;
        this.umur = umur;
        this.uangSangu = uangSangu;
    }
}

// Array untuk menyimpan data pendaftar
const pendaftarList = [];

// Event listener untuk form submission
document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const umur = parseInt(document.getElementById("umur").value);
    const uangSangu = parseInt(document.getElementById("uangSangu").value);

    // Validasi kriteria
    if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
        alert("Data tidak memenuhi kriteria.");
    } else {
        // Tambahkan data pendaftar baru ke array
        const pendaftarBaru = new Pendaftar(nama, umur, uangSangu);
        pendaftarList.push(pendaftarBaru);

        // Reset form
        document.getElementById("registrationForm").reset();

        // Tampilkan data pendaftar di tabel
        displayPendaftar();
    }
});

// Fungsi untuk menampilkan data pendaftar di tabel
function displayPendaftar() {
    const tableBody = document.querySelector("#pendaftarTable tbody");
    tableBody.innerHTML = "";

    pendaftarList.forEach((pendaftar) => {
        const row = tableBody.insertRow();
        const cellNama = row.insertCell(0);
        const cellUmur = row.insertCell(1);
        const cellUangSangu = row.insertCell(2);

        cellNama.textContent = pendaftar.nama;
        cellUmur.textContent = pendaftar.umur;
        cellUangSangu.textContent = `Rp. ${pendaftar.uangSangu.toLocaleString()}`;
    });

    // Hitung rata-rata umur dan uang sangu
    const totalUmur = pendaftarList.reduce((total, pendaftar) => total + pendaftar.umur, 0);
    const totalUangSangu = pendaftarList.reduce((total, pendaftar) => total + pendaftar.uangSangu, 0);
    const rataRataUmur = totalUmur / pendaftarList.length;
    const rataRataUangSangu = totalUangSangu / pendaftarList.length;

    // Tampilkan resume
    const resumeDiv = document.getElementById("resume");
    resumeDiv.innerHTML = `Rata-rata pendaftar memiliki uang sangu sebesar Rp. ${rataRataUangSangu.toLocaleString()} dengan rata-rata umur ${rataRataUmur} tahun.`;
}

// Fungsi untuk mengganti tab aktif
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Set default tab saat halaman dimuat
document.getElementsByClassName("tablinks")[0].click();
