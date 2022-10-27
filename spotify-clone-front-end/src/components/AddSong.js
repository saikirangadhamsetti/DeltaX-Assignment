import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export function Component({ first, inputType, id }) {
  return (
    <div className="addSongInput">
      <div style={{ width: "100px" }}>{first}</div>
      {inputType == "textfield" ? (
        <textarea class="insideInput" id={id}></textarea>
      ) : (
        <input type={inputType} class="insideInput" id={id}></input>
      )}
    </div>
  );
}
export default function AddSong() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [state, setState] = useState({});
  const [artist, setArtist] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  const postSong = (e) => {
    let data = "";
    console.log("inside");
    e.preventDefault();
    for (let i = 0; i <= 3; i++) {
      if (i === 3) {
        data = artist[0].find((ele) => ele.name === e.target[i].value);

        setState((prev) => {
          return { ...prev, [e.target[i].id]: data._id };
        });
      } else {
        setState((prev) => {
          return { ...prev, [e.target[i].id]: e.target[i].value };
        });
      }

      // console.log(e.target[i].value);
    }
    fetch("/api/addSong", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[0].value,
        artist: data._id,
        id: data._id,
        publishYear: e.target[1].value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("inside");
  };
  const postArtist = (e) => {
    e.preventDefault();
    console.log(e.target);
    for (let i = 0; i <= 3; i++) {
      console.log(e.target[i].id);
      const value = e.target[i].value;

      setState((prev) => {
        return { ...prev, [e.target[i].id]: value };
      });
    }

    fetch("/api/addArtist", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: e.target[0].value, Dob: e.target[1].value }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    console.log("inside");
    const data = fetch("/api/getArtist")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArtist((prev) => {
          return [data.data];
        });

        // setTop10((prev) => {
        //   return [...prev, data.data];
        // });
      });
  }, [state]);
  if (artist.length == 0) {
    return "";
  }
  return (
    <div>
      <div class="top10">Adding a new Song</div>
      <form onSubmit={postSong}>
        <Component first={"Song Name"} inputType={"name"} id={"songName"} />
        <Component
          first={"Date Released"}
          inputType={"date"}
          id={"DateReleases"}
        />
        <Component first={"Art Work"} inputType={"file"} id={"ArtWork"} />
        <div class="addSongInput">
          <div style={{ width: "100px" }}>Artist</div>
          <div style={{ marginLeft: "50px" }}>
            <input list="artists" name="artist" id="artist" />
          </div>

          <datalist id="artists">
            {artist[0].map((ele) => {
              return (
                <option
                  value={ele.name}
                  id={ele._id}
                  onClick={(e) => {
                    console.log(e);
                  }}
                ></option>
              );
            })}
            {/* <option value="Edge" />
            <option value="Firefox" />
            <option value="Chrome" />
            <option value="Opera" />
            <option value="Safari0" /> */}
          </datalist>
          <button type="button" onClick={openModal}>
            + Add Artist
          </button>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="button">Cancel</button>
          <button type="submit">Save</button>
        </div>
      </form>
      <div>
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal}>close</button>
          <form onSubmit={postArtist}>
            <Component
              first={"Artist Name"}
              inputType={"name"}
              id={"Artistname"}
            />
            <Component first={"Date of Birth"} inputType={"date"} id={"DOB"} />
            <Component first={"Bio"} inputType={"textfield"} id={"Bio"} />

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link to="Top10">
                <button>Cancel</button>
              </Link>
              <button type="submit">Save</button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
