const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/download', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'សូមបញ្ចូលតំណភ្ជាប់ (Link) TikTok!' });
  }

  try {
    const response = await axios.post('https://www.tikwm.com/api/', {
      url,
      hd: 1
    });

    if (response.data && response.data.data) {
      const d = response.data.data;
      return res.json({
        success: true,
        title: d.title || '',
        cover: d.cover || '',
        play: d.play || '',
        music: d.music || '',
        author: (d.author && d.author.nickname) || 'tiktok'
      });
    }

    return res.status(400).json({ error: 'មិនអាចទាញយកវីដេអូបានទេ សូមពិនិត្យតំណភ្ជាប់ឡើងវិញ។' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'មានបញ្ហាបច្ចេកទេសនៅលើ Server។' });
  }
});

app.listen(PORT, () => {
  console.log(`Zhea Gio TikTok server running on port ${PORT}`);
});
