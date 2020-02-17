import React from "react";

//installed react icons to get bomb and flag icons
import { FaFlag } from "react-icons/fa";
import { FaBomb } from "react-icons/fa";

//"onContextMenu={e => {e.preventDefault();}}" disables the context menu in javascript when right clicking.
//in this app the right click is used to set flags

//function making up individual cells on the board
function Cells(props) {
  //render cell to board
  let renderCell = () => {
    //if cell is open
    if (props.data.isOpen) {
      //and if cell which is opened on click has mine, display to user that theres a mine present
      if (props.data.hasMine) {
        return (
          <div
            className="cell open"
            onClick={() => props.open(props.data)}
            onContextMenu={e => {
              e.preventDefault();
            }}
            style={{ backgroundColor: "lightcoral" }}
          >
            <FaBomb></FaBomb>
          </div>
        );
      } else if (props.data.count === 0) {
        //if theres no mine close open cell on click. cell will be empty
        return (
          <div
            className="cell open"
            onClick={() => props.open(props.data)}
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
          ></div>
        );
      } else {
        //otherwise if cell count does not equal zero and cell doesnt have mine then return the count of mines nearby
        return (
          <div
            className="cell open"
            onClick={() => props.open(props.data)}
            onContextMenu={e => {
              e.preventDefault();
              props.flag(props.data);
            }}
          >
            {props.data.count}
          </div>
        );
      }
    }
    //right click to flag cell displaying flag to user
    else if (props.data.hasFlag) {
      return (
        <div
          className="cell open"
          onClick={() => props.open(props.data)}
          onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}
          style={{ backgroundColor: "lightblue" }}
        >
          <FaFlag></FaFlag>
        </div>
      );
    } else {
      //closed cells
      return (
        <div
          className="cell"
          onClick={() => props.open(props.data)}
          onContextMenu={e => {
            e.preventDefault();
            props.flag(props.data);
          }}
        ></div>
      );
    }
  };
  return renderCell();
}

export default Cells;
