import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./style.css";
export default function Rating({ ratings, user_id, song_id }) {
  const [select, setSelect] = useState(0);
  console.log(user_id);
  console.log(select);
  const ratingChanged = (newRating) => {
    console.log("inside");
    setSelect(newRating);
    console.log(newRating);

    fetch("/api/updateRatings", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        song_id: song_id,
        user_id: user_id,
        rating: newRating,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    onchange = (e) => {
      // return select;
    };
  };
  const rating = [
    { value: "5", id: "5" },
    { value: "4", id: "4" },
    { value: "3", id: "3" },
    { value: "2", id: "2" },
    { value: "1", id: "1" },
  ];

  return (
    <div class="rating">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
        value={ratings}
      />
    </div>
  );
}
