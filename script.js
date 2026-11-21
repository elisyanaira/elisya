/* CHATBOT ASISTEN RPL — berbasis kata kunci, berjalan sepenuhnya di browser */
(function () {
    var toggle = document.getElementById('chatToggle');
    var panel = document.getElementById('chatbot');
    var closeBtn = document.getElementById('chatClose');
    var messages = document.getElementById('chatMessages');
    var input = document.getElementById('chatInput');
    var sendBtn = document.getElementById('chatSend');
    var chips = document.getElementById('chatChips');
    var resetBtn = document.getElementById('chatReset');

    // Basis pengetahuan: tiap entri punya kata kunci dan jawaban.
    // Ubah isi jawaban sesuai data asli jurusan.
    var knowledge = [
        { keys: ['halo', 'hai', 'hi', 'selamat'],
          answer: 'Halo! Saya asisten Portal RPL SMKN 9 Medan. Tanyakan soal jadwal praktikum, modul, lab, PKL, atau uji LSP ya.' },
        { keys: ['jadwal', 'praktikum'],
          answer: 'Jadwal praktikum bisa dilihat di menu "Jadwal Praktikum" pada sidebar. Untuk jam pastinya, tanyakan ke guru pengampu mata pelajaran.' },
        { keys: ['modul', 'web', 'pemrograman', 'html', 'css', 'javascript'],
          answer: 'Modul Pemrograman Web ada di menu "Modul Pemrograman Web". Materinya mencakup HTML, CSS, JavaScript, dan layout responsif.' },
        { keys: ['lab', 'laboratorium'],
          answer: 'Daftar Lab RPL tersedia di menu "Daftar Lab RPL". Gunakan lab sesuai jadwal dan jaga kebersihan perangkat.' },
        { keys: ['pkl', 'prakerin', 'magang'],
          answer: 'Info PKL ada di menu "Info PKL & LSP". Siapkan CV dan portofolio sebelum mendaftar ke tempat PKL.' },
        { keys: ['lsp', 'uji', 'kompetensi', 'sertifikasi', 'asesmen'],
          answer: 'Uji Kompetensi LSP: siapkan portofolio web responsif kalian sebelum jadwal asesmen.' },
        { keys: ['kurikulum', 'mapel', 'pelajaran'],
          answer: 'Informasi kurikulum ada di menu "Kurikulum" pada bagian atas halaman.' },
        { keys: ['karya', 'proyek', 'project'],
          answer: 'Proyek terbaru kelas XII RPL ada di halaman utama: Aplikasi Inventaris QR, Portal CBT Online, E-Katalog Produk PKK, dan lainnya.' },
        { keys: ['harga', 'katalog', 'beli', 'rp'],
          answer: 'Produk di E-Katalog Produk PKK dijual dengan harga Rp 25.000.' },
        { keys: ['kontak', 'hubungi', 'alamat'],
          answer: 'Untuk kontak dan alamat sekolah, buka menu "Kontak" pada bagian atas halaman.' },
        { keys: ['terima kasih', 'makasih', 'thanks'],
          answer: 'Sama-sama! Semangat belajarnya ya 😊' }
    ];

    var fallback = 'Maaf, saya belum paham pertanyaan itu. Coba tanya tentang jadwal, modul, lab, PKL, LSP, kurikulum, atau kontak.';

    function addMessage(text, who) {
        var div = document.createElement('div');
        div.className = 'chat-msg ' + who;
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function reply(question) {
        var q = question.toLowerCase();
        for (var i = 0; i < knowledge.length; i++) {
            for (var j = 0; j < knowledge[i].keys.length; j++) {
                if (q.indexOf(knowledge[i].keys[j]) !== -1) {
                    return knowledge[i].answer;
                }
            }
        }
        return fallback;
    }

    function send(text) {
        text = text.trim();
        if (!text) return;
        addMessage(text, 'user');
        input.value = '';
        setTimeout(function () { addMessage(reply(text), 'bot'); }, 350);
    }

    function openChat() {
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        if (!messages.children.length) {
            addMessage('Halo! Saya asisten Portal RPL SMKN 9 Medan. Ada yang bisa saya bantu?', 'bot');
        }
        input.focus();
    }

    function closeChat() {
        panel.hidden = true;
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () { panel.hidden ? openChat() : closeChat(); });
    closeBtn.addEventListener('click', closeChat);
    resetBtn.addEventListener('click', function () {
        messages.innerHTML = '';
        addMessage('Halo! Saya asisten Portal RPL SMKN 9 Medan. Ada yang bisa saya bantu?', 'bot');
        input.focus();
    });
    sendBtn.addEventListener('click', function () { send(input.value); });
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(input.value); });
    chips.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') send(e.target.textContent);
    });
})();

/* MENU HAMBURGER (GARIS 3) UNTUK SMARTPHONE */
(function () {
    var btn = document.getElementById('hamburgerBtn');
    var header = document.querySelector('.header');
    if (!btn || !header) return;

    function setMenu(open) {
        header.classList.toggle('menu-open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
        btn.innerHTML = open ? '&#10005;' : '&#9776;';
    }

    btn.addEventListener('click', function () {
        setMenu(!header.classList.contains('menu-open'));
    });

    header.querySelectorAll('.nav-links a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 600) setMenu(false);
    });
})();
