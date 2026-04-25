export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL requerida' });
    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        const shortUrl = await response.text();
        if (shortUrl.startsWith('http')) {
            return res.status(200).json({ shortUrl });
        }
        return res.status(500).json({ error: 'Error al acortar' });
    } catch (err) {
        return res.status(500).json({ error: 'Error de conexión' });
    }
}
