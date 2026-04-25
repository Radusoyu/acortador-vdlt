export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    const url = req.query.url;
    
    if (!url) {
        return res.status(400).json({ error: 'URL requerida' });
    }

    const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
    const shortUrl = await response.text();
    
    return res.status(200).json({ shortUrl: shortUrl.trim() });
}
