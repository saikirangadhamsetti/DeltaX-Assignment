const express = require("express");
var bodyParser = require("body-parser");
const Artist = require("../Model/model");
const songs = require("../Model/songs");
const { reducer1, song_rating } = require("../src/consts/constant");
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

    const artist = await Artist.findById({ _id: publisher_id });
    const obj = { ...req.body, artistName: artist.name };
    console.log(artist.name);
    const song = new songs(obj);
    await song.save();
    artist.songs.push(song);
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
  const artist = await Artist.findById({ _id: song.artist });
  // console.log(artist);
  //   console.log(Object.keys(song).length, "l");
  let bool = false;
  console.log(song.ratings);

  bool = song.ratings.find((ele) => ele.user_id == user_id);

  console.log(bool, "bool");
  if (!bool) {
    try {
      song.ratings.push({
        user_id: user_id,
        rating: rating,
      });

      const avg_rating = reducer1(song.ratings);
      song.overallRating = avg_rating;
      // console.log(artist.songs);
      await song.save();
      const index = artist.songs.findIndex((ele) => {
        // console.log(ele);
        console.log(ele._id.toString() === song._id.toString());
        return ele._id.toString() === song._id.toString();
      });
      artist.songs[index] = song;
      await artist.save();

      res.status(200).json({ success: true, data: song });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  } else {
    const newArr = song.ratings.map((ele) => {
      if (ele.user_id == user_id) {
        ele.rating = rating;
        return ele;
      } else {
        return ele;
      }
    });

    console.log(newArr, "arrr");
    song.ratings = [...newArr];
    const data = await songs.findByIdAndUpdate(
      { _id: song_id },
      { ratings: newArr }
    );

    const avg_rating = reducer1(song.ratings);
    song.overallRating = avg_rating;

    await song.save();

    const index = artist.songs.findIndex((ele) => {
      // console.log(ele);
      // console.log(ele._id.toString() === song._id.toString());
      return ele._id.toString() === song._id.toString();
    });
    artist.songs[index] = song;

    await artist.save();

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

  res.status(200).json({ success: true, data: all.slice(0, 9).reverse() });
});

router.get("/getTop10Artist", jsonParser, async (req, res) => {
  const all = await Artist.find({});

  all.sort((ele, nxt_ele) => {
    console.log(song_rating(ele.songs));
    if (song_rating(ele.songs) < song_rating(nxt_ele.songs)) {
      return -1;
    }
    if (song_rating(ele.songs) > song_rating(nxt_ele.songs)) {
      return 1;
    }
    return 0;
  });
  res.status(200).json({ success: true, data: all.slice(0, 9).reverse() });
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
