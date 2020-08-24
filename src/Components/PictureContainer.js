import React from "react";
import Picture from "./Picture";

const pictureContainer = (props) => {
  const showPictures = () => {
    return props.pics.map((picture, key) => {
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
  return <div>{showPictures()} </div>;
};

export default pictureContainer;
