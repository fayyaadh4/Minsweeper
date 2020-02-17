import React from "react";
import Cell from "./Cells";

//stateless "row" function created containing data passed from "board" parent component
//board is made up of row items
function Row(props) {
  //map through cells array and pass in information received from board component
  let cells = props.cells.map((data, index) => {
    return (
      <Cell key={index} data={data} open={props.open} flag={props.flag}></Cell>
    );
  });
  return <div className="row">{cells}</div>;
}

export default Row;
