const express = require('express');
const axios = require('axios');
const cors = require('cors'); // إضافة مكتبة CORS
const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://api.jikan.moe/v4';

app.use(cors()); // السماح بالاتصال من أي تطبيق أو متصفح
app.use(express.json());

// الصفحة الرئيسية
app.get('/', (req, res) => {
    res.json({
        status: "success",
        message: "Witcher Anime API (Node.js) is Running!"
    });
});

// مسار البحث
app.get('/api/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: "يرجى كتابة اسم الأنمي للبحث" });
        }
        const response = await axios.get(`${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=10`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات" });
    }
});

// مسار أحدث الأنميات
app.get('/api/top', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/top/anime?limit=15`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
