// Variáveis Globais
let userLoggedIn = false;

// Função principal de Download
async function downloadVideo() {
    const videoUrl = document.getElementById('video-url').value.trim();
    const btn = document.querySelector('.download-btn');

    // 1. Validação do Link
    if (!videoUrl.includes("tiktok.com")) {
        alert("Por favor, cole um link válido do TikTok!");
        return;
    }

    // 2. Feedback visual
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
    btn.disabled = true;

    try {
        // 3. Chamada para a API usando seu link oficial da Vercel
        const response = await axios.post('https://ttiktok-save.vercel.app/api/download', { 
            url: videoUrl 
        });
        
        const videoData = response.data.data;

        if (videoData && (videoData.play || videoData.url)) {
            // Abre o link de vídeo (suporta .play ou .url dependendo da sua API)
            const finalUrl = videoData.play || videoData.url;
            window.open(finalUrl, '_blank');
            
            if (userLoggedIn) {
                saveToHistory(videoData.title || "Vídeo TikTok");
            }
            alert("Sucesso! O vídeo abrirá em uma nova aba.");
        } else {
            alert("Não foi possível encontrar o vídeo. Verifique se ele é público.");
        }
    } catch (error) {
        console.error("Erro no download:", error);
        alert("Erro ao conectar com ttiktok-save.vercel.app. Verifique se a pasta 'api' existe no seu GitHub.");
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
    if(modal) modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function login() {
    userLoggedIn = true;
    toggleModal('login-modal');
    const loginBtn = document.getElementById('login-btn');
    if(loginBtn) loginBtn.innerText = "Minha Conta";
    
    const historySection = document.getElementById('history');
    if(historySection) historySection.style.display = 'block';
}

function saveToHistory(title) {
    const list = document.getElementById('history-list');
    if(!list) return;
    
    const item = document.createElement('div');
    item.style = "background: rgba(255,255,255,0.1); padding: 10px; margin-top: 10px; border-radius: 8px; border-left: 4px solid #00f2ea;";
    item.innerHTML = `<strong>${title.substring(0, 30)}...</strong><br><small>${new Date().toLocaleDateString()}</small>`;
    list.prepend(item);
}
