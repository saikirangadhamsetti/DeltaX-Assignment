import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Rating from "./rating/Rating";
import "./style.css";
export default function Top10() {
  const [top10, setTop10] = useState([]);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log("inside");
    const data = fetch("/api/getTop10Songs")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTop10((prev) => {
          return [...prev, data.data];
        });
      });
  }, []);

  console.log(top10, "top");
  if (top10.length == 0) {
    return "";
  }
  return (
    <div class="container">
      <div class="header">
        <div class="top10">Top 10 Songs</div>
        <Link to="addSong">
          <button class="addSong">+ Add Song</button>
        </Link>
      </div>

      <div class="table">
        <table>
          <tr>
            <th>ArtWork</th>
            <th>Song</th>
            <th>Date of Release</th>
            <th>Artist</th>
            <th>Rate</th>
          </tr>
          {top10[0].map((ele) => {
            const user_rating = ele.ratings.find(
              (ele) => ele.name === user
            ) || { rating: 0 };

            return (
              <tr>
                <td></td>
                <td>{ele.name}</td>
                <td>{ele.publishYear}</td>
                <td>{ele.artist}</td>
                <td>
                  <Rating
                    ratings={user_rating.rating}
                    user_id={user}
                    song_id={ele._id}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <button
        type="button"
        onClick={() => {
          setUser(null);
        }}
      >
        logout
      </button>
    </div>
  );
}
