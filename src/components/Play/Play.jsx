import { useState } from "react";
import Board from "./components/Board";

const Play = (props) => {
    const [rowsState, setRows] = useState(10);
    const [colsState, setCols] = useState(10);
    const [finalSize, setFinalSize] = useState({ rows: 10, cols: 10 });

    const setSize = () => {
        setFinalSize({rows: +rowsState, cols: +colsState});
    }

    return (
        <div>
            <div>
                <input id="rowsInput" type="number" placeholder="rows" onChange={(e) => { setRows(e.target.value) }} max={100}></input>
                <input id="colsInput" type="number" placeholder="columns" onChange={(e) => { setCols(e.target.value) }} max={100}></input>
                <button onClick={setSize}>Set Size</button>
            </div>
            <Board rows={finalSize.rows} columns={finalSize.cols}></Board>
        </div>
    );
}

export default Play;