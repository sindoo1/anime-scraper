const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://api.jikan.moe/v4';

app.use(cors());
app.use(express.json());

// إعداد هيدر مخصص لمنع حظر الطلبات من API الأنمي
const axiosConfig = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
};

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Witcher Anime API (Node.js) is Running!"
    });
});

// مسار البحث عن أنمي
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: "يرجى كتابة اسم الأنمي للبحث" });
        }
        const response = await axios.get(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=10`, axiosConfig);
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات", details: error.message });
    }
});

// مسار أحدث الأنميات
app.get('/api/top', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/top/anime?limit=15`, axiosConfig);
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
