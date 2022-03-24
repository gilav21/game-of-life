import Cell from "./Cell";
import './Board.css'
import { useEffect, useState } from "react";
import Controls from "./Controls";

const Board = (props) => {

    const screenHeight = 400;
    const screenWidth = 900;
    const cellSize = Math.min(screenHeight / props.rows, screenWidth / props.columns);
    const createBoard = (rows, cols) => {
        const board = [];
        for (let row = 0; row < rows; row++) {
            const curRow = [];
            for (let col = 0; col < cols; col++) {
                curRow.push({ history: [], current: false });
            }
            board.push(curRow);
        }
        return board;
    };
    
    // State 
    const [rows, setRows] = useState(props.rows);
    const [cols, setCols] = useState(props.columns);
    const [runningState, setRunning] = useState(false);
    const [generationState, setGeneration] = useState(0)
    const [timerState, setTimer] = useState();
    
    const board = createBoard(rows, cols);
    const [boardState, setBoard] = useState(board);

    useEffect(() => {
        if (props.rows !== rows || props.columns !== cols) {
          setRows(props.rows);
          setCols(props.columns);
          setBoard(createBoard(props.rows, props.columns));
          setGeneration(0);
        }
      }, [props.rows, props.columns]);

    const checkSingleCellForGeneration = (row, col) => {
        let neighbours = 0;
        // top
        if (row > 0) {
            neighbours += (+boardState[row - 1][col].current);
            if (col > 0) {
                neighbours += (+boardState[row - 1][col - 1].current);
            }
            if (col < props.columns - 1) {
                neighbours += (+boardState[row - 1][col + 1].current);
            }
        }

        // bottom
        if (row < props.rows - 1) {
            neighbours += (+boardState[row + 1][col].current);
            if (col > 0) {
                neighbours += (+boardState[row + 1][col - 1].current);
            }
            if (col < props.columns - 1) {
                neighbours += (+boardState[row + 1][col + 1].current);
            }
        }

        // sides
        if (col > 0) {
            neighbours += (+boardState[row][col - 1].current);
        }
        if (col < props.columns - 1) {
            neighbours += (+boardState[row][col + 1].current);
        }

        if (boardState[row][col].current) {
            return neighbours >= 2 && neighbours < 4;
        } else {
            return neighbours === 3;
        }
    }

    const calcBoardForGeneration = (forward = true) => {
        const tempBoard = [...boardState];
        for (let row = 0; row < props.rows; row++) {
            let curRow = [...tempBoard[row]];
            const cols = [...curRow];
            curRow = cols;
            for (let col = 0; col < props.columns; col++) {
                const willCellLive = checkSingleCellForGeneration(row, col);
                // setCellState(row, col, willCellLive, forward);
                setCellValue(cols[col], willCellLive, forward);
            }
            tempBoard[row] = curRow;
        }
        setBoard(tempBoard);
    }

    const setCellValue = (cell, val, forward = true, changeCurrentHistory= false) => {
        if (!changeCurrentHistory) {
            if (forward) {
                cell.history.push(cell.current);
            } else {
                val = cell.history.pop();
            }
        } else {
            cell.history.pop();
            cell.history.push(val);
        }
        cell.current = val;
    }

    const setCellState = (row, col, val, forward = true, changeCurrentHistory= false) => {
        const tempBoard = [...boardState];
        let curRow = [...tempBoard[row]];
        const cols = [...curRow];
        if (!changeCurrentHistory) {
            if (forward) {
                cols[col].history.push(val);
            } else {
                val = cols[col].history.pop();
            }
        }
        cols[col].current = val;
        curRow = cols;
        tempBoard[row] = curRow;
        setBoard(tempBoard);
    }

    const cellClicked = (row, col) => {
        const val = boardState[row][col].current;
        setCellState(row, col, !val, true, true);
    };

    const playClicked = () => {
        setRunning(true);
        setTimer(setInterval(()=> {
            forwardClicked();
        }, 200));
    };

    const stopClicked = () => {
        console.log('stop');
        setRunning(false);
        clearInterval(timerState);
    };

    const forwardClicked = () => {
        calcBoardForGeneration();
        setGeneration(prevGen => prevGen + 1);
    };

    const backwardClicked = () => {
        calcBoardForGeneration(false);
        setGeneration(generationState - 1);
    };

    return (
        <div className="wrapper">
            <p>Generation: {generationState}</p>
            <Controls isRunning={runningState} generation={generationState} play={playClicked} stop={stopClicked} forward={forwardClicked} backward={backwardClicked} />
            <div className="board-wrapper">
                {boardState.map((row, rowIndex) => {
                    return (
                        <div className="row">
                            {row.map((cell, colIndex) => {
                                return (
                                    <Cell key={`${rowIndex}_${colIndex}`} isFilled={boardState[rowIndex][colIndex].current} size={cellSize} cellClicked={() => cellClicked(rowIndex, colIndex)}></Cell>
                                );
                            })}
                        </div>);
                })}
            </div>
        </div>
    );
}

export default Board;