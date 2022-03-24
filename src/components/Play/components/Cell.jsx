import './Cell.css'

const Cell = (props) => {
    let className = 'cell-wrapper';
    if (props.isFilled) {
        className += ' filled';
    }

    return (
        <div className={className} style={{ width : props.size, height: props.size}} onClick={props.cellClicked}></div>
    );
}

export default Cell;