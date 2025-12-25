async function downloadVideo() {
    const videoUrl = document.getElementById('video-url').value;
    const btn = document.querySelector('.download-btn');

    // 1. Validação do Link
    if (!videoUrl.includes("tiktok.com")) {
        alert("Por favor, cole um link válido do TikTok!");
        return;
    }

    // 2. Feedback Visual no Botão
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';
    btn.disabled = true;

    try {
        // 3. Chamada Axios com o SEU link específico
        const response = await axios.post('https://ttiktok-save.vercel.app/api/download', { 
            url: videoUrl 
        });

        // O Axios recebe a resposta em response.data
        const videoData = response.data.data;

        if (videoData && videoData.play) {
            // 4. Abre o vídeo em nova aba
            window.open(videoData.play, '_blank');
            
            // 5. Salva no Histórico se estiver logado
            if (typeof userLoggedIn !== 'undefined' && userLoggedIn) {
                saveToHistory(videoData.title || "Vídeo TikTok");
            }
            
            alert("Sucesso! O vídeo abrirá em uma nova aba.");
        } else {
            alert("Não foi possível encontrar o vídeo. Verifique se ele é público.");
        }
    } catch (error) {
        console.error("Erro na API:", error);
        alert("Erro ao conectar com ttiktok-save.vercel.app. Verifique se a API está configurada corretamente.");
    } finally {
        // Restaura o botão original
        btn.disabled = false;
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Analisar Vídeo';
    }
}
