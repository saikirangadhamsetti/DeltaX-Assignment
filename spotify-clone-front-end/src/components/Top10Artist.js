import React, { useEffect, useState } from "react";

export default function Top10Artist() {
  const [artist, setArtist] = useState([]);

  useEffect(() => {
    const data = fetch("/api/getTop10Artist")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setArtist((prev) => {
          return [...prev, data.data];
        });
      });
  }, []);
  console.log(artist[0]);
  if (artist.length === 0) {
    return "";
  }
  return (
    <div>
      <div class="top10">Top 10 Artists</div>
      <div class="table">
        <table>
          <tr>
            <th>Artist</th>

            <th>Date of Birth</th>
            <th>Songs</th>
          </tr>
          {artist[0].map((ele) => {
            console.log(ele, "saa");
            return (
              <tr>
                <td>{ele.name}</td>
                <td>{ele.Dob}</td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  {ele.songs.map((songs) => (
                    <div style={{ display: "flex" }}>{songs.name},</div>
                  ))}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}
