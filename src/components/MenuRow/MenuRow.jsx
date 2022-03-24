import { Link } from 'react-router-dom';
import './MenuRow.css';

const MenuRow = (props) => {
    return (
        <div className="row-wrapper">
            <label>{props.index}</label>
            <Link className='action-button' to={"/" + props.label}>{props.label}</Link>
        </div>
    );
}

export default MenuRow;