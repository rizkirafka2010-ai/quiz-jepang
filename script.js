const feedback = document.getElementById("feedback")
const soal = [
    {
        pertanyaan: "「これは なんですか。」",
        jawaban: [
            "A. Ini apa?",
            "B. Siapa ini?",
            "C. Di mana ini?",
            "D. Apa kabar?"
        ],
        benar: 0
    },

    {
        pertanyaan: "「わたしは がくせいです。」",
        jawaban: [
            "A. Saya guru.",
            "B. Saya siswa.",
            "C. Saya dokter.",
            "D. Saya orang Jepang."
        ],
        benar: 1
    },

    {
        pertanyaan: "「ありがとう」 artinya adalah...",
        jawaban: [
            "A. Maaf",
            "B. Permisi",
            "C. Terima kasih",
            "D. Selamat pagi"
        ],
        benar: 2
    },

    {
        pertanyaan: "Bahasa Jepang dari 'buku' adalah...",
        jawaban: [
            "A. いす",
            "B. ほん",
            "C. つくえ",
            "D. かばん"
        ],
        benar: 1
    }
];


let nomorSoal = 0;
let skor = 0;
let sudahMenjawab = false;


// mengambil elemen HTML
const pertanyaan = document.querySelector(".question h2");
const nomor = document.querySelector(".question p");
const tombolJawaban = document.querySelectorAll(".answer");
const tombolBerikutnya = document.querySelector(".next");


// menampilkan soal
function tampilkanSoal() {

    sudahMenjawab = false;
    feedback.textContent = "";
    feedback.className = "";
    pertanyaan.textContent = soal[nomorSoal].pertanyaan;

    nomor.textContent = "Soal " + (nomorSoal + 1);

    tombolJawaban.forEach(function(button, index) {

        button.textContent = soal[nomorSoal].jawaban[index];

        button.style.backgroundColor = "";
        button.style.color = "";

        button.classList.remove("benar");
        button.classList.remove("salah");

        button.disabled = false;
    });

    tombolBerikutnya.disabled = true;
}


// ketika jawaban diklik
tombolJawaban.forEach(function(button, index) {

    button.addEventListener("click", function() {

        if (sudahMenjawab) {
            return;
        }

        sudahMenjawab = true;

        if (index === soal[nomorSoal].benar) {

            // jawaban benar
            button.style.backgroundColor = "green";
            button.style.color = "white";

            button.classList.add("benar");

            skor += 100;

            feedback.textContent = "🎉 BENAR! +100 POIN";
            feedback.className = "feedback-benar";

        } else {

            // jawaban salah
            button.style.backgroundColor = "red";
            button.style.color = "white";

            button.classList.add("salah");

            // tunjukkan jawaban yang benar
            tombolJawaban[soal[nomorSoal].benar].style.backgroundColor = "green";
            tombolJawaban[soal[nomorSoal].benar].style.color = "white";

            feedback.textContent = "❌ SALAH!";
            feedback.className = "feedback-salah";
        }

        // semua tombol jawaban dikunci
        tombolJawaban.forEach(function(button) {
            button.disabled = true;
        });

        // tombol berikutnya diaktifkan
        tombolBerikutnya.disabled = false;
    });

});


// tombol soal berikutnya
tombolBerikutnya.addEventListener("click", function() {

    nomorSoal++;

    if (nomorSoal < soal.length) {

        tampilkanSoal();

    } else {

        pertanyaan.textContent = "🎉 Quiz Selesai!";

        nomor.textContent = "Hasil";

        tombolJawaban.forEach(function(button) {
            button.style.display = "none";
        });

        tombolBerikutnya.style.display = "none";

        alert("Quiz selesai! Skor kamu: " + skor);
    }

});


// mulai quiz
tampilkanSoal();