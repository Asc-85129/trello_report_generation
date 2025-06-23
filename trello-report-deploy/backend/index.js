const express = require('express');
const cors = require('cors');
const { getTrelloData } = require('./trelloService');
const { updateGoogleSheet } = require('./sheetsService');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-report', async (req, res) => {
  const { boardId } = req.body;
  try {
    const cards = await getTrelloData(boardId);
    await updateGoogleSheet(cards);
    res.status(200).json({ message: 'Report generated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));