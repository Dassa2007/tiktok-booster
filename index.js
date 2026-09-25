const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Frontend එක පෙන්නන්න public ෆෝල්ඩර් එක පාවිච්චි කරයි
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint - Views හෝ Likes දාන්න ඉල්ලීම ලැබුණු විට ක්‍රියාත්මක වේ
app.api('/api/boost', async (req, res) => {
    const { link, type } = req.body;

    if (!link) {
        return res.json({ success: false, message: 'කරුණාකර නිවැරදි ලින්ක් එකක් දෙන්න!' });
    }

    try {
        // මෙතැනදී TikTok API එකට හෝ බෝට් සිස්ටම් එකට ඉල්ලීම යැවිය යුතුය.
        // දැනට ප්‍රොජෙක්ට් එක වැඩ කරන බව පෙන්වීමට සාර්ථක ප්‍රතිචාරයක් යවමු.
        console.log(`Received ${type} request for link: ${link}`);
        
        // උදාහරණයක් ලෙස තත්පර 2 කින් සාර්ථකයි කියලා යවමු
        setTimeout(() => {
            // මෙතැනදී ඇත්තටම views/likes යවන backend කෝඩ් එක ලියන්න පුළුවන්
        }, 2000);

        res.json({ 
            success: true, 
            message: `සාර්ථකයි! ඔබේ වීඩියෝවට ${type} යැවීමේ ක්‍රියාවලිය ආරම්භ විය.` 
        });

    } catch (error) {
        res.json({ success: false, message: 'දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
