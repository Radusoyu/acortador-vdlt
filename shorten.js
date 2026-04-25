const https = require('https');

module.exports = function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: 'URL requerida' });
    
    const encoded = encodeURIComponent(url);
    https.get(`https://tinyurl.com/api-create.php?url=${encoded}`, (response) => {
        let data = '';
        response.on('data', chunk => data += chunk);
        response.on('end', () => {
            res.status(200).json({ shortUrl: data.trim() });
        });
    }).on('error', (err) => {
        res.status(500).json({ error: err.message });
    });
};
