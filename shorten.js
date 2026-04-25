export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'URL requerida' });
    
    try {
        const response = await fetch(`https://cleanuri.com/api/v1/shorten`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `url=${encodeURIComponent(url)}`
        });
        const text = await response.text();
        return res.status(200).json({ shortUrl: text, debug: text });
    } catch (err) {
        return res.status(200).json({ error: err.message, stack: err.stack });
    }
}
