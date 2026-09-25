const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend එක පෙන්නන්න
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint (app.api වෙනුවට app.post පාවිච්චි කළ යුතුය)
app.post('/api/boost', async (req, res) => {
    const { link, type } = req.body;

    if (!link) {
        return res.json({ success: false, message: 'කරුණාකර නිවැරදි ලින්ක් එකක් දෙන්න!' });
    }

    try {
        console.log(`Received ${type} request for link: ${link}`);
        
        res.json({ 
            success: true, 
            message: `සාර්ථකයි! ඔබේ වීඩියෝවට ${type} යැවීමේ ක්‍රියාවලිය ආරම්භ විය.` 
        });

    } catch (error) {
        res.json({ success: false, message: 'දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.' });
    }
});

// Vercel එකට වැඩ කිරීමට app එක export කිරීම අවශ්‍ය වේ
module.exports = app;

// Local test කිරීම සඳහා පමණි
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
