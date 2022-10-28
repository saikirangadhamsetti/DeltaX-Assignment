import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Rating from "./rating/Rating";
import "./style.css";
import Top10Artist from "./Top10Artist";
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
      <div  style={{display:"flex",justifyContent:'flex-end'}}>
      <button 
        type="button"
        onClick={() => {
          setUser(null);
        }}
       style={{width:"100px",marginTop:'10px',marginRight:'10px'}}
      >
        logout
      </button>
      </div>

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
            console.log(ele.coverImage);
            const user_rating = ele.ratings.find(
              (ele) => ele.user_id === user
            ) || { rating: 0 };

            return (
              <tr>
                <td>
                  <img style={{width:"100px",height:"100px"}} src={ele.coverImage} alt="no image"></img>
                </td>
                <td>{ele.name}</td>
                <td>{ele.publishYear}</td>
                <td>{ele.artistName}</td>

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
            <Top10Artist />
    </div>
  );
}
