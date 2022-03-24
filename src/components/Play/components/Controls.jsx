import './Controls.css';

const Controls = (props) => {
    return (
        <div className="controls-wrapper">
            <button onClick={props.play} disabled={props.isRunning} className="control-button">Play</button>
            <button onClick={props.stop} disabled={!props.isRunning} className="control-button">Stop</button>
            <button onClick={props.forward} disabled={props.isRunning} className="control-button">Forward</button>
            <button onClick={props.backward}  disabled={props.isRunning || props.generation === 0} className="control-button">Backward</button>
        </div>
    );
};

export default Controls;