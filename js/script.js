// EDIT HERE: Definir variáveis caso queira proteção por senha (modify as needed)
// const SENHA = "123";

function initSite() {
    checkPassword(); // Checa senha (se definida)
    updateCountdown(); // Inicia a contagem regressiva
    document.getElementById('openBtn').addEventListener('click', openPresent);
    document.getElementById('downloadVoucher').addEventListener('click', printVoucher);
    document.getElementById('downloadVoucher2').addEventListener('click', printVoucher2);
    document.getElementById('celebrateBtn').addEventListener('click', () => spawnConfetti(100));

    // Easter egg: contar 3 cliques no coração para mostrar mensagem secreta
    let heart = document.getElementById('heart');
    let clickCount = 0;
    heart.addEventListener('click', function () {
        clickCount++;
        if (clickCount === 3) {
            document.getElementById('secretMsg').classList.remove('d-none');
        }
    });

    // Controles de áudio: tocar/pausar
    document.getElementById('playMusic').addEventListener('click', function () {
        let audio = document.getElementById('audioPlayer');
        audio.load(); // Carrega o áudio
        audio.play().then(() => {
            this.classList.add('d-none');
            document.getElementById('pauseMusic').classList.remove('d-none');
        }).catch(error => {
            console.log('Erro ao tocar música:', error);
            alert('Não foi possível tocar a música. Verifique se o arquivo existe e se o navegador permite reprodução de áudio.');
        });
    });
    document.getElementById('pauseMusic').addEventListener('click', function () {
        let audio = document.getElementById('audioPlayer');
        audio.pause();
        this.classList.add('d-none');
        document.getElementById('playMusic').classList.remove('d-none');
    });

    // setupTimeline(); // não necessário, mas pode inicializar elementos dinamicamente
    // setupGallery();  // não necessário, mas pode inicializar a galeria dinamicamente


}

// Revela as seções com animação suave e faz scroll até a timeline
function openPresent() {
    const sections = ['timeline', 'gallery', 'card', 'vouchers', 'surprise'];
    sections.forEach(id => {
        let el = document.getElementById(id);
        if (el) {
            el.style.display = 'block';
            el.classList.add('fade-in');
        }
    });
    document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });

    // Mostrar mensagem final após abrir o presente
    setTimeout(() => {
        document.getElementById('finalMessage').style.display = 'block';
        document.getElementById('finalMessage').classList.add('fade-in');
    }, 2000);
}

// Função simples de confete: gera 'n' elementos coloridos caindo
function spawnConfetti(n) {
    const container = document.getElementById('confetti-container');
    for (let i = 0; i < n; i++) {
        const confetto = document.createElement('div');
        confetto.className = 'confetti';
        // Posiciona horizontalmente de forma aleatória
        confetto.style.left = (Math.random() * 100) + '%';
        // Cores aleatórias para o confete
        const colors = ['#f8c5c5', '#f4a6a6', '#b8808d', '#c88fab'];
        confetto.style.background = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(confetto);
        // Remove confete após animação
        setTimeout(() => container.removeChild(confetto), 4000);
    }
}

// Placeholder para duplicar eventos na timeline (EDIT HERE: adicionar novo evento duplicando bloco HTML)
// function setupTimeline() {}

// Placeholder para inicializar galeria (EDIT HERE: adicionar imagens à galeria via JS se necessário)
// function setupGallery() {}

function printVoucher() {
    window.print();
}

function printVoucher2() {
    window.print();
}

// Função para atualizar a contagem regressiva
function updateCountdown() {
    const targetDate = new Date('2024-11-20T00:00:00'); // Próximo aniversário: 20 de novembro de 2024
    const now = new Date();
    const diff = targetDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('countdown').textContent = `Faltam ${days} dias, ${hours} horas, ${minutes} minutos e ${seconds} segundos para o nosso próximo aniversário!`;
    } else {
        document.getElementById('countdown').textContent = 'Feliz aniversário! 🎉';
    }

    // Atualizar a cada segundo
    setTimeout(updateCountdown, 1000);
}

// Prompt de senha simples para proteção (client-side)
function checkPassword() {
    const SENHA = "182028"; // EDIT HERE: definir senha (deixe vazio para remover proteção)
    if (SENHA) {
        let user = prompt("Insira a senha para acessar o presente:");
        if (user !== SENHA) {
            document.getElementById('password').innerHTML = "<p class='text-center text-danger'>Acesso negado: senha incorreta.</p>";
        }
    }
}

window.onload = initSite;