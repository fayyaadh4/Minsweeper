MineSweeper rules

In minesweeper, we have a board containing closed cells. These closed cells contain a certain number of mines and the rest open cells.
The objective of the game is to open up all the cells except the ones containing mines. To open up a cell, the player right-clicks on it.
Cells adjacent to bombs give players an indication of how much bombs are directly around it. If a player suspects a bomb may be at a 
certain position then the player should mark it with a flag. This is done by right-clicking on that cell.
If the player clicks on a cell with zero bombs next to it, cells will begin to open up until a mine is reached.
The game begins once the first cell is opened and the timer then starts. If the first cell is a mine, the game will be restarted.
The player loses when a mine is opened and the game will then be ended. A match is won only when all cells have been opened up, regardless
of whether all flags have been used up or not.
Once a game has ended either by winning or losing, the reset button can be clicked to start the game from over.

This game can be run and installed on your local browser. Download the source folder of the game and install the node-modules and run "npm start" in the games file directory. A local browser window should open up at http://localhost:3000/.
