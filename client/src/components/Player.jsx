import React from "react";

export default function Player(props) {
    const {playerId} = props;
  return (
    <div className="player">
      <iframe
        width="640"
        height="480"
        src={playerId === '' ? null : `https://www.youtube.com/embed/${playerId}`}
      ></iframe>
    </div>
  );
}
