const axios = require('axios');
require('dotenv').config();
const { TRELLO_API_KEY, TRELLO_TOKEN } = process.env;

async function getBoardLists(boardId) {
  const url = `https://api.trello.com/1/boards/${boardId}/lists?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
  const response = await axios.get(url);
  const lists = {};
  response.data.forEach(list => lists[list.id] = list.name);
  return lists;
}

async function getBoardMembers(boardId) {
  const url = `https://api.trello.com/1/boards/${boardId}/members?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
  const response = await axios.get(url);
  const members = {};
  response.data.forEach(member => members[member.id] = member.fullName);
  return members;
}

async function getTrelloData(boardId) {
  const cardsUrl = `https://api.trello.com/1/boards/${boardId}/cards?key=${TRELLO_API_KEY}&token=${TRELLO_TOKEN}`;
  const cardsRes = await axios.get(cardsUrl);
  const cards = cardsRes.data;

  const listMap = await getBoardLists(boardId);
  const memberMap = await getBoardMembers(boardId);

  return cards.map(card => ({
    name: card.name,
    list: listMap[card.idList] || 'Unknown List',
    due: card.due || 'N/A',
    labels: card.labels.map(l => l.name).join(', '),
    members: card.idMembers.map(id => memberMap[id] || id).join(', '),
    url: card.url
  }));
}

module.exports = { getTrelloData };