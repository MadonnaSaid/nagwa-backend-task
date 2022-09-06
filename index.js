const wordList = [
  {
    id: 1,
    word: "slowly",
    pos: "adverb",
  },
  {
    id: 2,
    word: "ride",
    pos: "verb",
  },
  {
    id: 3,
    word: "bus",
    pos: "noun",
  },
  {
    id: 4,
    word: "commute",
    pos: "verb",
  },
  {
    id: 5,
    word: "emissions",
    pos: "noun",
  },
  {
    id: 6,
    word: "walk",
    pos: "verb",
  },
  {
    id: 7,
    word: "fast",
    pos: "adjective",
  },
  {
    id: 8,
    word: "car",
    pos: "noun",
  },
  {
    id: 9,
    word: "crowded",
    pos: "adjective",
  },
  {
    id: 10,
    word: "arrival",
    pos: "noun",
  },
  {
    id: 11,
    word: "emit",
    pos: "verb",
  },
  {
    id: 12,
    word: "independent",
    pos: "adjective",
  },
  {
    id: 13,
    word: "convenient",
    pos: "adjective",
  },
  {
    id: 14,
    word: "lane",
    pos: "noun",
  },
  {
    id: 15,
    word: "heavily",
    pos: "adverb",
  },
];
const scoresList = [
  20, 90, 100, 50, 10, 50, 60, 0, 60, 10, 90, 30, 100, 30, 20, 90, 40, 20, 10,
  60, 50, 100, 50, 80, 50, 80, 60, 80, 10, 40,
];

const express = require("express");
const app = express();
app.use(express.json());
// Add Access Control Allow Origin headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Functions to get 10 random words from wordList array and push in wordArray to store the random words in
var gen_nums = [];
function inArray(array, el) {
  for (var i = 0; i < array.length; i++) if (array[i] == el) return true;
  return false;
}
function getRandomWord(array) {
  var rand = array[Math.floor(Math.random() * array.length)];
  if (!inArray(gen_nums, rand)) {
    gen_nums.push(rand);
    return rand;
  }
  return getRandomWord(array);
}
wordArray = [];
function getWords(wordList) {
  for (var i = 0; i <= 9; i++) {
    wordArray.push(getRandomWord(wordList));
  }
  return wordArray;
}
app.get("/api/words", (req, res) => {
  res.send(getWords(wordList));
});

//get scores below the final score to calc the rank
let belowScores = [];
function getBelowScores(score) {
  for (let i = 0; i <= scoresList.length; i++) {
    if (score > scoresList[i]) {
      belowScores.push(scoresList[i]);
    }
  }
}
app.post("/api/scores"),
  (req, res) => {
    const score = req.body;
    const rank = (getBelowScores(score).length / scoresList.length) * 100;
    res.send(rank);
  };

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
