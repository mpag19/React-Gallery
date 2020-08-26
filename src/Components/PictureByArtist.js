import React from "react";
import Picture from "./Picture";

const pictureByArtist = (props) => {
  const showPicturesByArtist = () => {
    return props.picsByArtist.map((picture, key) => {
      return (
        <div key={picture.id}>
          <Picture
            image={picture.image}
            title={picture.title}
            artist={picture.artistName}
            url={picture.url}
            year={picture.completitionYear}
          />
        </div>
      );
    });
  };
  return <div>{showPicturesByArtist()} </div>;
};

export default pictureByArtist;
