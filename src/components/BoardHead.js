import React from "react";

//board head component displaying flag count, reset button and timer
export default function BoardHead(props) {
  //timer has both minute and seconds functions and has to be generated as such
  //to gret minute we divide time by 60
  let minutes = Math.floor(props.time / 60);
  //to get seconds we subtract time by minutes times 60 or set to zero
  let seconds = props.time - minutes * 60 || 0;

  //ternary operator if seconds is less than 10 add zero infront of it else leave it as seconds
  let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  //let time equal format of minute: formatted seconds
  let time = `${minutes}:${formattedSeconds}`;
  return (
    <div className="boardHead">
      <div className="flagCount">Flags left: {props.flagCount}</div>
      <button className="reset" onClick={props.reset}>
        Reset
      </button>
      <div className="timer">Time: {time}</div>
    </div>
  );
}
