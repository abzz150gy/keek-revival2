const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.setHeader('localtonet-skip-warning', 'true');
    res.setHeader('Bypass-Tunnel-Reminder', 'true'); // زيادة احتياط
    next();
});

// مسار الكونفيج (أهم مسار يطلبه التطبيق أول ما يفتح)
app.get('/api/v2/config', (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "api_version": "2.0",
            "maintenance_mode": false,
            "latest_version": "2.7.2"
        }
    });
});

// مسار التحقق من النظام
app.get('/system/status', (req, res) => {
    res.json({ "status": "ok" });
});

// الرد الافتراضي لأي مسار آخر عشان ما يعطي 404
app.use((req, res) => {
    res.status(200).json({ "status": "success", "message": "Keek Server Active" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Keek Server Ready on Port ${PORT}`);
});