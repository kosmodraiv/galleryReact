import React from "react";

export const Collection = ({images, name}) => {
    return (
        <div className="collection">
      <img className="collection__big" src={images[0]} alt="" />
      <h4>{name}</h4>
    </div>
    )
};