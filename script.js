// Variáveis Globais
let userLoggedIn = false;

// Função principal de Download
async function downloadVideo() {
    const videoUrl = document.getElementById('video-url').value;
    const btn = document.querySelector('.download-btn');

    // 1. Validação do Link
    if (!videoUrl.includes("tiktok.com")) {
        alert("Por favor, cole um link válido do TikTok!");
        return;
    }

    // 2. Feedback Visual
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
    btn.disabled = true;

    try {
        // 3. Chamada para a sua API interna na Vercel (resolve o erro de conexão)
        const response = await axios.post('/api/download', { url: videoUrl });
        const videoData = response.data.data;

        if (videoData && videoData.play) {
            // 4. Abre o vídeo em nova aba para o usuário baixar
            window.open(videoData.play, '_blank');
            
            // 5. Salva no Histórico se estiver logado
            if (userLoggedIn) {
                saveToHistory(videoData.title || "Vídeo TikTok");
            }
            
            alert("Sucesso! O vídeo abrirá em uma nova aba.");
        } else {
            alert("Não foi possível encontrar o vídeo. Verifique se ele é público.");
        }
    } catch (error) {
        console.error(error);
        alert("Erro no servidor. Certifique-se de que configurou a API_KEY na Vercel.");
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Analisar Vídeo';
    }
}

// Funções de Interface
function clearInput() {
    document.getElementById('video-url').value = "";
}

function toggleModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function login() {
    const email = document.querySelector('#login-modal input[type="email"]').value;
    if (email) {
        userLoggedIn = true;
        toggleModal('login-modal');
        document.getElementById('login-btn').innerHTML = `<i class="fa-solid fa-circle-user"></i> ${email.split('@')[0]}`;
        document.getElementById('history').style.display = 'block';
    } else {
        alert("Digite um e-mail para entrar.");
    }
}

// Histórico com LocalStorage (não some ao atualizar a página)
function saveToHistory(title) {
    const list = document.getElementById('history-list');
    const item = document.createElement('div');
    
    // Estilo rápido para o item do histórico
    item.style = "background: rgba(255,255,255,0.1); padding: 10px;