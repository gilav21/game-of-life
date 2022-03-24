const Instructions = (props) => {
    return (
        <div>
            <h1>instructions</h1>
            <p>The game of life is a simulated cell program.</p>
            <p>The rules are:</p>
            <ol>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ol>

            <p>You can start and stop the simulation, with the controls above the board.</p>
            <p>Once stopped, you can run a single step forward and backward with the arrows above the board.</p>
        </div>
    );
}

export default Instructions;