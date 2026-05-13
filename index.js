import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const words = {
  Rock: {
    adj: ["Electric", "Wild", "Burning", "Broken", "Midnight"],
    noun: ["Wolves", "Thunder", "Empire", "Saints", "Riot"],
  },
  Indie: {
    adj: ["Velvet", "Neon", "Golden", "Quiet", "Silver"],
    noun: ["Echo", "Dreams", "Cinema", "Youth", "Clouds"],
  },
  Metal: {
    adj: ["Dark", "Savage", "Iron", "Crimson", "Infernal"],
    noun: ["Skull", "Storm", "Void", "Reaper", "Fury"],
  },
};

app.get("/", (req, res) => {
  res.render("index.ejs", {
    bandName: null,
  });
});

app.post("/submit", (req, res) => {
  const genre = req.body.genre || "Rock";

  const genreWords = words[genre];

  const randomAdj =
    genreWords.adj[Math.floor(Math.random() * genreWords.adj.length)];

  const randomNoun =
    genreWords.noun[Math.floor(Math.random() * genreWords.noun.length)];

  const bandName = `${randomAdj} ${randomNoun}`;

  res.render("index.ejs", {
    bandName,
    genre,
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});