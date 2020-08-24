import React from "react";
import "./Picture.css";

const picture = (props) => {
  return (
    <div>
      <img className="singlePicture" src={props.image} alt="Art Piece" />
      <p>Title: {props.title}</p>
      <p>Artist: {props.artist}</p>
      <p>url: {props.url}</p>
      <p>Year:{props.year} </p>
    </div>
  );
};

export default picture;
