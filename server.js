const express = require('express');
const app = express();

// 1. أهم سطر: تخطي صفحة تحذير Localtonet تلقائياً
app.use((req, res, next) => {
    res.setHeader('localtonet-skip-warning', 'true');
    // السماح لكل الأجهزة بالاتصال (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());

// 2. مسار افتراضي للتأكد أن السيرفر شغال (الرابط الرئيسي)
app.get('/', (req, res) => {
    res.send('<h1>Keek Revival Server is Running!</h1><p>Status: Active</p>');
});

// 3. مسار تجريبي للتطبيق (مثال للـ API اللي يطلبها كيك)
// عدل هذه المسارات حسب ما يطلبه تطبيق كيك 2.7.2 في الـ Logs
app.get('/api/v2/config', (req, res) => {
    res.json({
        status: "success",
        message: "Connected to Keek Revival"
    });
});

// 4. إعداد البورت (يقرأ من النظام أو يستخدم 3000)
const PORT = process.env.PORT || 3000;

// 5. التشغيل على 0.0.0.0 ضروري لـ Localtonet و الـ IP المحلي
app.listen(PORT, '0.0.0.0', () => {
    console.log(`-----------------------------------------`);
    console.log(`✅ Keek Server is LIVE on Port: ${PORT}`);
    console.log(`🔗 Local Link: http://localhost:${PORT}`);
    console.log(`📡 Use this in Smali: http://YOUR_IP_OR_TUNNEL_URL`);
    console.log(`-----------------------------------------`);
});