import React, { Component } from "react";
import Row from "./Row";

//create state function Board which contains the actual components to play the game
export default class Board extends Component {
  constructor(props) {
    super(props);
    //set rows to function create board which takes in number of rows and columns as props
    this.state = {
      rows: this.createBoard(props)
    };
  }

  //tell it to rerender new props since its not managing its own states
  componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps)
      });
    }
  }

  //function which creates actual board to play on
  createBoard = props => {
    //create empty board array
    let board = [];
    //use nested 'for loops' to create rows and columns within rows.
    //number of rows and columns passed down from minesweeper app component(parent)
    for (let i = 0; i < props.rows; i++) {
      //push objects array to add to row of  empty board array
      board.push([]);

      for (let j = 0; j < props.columns; j++) {
        //push in an object(below) in each cell
        board[i].push({
          //add positions of squares equal to position of row and column
          x: j,
          y: i,
          //count of how many mines are near it
          count: 0,
          //set isOPen, hasMine and hasFlag to false. initial condition
          isOpen: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }

    //add mines to board using for loop
    for (let i = 0; i < props.mines; i++) {
      //generate mines at random rows and columns positios
      let randomRow = Math.floor(Math.random() * props.rows);
      let randomColumn = Math.floor(Math.random() * props.columns);

      let cell = board[randomRow][randomColumn];
      //if cell already has mine then go back and place it somewhere else
      //otherwise change cell property of hasMine to true
      if (cell.hasMine) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    //return board once all is done
    return board;
  };

  //open function which opens cells
  open = cell => {
    if (this.props.status === "ended") {
      return;
    }
    //asynchronous fnction which finds adjacent mines asynchronously
    let asyncCountMines = new Promise(resolve => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    asyncCountMines.then(numberOfMines => {
      let rows = this.state.rows;
      //current at positon x and y. cell we looking at
      let current = rows[cell.y][cell.x];

      //user clicks on a mine in the first go, reset game
      if (current.hasMine && this.props.openCells === 0) {
        console.log("cell already has mine, restart!!!");
        let newRows = this.createBoard(this.props);
        this.setState(
          {
            rows: newRows
          },
          () => {
            this.open(cell);
          }
        );
      }
      //if user doesnt click on mine in first go then game continues
      else {
        //opens cell if theres no flag and it is not open when clicked on
        if (!cell.hasFlag && !current.isOpen) {
          this.props.openCellClick();

          current.isOpen = true;
          //count of current cell equal number of mines
          current.count = numberOfMines;

          this.setState({ rows });
          //if theres no mine in cell number of mines around cell is 0 then
          //call find around cell function
          if (!current.hasMine && numberOfMines === 0) {
            this.findAroundCell(cell);
          }
        }
        //if user clicks on cell and it has mine then end game function is called
        if (current.hasMine && this.props.openCells !== 0) {
          this.props.endGame();
        }
      }
    });
  };

  //find mines in proximity or around cell
  findMines = cell => {
    //let minesin proximity equal 0 initially
    let minesInProximity = 0;
    //use for loop which doesnt include cells outside of vicinity to find mines(doesnt look for mines that arent directly around it)
    //-1 is row before, 0 is row that current is in and 1 is row after. checks for mines in these rows
    for (let row = -1; row <= 1; row++) {
      for (let column = -1; column <= 1; column++) {
        if (cell.y + row >= 0 && cell.x + column >= 0) {
          if (
            //if we're  within board continue
            cell.y + row < this.state.rows.length &&
            cell.x + column < this.state.rows[0].length
          ) {
            if (
              this.state.rows[cell.y + row][cell.x + column].hasMine &&
              !(row === 0 && column === 0)
            ) {
              //add 1 for every mine in proximity to cell
              minesInProximity++;
            }
          }
        }
      }
    }
    //return new mines in proximity variable
    return minesInProximity;
  };

  //find open space when we click on it till we eventuall hit a mine then stop cells from opening
  findAroundCell = cell => {
    let rows = this.state.rows;

    //go through cells and open 1 by 1 till we find a mine then we stop
    for (let row = -1; row <= 1; row++) {
      for (let column = -1; column <= 1; column++) {
        if (cell.y + row >= 0 && cell.x + column >= 0) {
          if (cell.y + row < rows.length && cell.x + column < rows[0].length) {
            if (
              !rows[cell.y + row][cell.x + column].hasMine &&
              !rows[cell.y + row][cell.x + column].isOpen
            ) {
              this.open(rows[cell.y + row][cell.x + column]);
            }
          }
        }
      }
    }
  };

  //flag function for using flag and also changes flag amount. in sync
  flag = cell => {
    //if games over dont do anything
    if (this.props.status === "ended") {
      return;
    }

    //if statement which only allows flags to be used on closed cells
    if (!cell.isOpen) {
      let rows = this.state.rows;

      cell.hasFlag = !cell.hasFlag;
      this.setState({ rows });
      this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    }
  };
  render() {
    //use map function to pass data into Row function
    let rows = this.state.rows.map((row, index) => {
      return (
        <Row cells={row} key={index} open={this.open} flag={this.flag}></Row>
      );
    });
    return <div className="board">{rows}</div>;
  }
}
