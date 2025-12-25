export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

    const { url } = req.body;
    const API_KEY = process.env.API_KEY; // A Vercel vai ler a chave que você configurou

    try {
        const response = await fetch('https://tiktok-video-no-watermark2.p.rapidapi.com/', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com'
            },
            body: new URLSearchParams({ url, hd: '1' })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o vídeo' });
    }
}
