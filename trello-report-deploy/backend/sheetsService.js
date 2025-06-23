const { google } = require('googleapis');
const keys = require('./credentials.json');
require('dotenv').config();

async function updateGoogleSheet(cards) {
  const auth = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  const sheets = google.sheets({ version: 'v4', auth });

  const header = ['Card Name', 'List', 'Labels', 'Due Date', 'Members', 'Card URL'];
  const rows = cards.map(c => [c.name, c.list, c.labels, c.due, c.members, c.url]);
  rows.unshift(header);

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    resource: { values: rows },
  });
}

module.exports = { updateGoogleSheet };