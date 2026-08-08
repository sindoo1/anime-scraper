const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. الصفحة الرئيسية (تظهر الأنميات فوراً)
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime?limit=15');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. مسار البحث (ضروري عشان مربع البحث بالواجهة يشتغل)
app.get('/search', async (req, res) => {
    try {
        const q = req.query.q || '';
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=10`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log('Server Running'));
