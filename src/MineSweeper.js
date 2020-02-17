import React from "react";
import "./MineSweeper.css";
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";
import Help from "./components/Help";

//Parent component
//changed App component to MineSweeper component
class MineSweeper extends React.Component {
  constructor(props) {
    super(props);
    //setting states od data to be passed down to children
    this.state = {
      status: "waiting", //changes to running, winning or ended depending on phase
      //board area
      rows: 10,
      columns: 10,
      //number of flags should equal number of mines
      flags: 10,
      mines: 10,
      time: 0,
      openCells: 0,
      //pop up displaying help
      showPopup: false
    };
    //set base state to state which is then copiedusing spread operator
    this.baseState = this.state;
  }

  //while status is running check for winner after every update
  componentDidUpdate(prevProps, prevState) {
    if (this.state.status === "running") {
      this.checkForWinner();
    }
  }

  //end game function which changes status to ended as well as alerting user that they lost
  endGame = () => {
    this.setState(
      {
        status: "ended"
      },
      alert("You lost!!!")
    );
  };

  //function which checks whether user has won and then changes status to winner and
  //alerts user that they've won
  checkForWinner = () => {
    //if statement checking if user has won
    //if the amount of mines + the amount of open cells is more than or equal to the
    //total amount of cells then user wins
    if (
      this.state.mines + this.state.openCells >=
      this.state.columns * this.state.rows
    ) {
      this.setState(
        {
          status: "winner"
        },
        alert("You won!!!")
      );
    }
  };

  //use spread operator to copy array
  //set interval to empty array which starts the timer from over
  reset = () => {
    this.intervals.map(clearInterval);
    this.setState({ ...this.baseState }, () => {
      this.intervals = [];
    });
  };

  //function which toggles 'help'popup by changing the showpopup state to true
  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  componentWillMount() {
    this.intervals = [];
  }

  //once game starts by user opening first cell, status will be changed to 'running'
  //and the time will start running
  tick = () => {
    if (this.state.openCells > 0 && this.state.status === "running") {
      let time = this.state.time + 1;
      this.setState({ time });
    }
  };

  //starts timer
  setInterval = (fn, t) => {
    this.intervals.push(setInterval(fn, t));
  };

  //open cell on click function which starts time ticker
  openCellClick = () => {
    if (this.state.openCells === 0 && this.state.status !== "running") {
      this.setState(
        {
          status: "running"
        },
        () => {
          this.setInterval(this.tick, 1000);
        }
      );
    }
    this.setState(prevState => {
      return { openCells: prevState.openCells + 1 };
    });
  };

  //change flag amount in boardhead using this function
  changeFlagAmount = amount => {
    this.setState({ flags: this.state.flags + amount });
  };
  render() {
    return (
      //returns also information obtained to index.html
      //passes state data to boardhead and board
      //also displays help popup to user
      <div className="mineSweeper">
        <h2 style={{ color: "blue", textAlign: "center" }} className="title">
          MineSweeper
        </h2>
        <BoardHead
          time={this.state.time}
          flagCount={this.state.flags}
          reset={this.reset}
          showPopup={this.showPopup}
        ></BoardHead>
        <Board
          status={this.state.status}
          changeFlagAmount={this.changeFlagAmount}
          endGame={this.endGame}
          rows={this.state.rows}
          columns={this.state.columns}
          mines={this.state.mines}
          openCells={this.state.openCells}
          openCellClick={this.openCellClick}
        ></Board>
        <button onClick={this.togglePopup.bind(this)}> Help</button>

        {this.state.showPopup ? (
          <Help
            text="MineSweeper rules: In minesweeper, we have a board containing closed cells. These closed cells contain a certain number of mines and the rest open cells.
            The objective of the game is to open up all the cells except the ones containing mines. To open up a cell, the player right-clicks on it.
            Cells adjacent to bombs give players an indication of how much bombs are directly around it. If a player suspects a bomb may be at a 
            certain position then the player should mark it with a flag. This is done by right-clicking on that cell.
            If the player clicks on a cell with zero bombs next to it, cells will begin to open up until a mine is reached.
            The game begins once the first cell is opened and the timer then starts. If the first cell is a mine, the game will be restarted.
            The player loses when a mine is opened and the game will then be ended. A match is won only when all cells have been opened up, regardless
            of whether all flags have been used up or not.
            Once a game has ended either by winning or losing, the reset button can be clicked to start the game from over."
            closePopup={this.togglePopup.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default MineSweeper;
