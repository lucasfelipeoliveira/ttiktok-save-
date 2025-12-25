export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas POST é permitido' });
  }

  const { url } = req.body;

  try {
    // Chamada para uma API que processa TikTok (exemplo TikWM)
    const apiResponse = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = await apiResponse.json();

    if (data.data) {
      // Retorna os dados no formato que o seu script.js espera
      return res.status(200).json({
        data: {
          play: data.data.play, // Link do vídeo sem marca d'água
          title: data.data.title
        }
      });
    } else {
      return res.status(400).json({ msg: "Vídeo não encontrado ou privado." });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Erro no servidor da API." });
  }
}
