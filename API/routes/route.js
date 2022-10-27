const express = require("express");
var bodyParser = require("body-parser");
const Artist = require("../Model/model");
const songs = require("../Model/songs");
const { reducer1 } = require("../src/consts/constant");
const user = require("../Model/user");
var jsonParser = bodyParser.json();
const router = express.Router();
//Post Method
router.post("/addArtist", jsonParser, async (req, res) => {
  try {
    console.log(req.body);
    const artist = new Artist(req.body);
    await artist.save();
    res.status(201).json({ success: true, data: artist });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/addSong", jsonParser, async (req, res) => {
  try {
    const publisher_id = req.body.id;

    const song = new songs(req.body);
    await song.save();
    const artist = await Artist.findById({ _id: publisher_id });
    artist.songs.push({ songs: song });
    await artist.save();
    res.status(200).json({ success: true, data: song });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get("/getSongs", jsonParser, async (req, res) => {
  try {
    const all = await songs.find({});
    res.status(200).json({ success: true, data: all });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
router.get("/getArtist", jsonParser, async (req, res) => {
  try {
    const all = await Artist.find({});
    res.status(200).json({ success: true, data: all });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
router.post("/updateRatings", jsonParser, async (req, res) => {
  const song_id = req.body.song_id;
  const user_id = req.body.user_id;
  const rating = req.body.rating;
  const song = await songs.findById({ _id: song_id });
  //   console.log(Object.keys(song).length, "l");
  let bool = false;

  bool = song.ratings.find((ele) => ele.name == user_id);

  console.log(bool);
  if (!bool) {
    // const song = await songs.findById({ _id: song_id });
    try {
      song.ratings.push({
        name: user_id,
        rating: rating,
      });
      await song.save();
      res.status(200).json({ success: true, data: song });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  } else {
    // console.log("insideee");
    // const song = await songs.findById({ _id: song_id });
    console.log(song.ratings);
    song.ratings.map(async (ele) => {
      console.log(ele.name, "jjj");
      if (ele.name == user_id) {
        ele.rating = rating;
      }
    });

    await song.save();

    res.status(200).json({ success: true, data: song });
  }
});

router.get("/getTop10Songs", jsonParser, async (req, res) => {
  const all = await songs.find({});
  all.sort((ele, nxt_ele) => {
    console.log(ele.ratings);
    if (reducer1(ele.ratings) < reducer1(nxt_ele.ratings)) {
      return -1;
    }
    if (reducer1(ele.ratings) > reducer1(nxt_ele.ratings)) {
      return 1;
    }
    return 0;

    // const avg_rating = count / ele.ratings.length;
  });
  res.status(200).json({ success: true, data: all.reverse() });
});

router.post("/signUp", jsonParser, async (req, res) => {
  try {
    const User = new user(req.body);
    await User.save();
    res.status(200).json({ success: true, data: User });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/login", jsonParser, async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const User = user.findOne({ username: username }, (err, data) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
      if (!data) {
        return res
          .status(200)
          .json({ success: false, message: "username does not exist" });
      }
      if (data.password === password) {
        return res.status(200).json({ success: true, message: data });
      } else {
        return res
          .status(200)
          .json({ success: false, message: "password is wrong" });
      }
      res.status(200).json({ success: true, data: data });
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});
module.exports = router;
