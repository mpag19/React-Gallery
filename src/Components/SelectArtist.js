import React from "react";

const selectArtist = (props) => {
  const handleChange = (event) => {
    console.log(event.target.value);
    props.onSelect(event.target.value);
  };

  const getLoadingView = () => {
    return console.log("Esta cargando");
  };

  const selectArtist = () => {
    return (
      <select onChange={handleChange}>
        {props.artists.map((artist, key) => {
          return (
            <option key={key} value={artist.id}>
              {artist.artistName}
            </option>
          );
        })}
      </select>
    );
  };
  return (
    <div className="select-container">
      {props.artists ? selectArtist() : getLoadingView()}
    </div>
  );
};

export default selectArtist;
